/**
 * AI 응답 마크다운 전처리
 */

const BR_TAG = /<br\s*\/?>/gi;
const CODE_FENCE = /^\s*(?:```|~~~)/;

/**
 * CommonMark는 닫는 ** 바로 앞이 구두점(따옴표)이고 뒤가 글자면
 * right-flanking으로 인정하지 않아 `**"인용"**다음` 형태가 그대로 노출된다.
 * 따옴표를 강조 밖으로 빼면 정상 파싱된다.
 */
const QUOTE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['"', '"'],
  ["\u201C", "\u201D"], // “ ”
  ["\u300C", "\u300D"], // 「 」
  ["\u300E", "\u300F"], // 『 』
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * `**"텍스트"**` → `"**텍스트**"` (이탤릭 `*"텍스트"*`도 동일)
 */
export function normalizeQuotedEmphasis(content: string): string {
  let result = content;

  for (const [open, close] of QUOTE_PAIRS) {
    const openRe = escapeRegExp(open);
    const closeRe = escapeRegExp(close);

    // **"... "** / *"..."*
    result = result.replace(
      new RegExp(`(\\*{1,3})${openRe}([^\\n*]+?)${closeRe}\\1`, "g"),
      (_match, markers: string, inner: string) =>
        `${open}${markers}${inner}${markers}${close}`
    );
  }

  return result;
}

/**
 * 모델이 종종 <br>을 쓰지만 raw HTML은 렌더링하지 않아 그대로 노출된다.
 * 표 안에서는 줄바꿈을 넣을 수 없으므로 공백으로, 그 외에는 hard break로 바꾼다.
 * 코드 블록 안의 <br>은 예제 코드일 수 있으므로 건드리지 않는다.
 */
export function normalizeLineBreaks(content: string): string {
  let inCodeFence = false;

  return content
    .split("\n")
    .map((line) => {
      if (CODE_FENCE.test(line)) {
        inCodeFence = !inCodeFence;
        return line;
      }
      if (inCodeFence) return line;

      return line.trimStart().startsWith("|")
        ? line.replace(BR_TAG, " ")
        : line.replace(BR_TAG, "  \n");
    })
    .join("\n");
}

/**
 * 코드 펜스 밖의 줄만 변환한다.
 */
function mapOutsideCodeFences(
  content: string,
  transform: (line: string) => string
): string {
  let inCodeFence = false;

  return content
    .split("\n")
    .map((line) => {
      if (CODE_FENCE.test(line)) {
        inCodeFence = !inCodeFence;
        return line;
      }
      if (inCodeFence) return line;
      return transform(line);
    })
    .join("\n");
}

/** AI 응답을 ReactMarkdown에 넣기 전 공통 전처리 */
export function normalizeMarkdown(content: string): string {
  return mapOutsideCodeFences(
    normalizeLineBreaks(content),
    normalizeQuotedEmphasis
  );
}
