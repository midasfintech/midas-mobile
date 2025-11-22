import { ScreenContainer } from "@/components/screen-container";
import { Text } from "@/components/ui/text";
import { ColorScheme, useColorScheme } from "@/hooks/use-color-scheme";
import { changeLanguage } from "@/lib/i18n";
import { SunIcon } from "@/lib/icons";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

export default function AuthLayout() {
  const { i18n } = useTranslation();
  const { themeMode, setColorScheme } = useColorScheme();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "sl" : "en";
    changeLanguage(newLanguage);
  };

  const toggleThemeChange = () => {
    if (themeMode === "light") {
      setColorScheme("dark");
      return;
    }
    if (themeMode === "dark") {
      setColorScheme("light");
      return;
    }

    const value: ColorScheme = "light";
    setColorScheme(value);
  };

  return (
    <ScreenContainer edges={["bottom"]}>
      <View className="w-full flex flex-row justify-between items-center px-6 py-2">
        <Pressable onPress={toggleThemeChange}>
          <SunIcon className="text-foreground" />
        </Pressable>
        <Pressable
          onPress={toggleLanguage}
          className="bg-muted px-3 py-1.5 rounded-full active:opacity-70"
        >
          <Text variant="small" className="font-semibold uppercase">
            {i18n.language === "en" ? "EN" : "SL"}
          </Text>
        </Pressable>
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="confirm-email" />
      </Stack>
    </ScreenContainer>
  );
}
