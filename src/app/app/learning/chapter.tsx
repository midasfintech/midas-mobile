import { useParsedChapterParams } from "@/hooks/use-parsed-chapter-params";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useGetLessons } from "@/lib/api-query/use-get-lessons";
import { LessonCard } from "@/components/chapters/lesson-card";

export default function ChapterScreen() {
  const { chapterId, chapterName } = useParsedChapterParams();
  const { t } = useTranslation();
  const { data: lessons } = useGetLessons(chapterId);

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-background px-6 py-4"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <Text className="text-3xl font-extrabold text-foreground mb-4">
        {t("app.chapters.lessons")} - {chapterName}
      </Text>

      <View className="gap-2">
        {lessons?.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </View>
    </ScrollView>
  );
}
