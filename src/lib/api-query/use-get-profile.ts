import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { QueryKeys } from "./keys";
import { userProfileSchema } from "./types/user-profile";

export function useGetProfile({ id }: { id: string | undefined }) {
  return useQuery({
    queryKey: QueryKeys.PROFILE,
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const profile = await supabase.from('users_data').select('*').eq('id', id).single();

      if (profile.error) {
        return null;
      }

      return await userProfileSchema.safeParseAsync(profile.data);
    },
  })
}