import { Stack } from "expo-router";
import { View } from "react-native";

export default function LearningLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit-portfolio"
          options={{
            headerBackButtonDisplayMode: "minimal",
            headerBackground: () => <View className="flex-1 bg-background"></View>,
            headerTitle: "",
          }}
        />
      </Stack>
    </>
  );
}
