import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { QueryKeys } from "./keys";
import { assessmentSchema } from "./types/assessment";

export function useGetAssessment() {
  return useQuery({
    queryKey: QueryKeys.ASSESSMENT,
    queryFn: async () => {
      const questions = await supabase.from("assessment_questions").select("*");

      if (questions.error) {
        return null;
      }

      const parsed = await assessmentSchema.safeParseAsync(questions.data);

      if (!parsed.success) {
        console.log("Failed to parse assessment questions");
        return null;
      }

      return parsed.data;
    },
  });
}
