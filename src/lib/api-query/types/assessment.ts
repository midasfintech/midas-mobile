import { z } from "zod";

export type AssessmentQuestion = z.infer<typeof assessmentQuestionSchema>;
const assessmentQuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  answers: z.array(z.string()),
})

export type Assessment = z.infer<typeof assessmentSchema>;
export const assessmentSchema = z.array(assessmentQuestionSchema);