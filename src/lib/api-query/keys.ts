export const QueryKeys = {
  PROFILE: ["profile"] as const,
  SET_PROFILE: ["profile", "update"] as const,
  ASSESSMENT: ["assessment"] as const,
  CHAPTERS: ["chapters"] as const,
  LESSONS: (chapterId: number) => ["lessons", chapterId] as const,
  LESSON: (lessonId: string) => ["lesson", lessonId] as const,
};
