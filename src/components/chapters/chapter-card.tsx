import { Chapter } from "@/lib/api-query/types/chapters";
import { Text } from "../ui/text";
import { TouchableOpacity, View } from "react-native";
import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { CheckIcon } from "@/lib/icons";

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  // we could have added the colors to the db or something,
  // but let's keep it simple for now
  const colorMap: Record<number, string> = {
    0: "bg-green-300",
    1: "bg-secondary",
    2: "bg-primary",
  };

  return (
    <TouchableOpacity
      className={cn(
        "flex flex-col px-4 py-6 gap-4",
        "bg-card border-border rounded-xl border",
        "shadow-sm shadow-black/5",
      )}
    >
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="font-bold text-lg">{chapter.title}</Text>
          <Text className="text-muted-foreground">{chapter.description}</Text>
        </View>

        {chapter.completed ? (
          <CheckIcon className="text-green-400" />
        ) : (
          <Text>
            {chapter.completed_lessons_count} / {chapter.lessons_count}
          </Text>
        )}
      </View>

      <Progress
        className="bg-gray-200"
        indicatorClassName={colorMap[chapter.id]}
        value={(chapter.completed_lessons_count / chapter.lessons_count) * 100}
      />
    </TouchableOpacity>
  );
}
