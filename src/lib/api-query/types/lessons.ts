import { z } from "zod";

export type Lesson = z.infer<typeof lessonSchema>;
export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  real_life_example: z.string(),
  question: z.string(),
  answers: z.array(z.string()),
  correct_answer_index: z.number(),
  chapter_index: z.number(),
  chapter_id: z.number(),
  unlocked: z.boolean(),
  completed: z.boolean(),
});

export type Lessons = z.infer<typeof lessonsSchema>;
export const lessonsSchema = z.array(lessonSchema);
