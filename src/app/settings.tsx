import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Option,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { changeLanguage } from "@/lib/i18n";
import { ChevronRightIcon, MoonIcon, SunIcon } from "@/lib/icons";
import { useTheme, type ColorScheme } from "@/lib/theme-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Pressable } from "react-native";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { themeMode, setColorScheme } = useTheme();

  const [selectedLanguage, setSelectedLanguage] = useState<Option>({
    value: i18n.language,
    label: t(
      `languageSwitcher.${i18n.language === "en" ? "english" : "slovenian"}`,
    ),
  });

  const [selectedTheme, setSelectedTheme] = useState<Option>({
    value: themeMode,
    label: t(`themeSwitcher.${themeMode}`),
  });

  const handleLanguageChange = async (option: Option) => {
    if (option?.value) {
      setSelectedLanguage(option);
      await changeLanguage(option.value);
    }
  };

  const handleThemeChange = (option: Option) => {
    if (option?.value) {
      setSelectedTheme(option);
      setColorScheme(option.value as ColorScheme);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView className="flex-1 bg-background">
        <View className="px-6 py-6 gap-6">
          {/* Header with Back Button */}
          <View className="flex-row items-center gap-4">
            <Pressable
              onPress={() => router.back()}
              className="active:opacity-70"
            >
              <Icon
                as={ChevronRightIcon}
                className="text-foreground size-6 rotate-180"
              />
            </Pressable>
            <View className="flex-1">
              <Text className="font-bold text-foreground text-3xl">
                {t("common.settings")}
              </Text>
            </View>
          </View>

          {/* Settings Sections */}
          <View className="gap-6">
            {/* Appearance Section */}
            <View className="bg-card p-6 rounded-lg border border-border gap-4">
              <Text className="font-semibold text-foreground text-lg">
                {t("settings.appearance.title")}
              </Text>

              {/* Theme Selector */}
              <View className="gap-2">
                <Label>{t("settings.appearance.theme")}</Label>
                <Select value={selectedTheme} onValueChange={handleThemeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("themeSwitcher.selectTheme")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="light"
                      label={t("themeSwitcher.light")}
                    />
                    <SelectItem value="dark" label={t("themeSwitcher.dark")} />
                    <SelectItem
                      value="system"
                      label={t("themeSwitcher.system")}
                    />
                  </SelectContent>
                </Select>
              </View>

              {/* Theme Preview */}
              <View className="flex-row gap-3 mt-2">
                <View className="flex-1 bg-background border border-border rounded-lg p-4 items-center gap-2">
                  <Icon as={SunIcon} className="text-foreground size-6" />
                  <Text className="text-xs text-muted-foreground">
                    {t("themeSwitcher.light")}
                  </Text>
                </View>
                <View className="flex-1 bg-foreground border border-border rounded-lg p-4 items-center gap-2">
                  <Icon as={MoonIcon} className="text-background size-6" />
                  <Text className="text-xs text-background">
                    {t("themeSwitcher.dark")}
                  </Text>
                </View>
              </View>
            </View>

            {/* Language Section */}
            <View className="bg-card p-6 rounded-lg border border-border gap-4">
              <Text className="font-semibold text-foreground text-lg">
                {t("settings.language.title")}
              </Text>

              <View className="gap-2">
                <Label>{t("settings.language.select")}</Label>
                <Select
                  value={selectedLanguage}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("languageSwitcher.selectLanguage")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="en"
                      label={t("languageSwitcher.english")}
                    />
                    <SelectItem
                      value="sl"
                      label={t("languageSwitcher.slovenian")}
                    />
                  </SelectContent>
                </Select>
              </View>
            </View>
          </View>

          {/* Back Button */}
          <Button variant="outline" onPress={() => router.back()}>
            <Text>{t("settings.backToProfile")}</Text>
          </Button>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
