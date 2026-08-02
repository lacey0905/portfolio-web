// lib/ai/models.ts
/**
 * Gemini 모델 자동 선택
 *
 * ListModels API로 현재 API 키가 쓸 수 있는 모델을 조회한 뒤,
 * 대화용으로 적합한 최신 모델을 골라준다.
 * 조회 결과는 캐시하며, 실패 시에는 검증된 기본 모델로 폴백한다.
 */

/** ListModels 조회가 실패했을 때 사용할 검증된 모델 */
const FALLBACK_MODEL = "gemini-2.5-flash";

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
/** 조회 실패는 일시적일 수 있으므로 짧게만 캐시한다 */
const FAILURE_CACHE_TTL_MS = 60 * 1000;
/** ListModels 때문에 채팅 응답이 지연되지 않도록 제한한다 */
const LIST_TIMEOUT_MS = 3000;

const DEFAULT_TIER_PRIORITY = ["flash", "pro", "flash-lite"] as const;

/**
 * flash / pro / flash-lite 와 선택적 리비전(-001)만 통과시킨다.
 * image, tts, robotics, computer-use, preview 등 특수 목적 모델을 걸러내기 위함.
 */
const TIER_PATTERN = /^(flash-lite|flash|pro)(?:-(\d{3}))?$/;
const MODEL_ID_PATTERN = /^gemini-(\d+)(?:\.(\d+))?-(.+)$/;

interface ModelCandidate {
  id: string;
  tier: string;
  major: number;
  minor: number;
  revision: number;
  hasRevision: boolean;
}

interface CachedModel {
  id: string;
  expiresAt: number;
}

let cache: CachedModel | null = null;
let inFlight: Promise<string> | null = null;

export function getApiVersion(): string {
  return process.env.GEMINI_API_VERSION?.trim() || "v1";
}

function getTierPriority(): string[] {
  const preferred = process.env.GEMINI_MODEL_TIER?.trim();
  if (!preferred) return [...DEFAULT_TIER_PRIORITY];

  return [preferred, ...DEFAULT_TIER_PRIORITY.filter((t) => t !== preferred)];
}

function parseModel(name: string): ModelCandidate | null {
  const id = name.replace(/^models\//, "");

  const idMatch = MODEL_ID_PATTERN.exec(id);
  if (!idMatch) return null;

  const [, major, minor, suffix] = idMatch;
  const tierMatch = TIER_PATTERN.exec(suffix);
  if (!tierMatch) return null;

  return {
    id,
    tier: tierMatch[1],
    major: Number(major),
    minor: Number(minor ?? 0),
    revision: Number(tierMatch[2] ?? 0),
    hasRevision: tierMatch[2] !== undefined,
  };
}

export function pickLatestModel(names: string[]): string | null {
  const priority = getTierPriority();

  const candidates = names
    .map(parseModel)
    .filter((c): c is ModelCandidate => c !== null)
    .sort((a, b) => {
      const tierDiff = priority.indexOf(a.tier) - priority.indexOf(b.tier);
      if (tierDiff !== 0) return tierDiff;
      if (a.major !== b.major) return b.major - a.major;
      if (a.minor !== b.minor) return b.minor - a.minor;
      // 리비전이 없는 별칭(gemini-2.0-flash)은 구글이 최신으로 갱신해주므로 우선한다
      if (a.hasRevision !== b.hasRevision) return a.hasRevision ? 1 : -1;
      return b.revision - a.revision;
    });

  return candidates[0]?.id ?? null;
}

async function fetchChatModelNames(): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY가 설정되지 않았습니다.");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LIST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/${getApiVersion()}/models?pageSize=1000`,
      { headers: { "x-goog-api-key": apiKey }, signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`ListModels 요청 실패 (${response.status})`);
    }

    const data = await response.json();
    const models: Array<{ name?: string; supportedGenerationMethods?: string[] }> =
      data.models ?? [];

    return models
      .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => m.name)
      .filter((name): name is string => typeof name === "string");
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 사용할 채팅 모델 ID를 반환한다.
 * GEMINI_MODEL이 지정되어 있으면 자동 선택 없이 그 값을 그대로 쓴다.
 */
export async function resolveChatModel(): Promise<string> {
  const pinned = process.env.GEMINI_MODEL?.trim();
  if (pinned) return pinned;

  if (cache && cache.expiresAt > Date.now()) return cache.id;
  // 동시 요청이 몰려도 조회는 한 번만 수행한다
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const names = await fetchChatModelNames();
      const picked = pickLatestModel(names);

      if (!picked) {
        throw new Error("조건에 맞는 대화 모델을 찾지 못했습니다.");
      }

      if (cache?.id !== picked) {
        console.info(`[gemini] 모델 자동 선택: ${picked}`);
      }
      cache = { id: picked, expiresAt: Date.now() + CACHE_TTL_MS };
      return picked;
    } catch (error) {
      console.warn(
        `[gemini] 모델 자동 선택 실패, ${FALLBACK_MODEL} 사용:`,
        error instanceof Error ? error.message : error
      );
      cache = { id: FALLBACK_MODEL, expiresAt: Date.now() + FAILURE_CACHE_TTL_MS };
      return FALLBACK_MODEL;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

export function invalidateChatModelCache(): void {
  cache = null;
}
