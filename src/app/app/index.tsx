import { Text } from "@/components/ui/text";
import { useGetProfile } from "@/lib/api-query/use-get-profile";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { useRouter } from "expo-router";
import { GraduationCapIcon } from "@/lib/icons/graduation-cap";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { ChartLineIcon } from "@/lib/icons/chart";
import { ChartLine } from "@/components/ui/chart";

export default function AppHome() {
  const { t } = useTranslation();
  const { session } = useAuthContext();
  const router = useRouter();
  const { data: userProfile } = useGetProfile({ id: session?.user?.id });

  //remove later, just for demo purposes
  const userGrowthData = [
    { x: "Jan", y: 120 },
    { x: "Feb", y: 180 },
    { x: "Mar", y: 250 },
    { x: "Apr", y: 320 },
    { x: "May", y: 410 },
    { x: "Jun", y: 520 },
  ];

  useEffect(() => {
    if (userProfile && userProfile.data?.knowledge === null) {
      router.replace("/auth/assessment");
    }
  }, [userProfile, router]);

  return (
    <ScrollView>
      <View className="flex-1 bg-background h-screen">
        <View className="h-[35%] bg-primary px-6 py-4 gap-4">
          <Text className="text-2xl font-extrabold text-white">
            {t("app.home.title")}
          </Text>
          <Text className="text-white">{t("app.home.subtitle")}</Text>
        </View>
        <View className="bg-card rounded-lg shadow-sm -mt-16 mx-6 pr-2 pl-1 pt-2 pb-1 border border-primary">
          <ChartLine data={userGrowthData} height={200} showGrid={false} />
          <View className="flex flex-row justify-between pl-1 abso">
            <Text className="text-sm text-foreground">
              {t("app.home.chartStart")}
            </Text>
            <Text className="text-sm text-foreground">
              10 {t("app.home.chartEnd")}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-muted-foreground mx-6 mt-2 mb-8">
          {t("app.home.chartTitle")}
        </Text>
        <View className="bg-[rgba(79,57,246,0.2)] mx-6 px-5 py-2 rounded-lg flex flex-row justify-between items-center">
          <View className=" gap-2 w-4/5">
            <Text className="text-lg font-bold text-secondary">
              {t("app.home.learningTitle")}
            </Text>
            <Text className="text-secondary text-sm">
              {t("app.home.learningSubtitle")}
            </Text>
          </View>
          <GraduationCapIcon
            size={60}
            absoluteStrokeWidth={true}
            className="text-secondary absolute right-2"
          />
        </View>

        <View className="bg-[rgba(240,177,0,0.2)] mx-6 mt-4 px-5 py-2 rounded-lg flex flex-row justify-between items-center">
          <View className=" gap-2 w-4/5">
            <Text className="text-lg font-bold text-primary">
              {t("app.home.futureTitle")}
            </Text>
            <Text className="text-primary text-sm">
              {t("app.home.futureSubtitle")}
            </Text>
          </View>
          <ChartLineIcon
            size={60}
            absoluteStrokeWidth={true}
            className="text-primary absolute right-2"
          />
        </View>
      </View>
    </ScrollView>
  );
}
