import { Lesson } from "@/lib/api-query/types/lessons";
import { cn } from "@/lib/utils";
import { TouchableOpacity } from "react-native";
import { Text } from "../ui/text";
import { CheckIcon, ChevronRightIcon, LockIcon } from "@/lib/icons";
import { useRouter } from "expo-router";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const router = useRouter();

  const getStatusIcon = () => {
    if (lesson.completed) {
      return <CheckIcon className="text-green-400" size={18} />
    }

    if (!lesson.unlocked) {
      return <LockIcon size={18} />
    }

    if (lesson.unlocked) {
      return <ChevronRightIcon size={18} />
    }
  }

  const handleOpenLesson = () => {
    router.push({
      pathname: "/app/learning/lesson",
      params: { lessonId: lesson.id },
    });
  };

  return (
    <TouchableOpacity
      onPress={handleOpenLesson}
      disabled={!lesson.unlocked}
      className={cn(
        "flex flex-row px-4 py-6 gap-4",
        "items-center justify-between",
        "border-border rounded-xl border",
        "shadow-sm shadow-black/5",
        lesson.unlocked ? "bg-card" : " bg-muted"
      )}
    >
      <Text className={cn(
        "font-bold w-5/6",
        { "text-muted-foreground": !lesson.unlocked}
      )}>{lesson.chapter_index + 1}. {lesson.title}</Text>

      {getStatusIcon()}
    </TouchableOpacity>
  );
}
