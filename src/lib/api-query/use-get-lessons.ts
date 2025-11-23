import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { QueryKeys } from "./keys";
import { lessonSchema, lessonsSchema } from "./types/lessons";

export function useGetLessons(chapterId: number) {
  return useQuery({
    queryKey: QueryKeys.LESSONS(chapterId),
    queryFn: async () => {
      const allLessons = await supabase.from("users_lessons_ext").select("*");

      if (allLessons.error) {
        return null;
      }

      const parsed = await lessonsSchema.safeParseAsync(allLessons.data);

      if (!parsed.success) {
        console.log("Failed to parse lessons");
        return null;
      }

      const chapterLessons = parsed.data
        .filter((lesson) => lesson.chapter_id === chapterId)
        .sort((a, b) => a.chapter_index - b.chapter_index);

      return chapterLessons;
    },
  });
}


export function useGetLesson(lessonId: string) {
  return useQuery({
    queryKey: QueryKeys.LESSON(lessonId),
    queryFn: async () => {
      const rawLesson = await supabase.from("users_lessons_ext").select("*").eq('id', lessonId).single();

      if (rawLesson.error) {
        return null;
      }

      const parsed = await lessonSchema.safeParseAsync(rawLesson.data);

      if (!parsed.success) {
        console.log("Failed to parse lesson");
        return null;
      }

      return parsed.data;
    },
  });
}