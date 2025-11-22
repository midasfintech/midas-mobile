import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { QueryKeys } from "./keys";
import { userProfileSchema } from "./types/user-profile";

export function setProfile({id, name, surname, income, status, dob}: {id: string | undefined; name: string; surname: string; income: number; status: string; dob: string;}) {
  return useMutation({
    mutationKey: QueryKeys.SET_PROFILE,
    mutationFn: async () => {
      if (!id) {
        return null;
      }

      const profile = await supabase.from('users_data')
        .update({
            first_name: name,
            last_name: surname,
            net_monthly_income: income,
            employment: status,
            date_of_birth: dob
        }).eq('user_id', id).select().single();

      if (profile.error) {
        return null;
      }

      return await userProfileSchema.safeParseAsync(profile.data);
    },
  })
}