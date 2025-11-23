import { Lesson } from "@/lib/api-query/types/lessons";
import { cn } from "@/lib/utils";
import { TouchableOpacity } from "react-native";
import { Text } from "../ui/text";
import { ChevronRightIcon, LockIcon } from "@/lib/icons";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <TouchableOpacity
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

      {lesson.unlocked ? <ChevronRightIcon size={18} /> : <LockIcon size={18} />}
    </TouchableOpacity>
  );
}
