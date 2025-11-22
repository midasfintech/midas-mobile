import { useAuthContext } from '@/lib/providers/auth-provider';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  const { session } = useAuthContext();

  if (!session) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
