import { PenIcon } from "@/lib/icons";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { useGetProfile } from "@/lib/api-query/use-get-profile";
import { ChartPie } from "@/components/ui/chart";
import { useRouter } from "expo-router";
import { StockCard } from "@/components/trading/stock-card";
import { Stock } from "@/lib/api-query/types/stock";
import { useGetStocks } from "@/lib/api-query/use-get-stocks";

export default function PlanScreen() {
  const { t } = useTranslation();
  const { session } = useAuthContext();
  const { data: userData } = useGetProfile({ id: session?.user.id || "" });
  const { data: stocks } = useGetStocks();
  const router = useRouter();

  const handleEditPortfolio = () => {
    router.push("/app/plan/edit");
  };

  const tempPieData = [
    { value: 35, label: "35", color: "#fdc700" },
    { value: 15, label: "15", color: "#7c86ff" },
    { value: 20, label: "20", color: "#96f7e4" },
    { value: 30, label: "30", color: "#ed6aff" },
  ];

  return (
    <View className="flex-1 bg-background px-6 py-4">
      <View className="flex flex-row items-start justify-between">
        <Text className="font-bold text-2xl">{t("app.plan.title")}</Text>
        <Button
          onPress={handleEditPortfolio}
          variant={"outline"}
          className="py-6"
        >
          <PenIcon className="text-foreground" />
        </Button>
      </View>

      <View className="gap-2 flex items-center">
        <Text className="text-foreground font-bold text-2xl">
          {userData?.data?.monthly_investment_amount} €
        </Text>

        <ChartPie data={tempPieData} showLabels showLegend={false} />
      </View>
      {stocks?.map((stock: Stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </View>
  );
}
