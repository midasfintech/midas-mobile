import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { QueryKeys } from "./keys";
import { lessonsSchema } from "./types/lessons";

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
