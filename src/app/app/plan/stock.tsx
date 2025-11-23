import { ChartLine } from "@/components/ui/chart";
import { useParsedStockParams } from "@/hooks/use-parsed-params";
import { useGetStock } from "@/lib/api-query/use-get-stocks";
import { View, Text } from "react-native";
import { Redirect } from "expo-router";

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

  if (!stock && !isFetching) {
    return <Redirect href={"/app/plan"} />;
  }
  const testData = [
    { x: "Jan", y: 120 },
    { x: "Feb", y: 180 },
    { x: "Mar", y: 200 },
    { x: "Apr", y: 160 },
    { x: "May", y: 190 },
    { x: "Jun", y: 194 },
    { x: "Jul", y: 130 },
    { x: "Aug", y: 120 },
    { x: "Sep", y: 200 },
    { x: "Oct", y: 240 },
    { x: "Nov", y: 267 },
    { x: "Dec", y: 300 },
  ];
  return (
    <View className="flex-1 bg-background px-6 py-4">
      <View className="bg-card rounded-lg shadow-sm -mt-16 mx-6 pr-2 pl-1 pt-2 pb-1 border border-primary">
        <ChartLine data={testData} height={200} showGrid={false} />
      </View>
      <Text>{stock?.symbol} Price Chart</Text>
      <View className="mt-4 bg-card rounded-xl px-4 py-1 shadow-sm border border-border">
        <View className="flex-row justify-between py-2 border-b border-border last:border-b-0">
          <Text className="font-semibold">EPS (TTM):</Text>
          <Text className="text-muted-foreground font-medium">
            {stock?.eps} {stock?.currency}
          </Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-border last:border-b-0">
          <Text className="font-semibold">P/E (TTM):</Text>
          <Text className="text-muted-foreground font-medium">
            {stock?.trailing_pe_ratio.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-border last:border-b-0">
          <Text className="font-semibold">Market Cap:</Text>
          <Text className="text-muted-foreground font-medium">
            {formatNumber(stock?.market_cap ?? 0)} {stock?.currency}
          </Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-border last:border-b-0">
          <Text className="font-semibold">Dividend Yield:</Text>
          <Text className="text-muted-foreground font-medium">
            {stock?.dividend_yield || "N/A"} {stock?.dividend_yield ? "%" : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}
