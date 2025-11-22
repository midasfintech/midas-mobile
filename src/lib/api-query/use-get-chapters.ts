import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { QueryKeys } from "./keys";
import { chaptersSchema } from "./types/chapters";

export function useGetChapters() {
  return useQuery({
    queryKey: QueryKeys.CHAPTERS,
    queryFn: async () => {
      const chapters = await supabase.from('users_chapters_ext').select('*');

      if (chapters.error) {
        return null;
      }

      const parsed = await chaptersSchema.safeParseAsync(chapters.data);

      if (!parsed.success) {
        console.log('Failed to parse chapters');
        return null;
      }

      return parsed.data;
    },
  })
}