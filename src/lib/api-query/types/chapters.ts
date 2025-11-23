import { z } from "zod";

export type Chapter = z.infer<typeof chapterSchema>;
const chapterSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  completed: z.boolean(),
  lessons_count: z.number(),
  completed_lessons_count: z.number(),
});

export type Chapters = z.infer<typeof chaptersSchema>;
export const chaptersSchema = z.array(chapterSchema);
