import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlanScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    />
  );
}
