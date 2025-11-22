import { useAuthContext } from "@/lib/providers/auth-provider";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function ProfileLayout() {
  const { session } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/auth/sign-in");
    }
  }, [session, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
