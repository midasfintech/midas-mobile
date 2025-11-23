import { useParsedStockParams } from "@/hooks/use-parsed-params";
import { useGetStock } from "@/lib/api-query/use-get-stocks";
import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Redirect, useRouter } from "expo-router";
import { LineChart } from "react-native-gifted-charts";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronRightIcon } from "@/lib/icons";
import { Icon } from "@/components/ui/icon";

function formatNumber(num: number): string {
  const format = (value: number, suffix: string): string => {
    const formatted = value.toFixed(1);
    // remove unnecessary ".0"
    return (
      (formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted) + suffix
    );
  };

  if (num >= 1_000_000_000_000) {
    // Trillion
    return format(num / 1_000_000_000_000, "T");
  }
  if (num >= 1_000_000_000) {
    // Billion
    return format(num / 1_000_000_000, "B");
  }
  if (num >= 1_000_000) {
    // Million
    return format(num / 1_000_000, "M");
  }
  if (num >= 1_000) {
    // Thousand
    return format(num / 1_000, "K");
  }
  return num.toLocaleString(); // small numbers stay as-is
}

export default function StockScreen() {
  const { symbol } = useParsedStockParams();
  const { data: stock, isFetching } = useGetStock(symbol);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!stock && !isFetching) {
    return <Redirect href={"/app/plan"} />;
  }

  const chartData = Object.values(stock?.price_history || {}).map((p) => ({ value: p.price }))

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].value : 0;
  const previousPrice = chartData.length > 0 ? chartData[chartData.length - 2].value : 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      {/* Header with Back Button */}
      <View className="px-6 pt-6 pb-4 flex-row items-center gap-4">
        <Pressable
          onPress={() => router.back()}
          className="active:opacity-70"
        >
          <Icon
            as={ChevronRightIcon}
            className="text-foreground size-6 rotate-180"
          />
        </Pressable>
        <View className="flex-1">
          <Text className="text-2xl font-bold text-foreground">
            {stock?.symbol}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {stock?.name || "Stock Details"}
          </Text>
        </View>
      </View>

      {/* Price Section */}
      <View className="px-6 pb-4">
        <View className="flex-row items-end gap-3">
          <Text className="text-4xl font-bold text-foreground">
            {currentPrice.toFixed(2)}
          </Text>
          <Text className="text-xl text-muted-foreground pb-1">
            {stock?.currency || "USD"}
          </Text>
        </View>
        <View className="flex-row items-center gap-2 mt-2">
          <Text
            className={`text-base font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {priceChange.toFixed(2)} ({isPositive ? "+" : ""}
            {priceChangePercent}%)
          </Text>
          <Text className="text-sm text-muted-foreground">Today</Text>
        </View>
      </View>

      {/* Chart Section */}
      <View className="px-6 py-4">
        <View className="bg-card rounded-2xl p-4 border border-border">
          <LineChart
            data={chartData}
            height={220}
            width={310}
            spacing={28}
            initialSpacing={10}
            color1="#fdc700"
            textColor1={isDark ? "#cacddc" : "#0a0a0a"}
            thickness={3}
            startFillColor1="rgba(253, 199, 0, 0.3)"
            endFillColor1="rgba(253, 199, 0, 0.05)"
            startOpacity={0.9}
            endOpacity={0.2}
            hideDataPoints
            curved
            areaChart
            hideYAxisText
            hideRules
            xAxisColor={isDark ? "#33353e" : "#e5e5e5"}
            yAxisColor={isDark ? "#33353e" : "#e5e5e5"}
            backgroundColor="transparent"
          />
        </View>
      </View>

      {/* Stats Section */}
      <View className="px-6 py-2">
        <Text className="text-lg font-bold text-foreground mb-3">
          Key Statistics
        </Text>
        <View className="bg-card rounded-2xl border border-border overflow-hidden">
          <View className="flex-row justify-between px-4 py-4 border-b border-border">
            <Text className="text-foreground font-semibold">EPS (TTM)</Text>
            <Text className="text-muted-foreground font-medium">
              {stock?.eps} {stock?.currency}
            </Text>
          </View>
          <View className="flex-row justify-between px-4 py-4 border-b border-border">
            <Text className="text-foreground font-semibold">P/E Ratio</Text>
            <Text className="text-muted-foreground font-medium">
              {stock?.trailing_pe_ratio.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between px-4 py-4 border-b border-border">
            <Text className="text-foreground font-semibold">Market Cap</Text>
            <Text className="text-muted-foreground font-medium">
              {formatNumber(stock?.market_cap ?? 0)} {stock?.currency}
            </Text>
          </View>
          <View className="flex-row justify-between px-4 py-4">
            <Text className="text-foreground font-semibold">
              Dividend Yield
            </Text>
            <Text className="text-muted-foreground font-medium">
              {stock?.dividend_yield
                ? `${stock.dividend_yield}%`
                : "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
