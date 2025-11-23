import { StockCard } from "@/components/trading/stock-card";
import { Stock } from "@/lib/api-query/types/stock";
import { View } from "react-native";

export default function PlanScreen() {
  const dummyData: Stock[] = [
    { id: "1", symbol: "AAPL", price: 150, financialCurrency: "USD" },
    { id: "2", symbol: "GOOGL", price: 280, financialCurrency: "USD" },
    { id: "3", symbol: "AMZN", price: 340, financialCurrency: "USD" },
  ]; // Placeholder for future data
  return (
    <View className="flex-1 bg-background px-6 py-4">
      {dummyData.map((stock) => (
        <StockCard key={stock.id} stock={stock} />
      ))}
    </View>
  );
}
