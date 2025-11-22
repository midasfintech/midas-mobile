import { useLocalSearchParams } from "expo-router";

type ChapterRouteParams = {
  chapterId: string;
}

export function useParsedChapterParams(): ChapterRouteParams {
  const params = useLocalSearchParams();

  return {
    chapterId: String(params.chapterId),
  };
}