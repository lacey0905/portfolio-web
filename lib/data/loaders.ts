import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import type { Profile } from "@/types/profile";
import type { ExperienceData, Experience } from "@/types/experience";
import type { Project } from "@/types/project";

/**
 * 데이터 파일 기본 경로
 */
const DATA_DIR = path.join(process.cwd(), "data");

/**
 * JSON 파일 로딩 유틸리티 (동기)
 */
function loadJsonSync<T>(filename: string): T | null {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

/**
 * JSON 파일 로딩 유틸리티 (비동기)
 */
async function loadJsonAsync<T>(filename: string): Promise<T | null> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContents = await fsPromises.readFile(filePath, "utf8");
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

/**
 * 텍스트 파일 로딩 유틸리티 (동기)
 */
function loadTextSync(filename: string): string | null {
  try {
    const filePath = path.join(DATA_DIR, filename);
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

/**
 * 텍스트 파일 로딩 유틸리티 (비동기)
 */
async function loadTextAsync(filename: string): Promise<string | null> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    return await fsPromises.readFile(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

// ============================================
// 프로필 데이터 로더
// ============================================

/**
 * 프로필 데이터 로드 (비동기)
 */
export async function getProfile(): Promise<Profile | null> {
  return loadJsonAsync<Profile>("profile.json");
}

/**
 * 프로필 데이터 로드 (동기)
 */
export function getProfileSync(): Profile | null {
  return loadJsonSync<Profile>("profile.json");
}

// ============================================
// 경력 데이터 로더
// ============================================

/**
 * 경력 데이터 로드 (비동기)
 */
export async function getExperiences(): Promise<Experience[]> {
  const data = await loadJsonAsync<ExperienceData>("experience.json");
  return data?.experiences || [];
}

/**
 * 경력 데이터 로드 (동기)
 */
export function getExperiencesSync(): Experience[] {
  const data = loadJsonSync<ExperienceData>("experience.json");
  return data?.experiences || [];
}

// ============================================
// 프로젝트 아카이브 데이터 로더
// ============================================

interface ArchiveData {
  projects: Project[];
}

/**
 * 프로젝트 아카이브 로드 (비동기)
 */
export async function getProjects(): Promise<Project[]> {
  const data = await loadJsonAsync<ArchiveData>("archive.json");
  return data?.projects || [];
}

/**
 * 프로젝트 아카이브 로드 (동기)
 */
export function getProjectsSync(): Project[] {
  const data = loadJsonSync<ArchiveData>("archive.json");
  return data?.projects || [];
}

/**
 * Featured 프로젝트만 로드 (비동기)
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.featured === true);
}

/**
 * Featured 프로젝트만 로드 (동기)
 */
export function getFeaturedProjectsSync(): Project[] {
  const projects = getProjectsSync();
  return projects.filter((project) => project.featured === true);
}

// ============================================
// 마크다운 파일 로더
// ============================================

/**
 * 이력서 마크다운 로드 (비동기)
 */
export async function getResume(): Promise<string | null> {
  return loadTextAsync("resume.md");
}

/**
 * 이력서 마크다운 로드 (동기)
 */
export function getResumeSync(): string | null {
  return loadTextSync("resume.md");
}

/**
 * 개인 스토리 마크다운 로드 (비동기)
 */
export async function getMyStory(): Promise<string | null> {
  return loadTextAsync("myStory.md");
}

/**
 * 개인 스토리 마크다운 로드 (동기)
 */
export function getMyStorySync(): string | null {
  return loadTextSync("myStory.md");
}

/**
 * 챗 메시지 데이터 로드 (비동기)
 */
export async function getChatMessages(): Promise<any | null> {
  return loadJsonAsync("chat-messages.json");
}

/**
 * 챗 메시지 데이터 로드 (동기)
 */
export function getChatMessagesSync(): any | null {
  return loadJsonSync("chat-messages.json");
}
