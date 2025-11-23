import { EmploymentStatuses, KnowledgeLevels } from "@/lib/types";
import { z } from "zod";

export type UserProfile = z.infer<typeof userProfileSchema>;
export const userProfileSchema = z.object({
  id: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  date_of_birth: z.string().nullable(),
  net_monthly_income: z.number().nullable(),
  employment: z.enum(EmploymentStatuses).nullable(),
  knowledge: z.enum(KnowledgeLevels).nullable(),
  monthly_investment_amount: z.number().nullable(),
  ethical_investing: z.boolean().nullable(),
  created_at: z.string().nullable(),
});
