import { Text } from "../ui/text";
import { TouchableOpacity, View } from "react-native";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import { Stock } from "@/lib/api-query/types/stock";

export function StockCard({ stock }: { stock: Stock }) {
  const router = useRouter();

  const handleOpenLessons = () => {
    router.push({
      pathname: "/app/plan/stock",
      params: { stockId: stock.id, stockSymbol: stock.symbol },
    });
  };

  return (
    <TouchableOpacity
      onPress={handleOpenLessons}
      className={cn(
        "flex flex-col px-4 py-3 mb-1",
        "bg-card border-border rounded-xl border",
        "shadow-sm shadow-black/5",
      )}
    >
      <View className="flex flex-row items-center justify-between">
        <Text className="font-semibold text-lg text-primary">{stock.symbol}</Text>
        <Text className="text-muted-foreground">
          {stock.price} {stock.financialCurrency}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
