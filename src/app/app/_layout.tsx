import { ScreenContainer } from "@/components/screen-container";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import createIconSet from "@expo/vector-icons/createIconSet";

// Lucide icon glyph mappings from info.json
const glyphMap = {
  house: 0xe0f5,
  learning: 0xe234,
  chart: 0xe2a5,
  user: 0xe19f,
};

const LucideIcon = createIconSet(
  glyphMap,
  "Lucide",
  require("../../../assets/lucide-font/lucide.ttf"),
);

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
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Icon selectedColor={"#f0b100"} src={<VectorIcon family={LucideIcon} name="house" />} />
          <Label hidden />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="learning">
          <Icon selectedColor={"#f0b100"} src={<VectorIcon family={LucideIcon} name="learning" />} />
          <Label hidden />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="plan">
          <Icon selectedColor={"#f0b100"} src={<VectorIcon family={LucideIcon} name="chart" />} />
          <Label hidden />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon selectedColor={"#f0b100"} src={<VectorIcon family={LucideIcon} name="user" />} />
          <Label hidden />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ScreenContainer>
  );
}
