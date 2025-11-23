import { z } from "zod";

const monthlyPriceSchema = z.object({
  month: z.number().int().min(1).max(12),
  price: z.number(),
});

export type Stock = z.infer<typeof stockSchema>;
export const stockSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  change_percent: z.number(),
  eps: z.number(),
  trailing_pe_ratio: z.number(),
  market_cap: z.number(),
  dividend_yield: z.number().nullable(),
  price_history: z.array(monthlyPriceSchema),
  ai_score: z.number().min(0).max(10),
  ai_explanation: z.string(),
});
