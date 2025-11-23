import { Stack } from "expo-router";

export default function LearningLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="chapter"
          options={{
            headerBackButtonDisplayMode: "minimal",
            headerBackground: () => null,
            headerTitle: "",
          }}
        />
      </Stack>
    </>
  );
}
