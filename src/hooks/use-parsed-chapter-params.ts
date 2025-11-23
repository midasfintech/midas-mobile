import { useLocalSearchParams } from "expo-router";

type ChapterRouteParams = {
  chapterId: number;
  chapterName: string
}

export function useParsedChapterParams(): ChapterRouteParams {
  const params = useLocalSearchParams();

  return {
    chapterId: parseInt(String(params.chapterId), 10),
    chapterName: String(params.chapterName),
  };
}