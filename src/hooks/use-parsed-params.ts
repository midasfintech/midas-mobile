import { useLocalSearchParams } from "expo-router";

type ChapterRouteParams = {
  chapterId: number;
  chapterName: string;
};

export function useParsedChapterParams(): ChapterRouteParams {
  const params = useLocalSearchParams();

  return {
    chapterId: parseInt(String(params.chapterId), 10),
    chapterName: String(params.chapterName),
  };
}

type LessonRouteParams = {
  lessonId: string;
};

export function useParsedLessonParams(): LessonRouteParams {
  const params = useLocalSearchParams();

  return {
    lessonId: String(params.lessonId),
  };
}

type StockRouteParams = {
  symbol: string;
};

export function useParsedStockParams(): StockRouteParams {
  const params = useLocalSearchParams();

  return {
    symbol: String(params.symbol),
  };
}
