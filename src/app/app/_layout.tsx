import { ScreenContainer } from "@/components/screen-container";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useAuthContext();

  // Show loading indicator while checking for session
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect to sign-in if no session
  if (!session) {
    return <Redirect href={"/auth/sign-in"} />;
  }

  return (
    <ScreenContainer>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="assessment" />
      </Stack>
    </ScreenContainer>
  );
}
