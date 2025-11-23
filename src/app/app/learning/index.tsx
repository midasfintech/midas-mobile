import { useGetChapters } from "@/lib/api-query/use-get-chapters";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ChapterCard } from "@/components/chapters/chapter-card";

export default function LearningScreen() {
  const { t } = useTranslation();
  const { data: chapters } = useGetChapters();

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-background px-6 py-4"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <Text className="text-3xl font-extrabold text-foreground">
        {t("app.chapters.title")}
      </Text>

      <View className="mt-4 gap-4">
        {chapters?.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </View>
    </ScrollView>
  );
}
