import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MailIcon } from "@/lib/icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Linking, Platform, View } from "react-native";

export default function ConfirmEmail() {
  const { t } = useTranslation();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { colorScheme } = useColorScheme();

  const openMailApp = async () => {
    const mailUrl = Platform.select({
      ios: "message://",
      android: "mailto:",
      default: "mailto:",
    });

    try {
      const supported = await Linking.canOpenURL(mailUrl);
      if (supported) {
        await Linking.openURL(mailUrl);
      }
    } catch (error) {
      console.error("Error opening mail app:", error);
    }
  };

  return (
    <View className="flex-1 bg-background px-6 justify-center">
      <View className="items-center gap-8">
        {/* Icon Section */}
        <View className="items-center gap-4">
          <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center">
            <MailIcon
              size={48}
              color={colorScheme === "dark" ? "#f0b100" : "#f0b100"}
              strokeWidth={1.5}
            />
          </View>
        </View>

        {/* Content Section */}
        <View className="items-center gap-4 w-full">
          <Text variant="h1" className="text-center">
            {t("auth.confirmEmail.title")}
          </Text>

          <View className="items-center gap-2">
            <Text variant="muted" className="text-center">
              {t("auth.confirmEmail.subtitle")}
            </Text>
            {email && (
              <Text className="font-semibold text-primary text-center">
                {email}
              </Text>
            )}
          </View>

          <View className="bg-card p-6 rounded-lg border border-border w-full gap-3 mt-4">
            <Text className="text-center leading-6">
              {t("auth.confirmEmail.instructions")}
            </Text>
          </View>
        </View>

        {/* Help Section */}
        <View className="items-center gap-2 mt-4">
          <Text variant="small" className="text-muted-foreground font-semibold">
            {t("auth.confirmEmail.didntReceive")}
          </Text>
          <Text variant="small" className="text-muted-foreground text-center">
            {t("auth.confirmEmail.checkSpam")}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="w-full gap-3 mt-2">
          <Button onPress={openMailApp} className="w-full">
            <Text className="text-primary-foreground font-semibold">
              {t("auth.confirmEmail.openMailApp")}
            </Text>
          </Button>

          <Button
            onPress={() => router.replace("/auth/sign-in")}
            className="w-full bg-secondary"
          >
            <Text className="text-secondary-foreground font-semibold">
              {t("auth.confirmEmail.backToLogin")}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
