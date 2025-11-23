import { PenIcon } from "@/lib/icons";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { useGetProfile } from "@/lib/api-query/use-get-profile";
import PieChart from "react-native-pie-chart";
import { useRouter } from "expo-router";
import { StockCard } from "@/components/trading/stock-card";
import { Stock } from "@/lib/api-query/types/stock";
import { useGetStocks } from "@/lib/api-query/use-get-stocks";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlanScreen() {
  const { t } = useTranslation();
  const { session } = useAuthContext();
  const { data: userData } = useGetProfile({ id: session?.user.id || "" });
  const { data: stocks } = useGetStocks();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleEditPortfolio = () => {
    router.push("/app/plan/edit");
  };

  const tempPieData = [
    { value: 35, color: "#fdc700" },
    { value: 25, color: "#7c86ff" },
    { value: 40, color: "#96f7e4" },
  ];

  return (
    <ScrollView
      className="flex-1 bg-background px-6 py-4"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
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

      <View className="gap-2 flex items-center mb-4">
        <Text className="text-foreground font-bold text-2xl">
          {userData?.data?.monthly_investment_amount} €
        </Text>

        <PieChart widthAndHeight={200} series={tempPieData} cover={0.6} />

        <View className="gap-2">
          <View className="flex flex-row items-center justify-start gap-4">
            <View className="bg-primary h-4 w-4 rounded-sm"></View>
            <Text className="w-[]">{t("app.plan.savings")}</Text>
          </View>

          <View className="flex flex-row items-center justify-start gap-4">
            <View className="bg-[#7c86ff] h-4 w-4 rounded-sm"></View>
            <Text>{t("app.plan.etf")}</Text>
          </View>

          <View className="flex flex-row items-center justify-start gap-4">
            <View className="bg-[#96f7e4] h-4 w-4 rounded-sm"></View>
            <Text>{t("app.plan.savings")}</Text>
          </View>
        </View>
      </View>

      {stocks?.map((stock: Stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </ScrollView>
  );
}
