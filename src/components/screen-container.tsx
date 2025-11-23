import { useColorScheme } from "@/hooks/use-color-scheme";
import { cn } from "@/lib/utils";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenContainer({
  children,
  edges,
}: {
  children: React.ReactNode;
  edges?: ("bottom" | "left" | "right")[];
}) {
  const { colorScheme } = useColorScheme();

  return (
    <View className={cn("flex-1", { dark: colorScheme === "dark" })}>
      <SafeAreaView style={{ flex: 1 }} edges={[...(edges ?? []), "top"]}>
        {children}
      </SafeAreaView>
    </View>
  );
}
