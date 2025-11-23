import { StockCard } from "@/components/trading/stock-card";
import { Stock } from "@/lib/api-query/types/stock";
import { View } from "react-native";

export default function PlanScreen() {
  const dummyData: Stock[] = [
    {
      symbol: "AMZN",
      price: 150,
      currency: "USD",
      name: "Amazon.com, Inc.",
      change_percent: 1.2,
      eps: 3.5,
      trailing_pe_ratio: 106.13542,
      market_cap: 2000000000000,
      dividend_yield: 0.6,
      price_history: [
        {
          month: 12,
          price: 137.9199981689453,
        },
        {
          month: 1,
          price: 122.29000091552734,
        },
        {
          month: 2,
          price: 113.87999725341797,
        },
        {
          month: 3,
          price: 101.5199966430664,
        },
        {
          month: 4,
          price: 102.16000366210938,
        },
        {
          month: 5,
          price: 99.2699966430664,
        },
        {
          month: 6,
          price: 111.05999755859375,
        },
        {
          month: 7,
          price: 138.77000427246094,
        },
        {
          month: 8,
          price: 170.16000366210938,
        },
        {
          month: 9,
          price: 158.4199981689453,
        },
        {
          month: 10,
          price: 160.92999267578125,
        },
        {
          month: 11,
          price: 259.3299865722656,
        },
        {
          month: 11,
          price: 208.8300018310547,
        },
      ],
      ai_score: 8,
      ai_explanation: "Ben",
    },
  ]; // Placeholder for future data
  return (
    <View className="flex-1 bg-background px-6 py-4">
      {dummyData.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </View>
  );
}
