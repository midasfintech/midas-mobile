import { Button } from "@/components/ui/button";
import { MultiSelectTile } from "@/components/ui/multi-select-tile";
import { Text } from "@/components/ui/text";
import { useGetAssessment } from "@/lib/api-query/use-get-assessment";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function AssessmentPage() {
  const { t } = useTranslation();
  const { data: assessment, isLoading } = useGetAssessment();
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize selectedAnswers array when assessment loads
  useEffect(() => {
    if (assessment && selectedAnswers.length === 0) {
      setSelectedAnswers(new Array(assessment.length).fill(null));
    }
    // should only run when assessment changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment]);

  const handleAnswerChange = (
    questionIndex: number,
    answerValues: string[],
  ) => {
    const newAnswers = [...selectedAnswers];
    // Convert the selected answer value (which is the index as string) back to number
    newAnswers[questionIndex] =
      answerValues.length > 0 ? parseInt(answerValues[0]) : null;
    setSelectedAnswers(newAnswers);
  };

  const currentQuestion = assessment?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === (assessment?.length ?? 0) - 1;
  const isCurrentQuestionAnswered =
    selectedAnswers[currentQuestionIndex] !== null &&
    selectedAnswers[currentQuestionIndex] !== undefined;
  const allQuestionsAnswered =
    selectedAnswers.length > 0 &&
    selectedAnswers.every((answer) => answer !== null);

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!allQuestionsAnswered) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("assessment", {
        body: { answers: selectedAnswers },
      });

      if (error) {
        console.error("Error submitting assessment:", error);
        // TODO: Show error toast/alert
      } else {
        console.log("Assessment submitted successfully:", data);
        // TODO: Navigate to next screen or show success message
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      // TODO: Show error toast/alert
    } finally {
      router.push("/app");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!assessment || !currentQuestion) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-foreground">
          {t("app.assessment.loadError")}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="px-6 py-6 gap-6">
          <View className="gap-2">
            <Text className="font-bold text-foreground text-4xl">
              {t("app.assessment.title")}
            </Text>
            <Text className="text-foreground">
              {t("app.assessment.subtitle")}
            </Text>
          </View>

          <View className="gap-2">
            <Text className="text-muted-foreground text-sm">
              {t("app.assessment.questionCounter", {
                current: currentQuestionIndex + 1,
                total: assessment.length,
              })}
            </Text>
            <Text className="font-semibold text-foreground text-xl">
              {currentQuestion.question}
            </Text>
          </View>

          <MultiSelectTile
            options={currentQuestion.answers.map((answer, answerIndex) => ({
              value: answerIndex.toString(),
              label: answer,
            }))}
            value={
              selectedAnswers[currentQuestionIndex] !== null &&
              selectedAnswers[currentQuestionIndex] !== undefined
                ? [selectedAnswers[currentQuestionIndex]!.toString()]
                : []
            }
            onValueChange={(values) =>
              handleAnswerChange(currentQuestionIndex, values)
            }
            singleSelect
          />
        </View>
      </ScrollView>

      <View className="px-6 py-4 gap-3">
        <View className="flex-row gap-3">
          {currentQuestionIndex > 0 && (
            <Button
              onPress={handlePrevious}
              variant="outline"
              className="flex-1"
              size={"lg"}
            >
              <Text>{t("app.assessment.previous")}</Text>
            </Button>
          )}

          {!isLastQuestion ? (
            <Button
              onPress={handleNext}
              disabled={!isCurrentQuestionAnswered}
              className="flex-1"
              size={"lg"}
            >
              <Text>{t("app.assessment.next")}</Text>
            </Button>
          ) : (
            <Button
              onPress={handleSubmit}
              disabled={!allQuestionsAnswered || isSubmitting}
              className="flex-1"
              size={"lg"}
            >
              <Text>
                {isSubmitting ? t("app.assessment.submitting") : t("app.assessment.submit")}
              </Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}
