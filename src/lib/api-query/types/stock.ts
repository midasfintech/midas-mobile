import { z } from "zod";

export type Stock = z.infer<typeof stockSchema>;
export const stockSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  price: z.number(),
  financialCurrency: z.string(),
});
