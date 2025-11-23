import { Button } from "@/components/ui/button";
import { MultiSelectTile } from "@/components/ui/multi-select-tile";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { useParsedLessonParams } from "@/hooks/use-parsed-params";
import { useGetLesson } from "@/lib/api-query/use-get-lessons";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Markdown from "react-native-markdown-display";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LessonPage() {
  const { lessonId } = useParsedLessonParams();
  const { data: lesson, isFetching } = useGetLesson(lessonId);
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const insets = useSafeAreaInsets();

  if (!lesson && !isFetching) {
    return <Redirect href={"/app/learning"} />;
  }

  const getContent = () => {
    if (step === 1) {
      return <Markdown>{lesson?.description}</Markdown>;
    }

    if (step === 2) {
      return <Markdown>{lesson?.real_life_example}</Markdown>;
    }

    if (step === 3) {
      return (
        <View className="mb-4">
          <Text className="my-2">{lesson?.question}</Text>
          <MultiSelectTile
            options={
              lesson?.answers.map((answer, answerIndex) => ({
                value: answerIndex.toString(),
                label: answer,
              })) ?? []
            }
            value={[selectedAnswer[0]?.toString()]}
            onValueChange={setSelectedAnswer}
            singleSelect
          />
        </View>
      );
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer.length === 0 || !lesson) return;

    setIsSubmitting(true);
    try {
      console.log({
          lesson_id: lesson.id,
          answer: selectedAnswer[0],
        })
      const { data, error } = await supabase.functions.invoke("complete-lesson", {
        body: {
          lesson_id: lesson.id,
          answer: selectedAnswer[0],
        },
      });

      if (error) {
        console.error("Wrong answer:", error);
        Alert.alert(
          t("app.chapters.errorTitle"),
          t("app.chapters.wrongAnswer"),
          [{ text: t("app.chapters.tryAgain"), style: "default" }]
        );
      } else {
        await queryClient.invalidateQueries();
        Alert.alert(
          t("app.chapters.successTitle"),
          t("app.chapters.lessonComplete"),
          [
            {
              text: t("app.chapters.continue"),
              onPress: () => router.push("/app/learning"),
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error submitting lesson:", error);
      Alert.alert(
        t("app.chapters.errorTitle"),
        t("app.chapters.submitError"),
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAction = () => {
    if (step < 3) {
      return (
        <Button className="" onPress={() => setStep(step + 1)}>
          <Text>{t("app.chapters.next")}</Text>
        </Button>
      );
    } else {
      return (
        <Button onPress={handleSubmit}>
          <Text>{isSubmitting ? t("app.chapters.submitting") : t("app.chapters.submit")}</Text>
        </Button>
      );
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-background px-6 py-4"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <Progress
        indicatorClassName="bg-primary"
        className="bg-amber-200 mb-4"
        value={(step / 3) * 100}
      />

      <View className="flex flex-row items-center justify-between">
        <Text className="text-muted-foreground">
          {t("app.chapters.lesson")} {(lesson?.chapter_index || 0) + 1}
        </Text>

        <Text className="text-muted-foreground">
          {step}/{3}
        </Text>
      </View>

      <Text className="text-primary font-bold text-lg">{lesson?.title}</Text>

      {getContent()}

      {getAction()}
    </ScrollView>
  );
}
