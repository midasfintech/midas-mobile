import { Stack } from "expo-router";

export default function LearningLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="stock"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
