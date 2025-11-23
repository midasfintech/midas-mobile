import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { ChevronRightIcon, LockIcon } from "@/lib/icons";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { useGetProfile } from "@/lib/api-query/use-get-profile";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";

export default function EditPortfolio() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session } = useAuthContext();
  const { data: userData } = useGetProfile({ id: session?.user?.id || "" });
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();

  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [savings, setSavings] = useState(33);
  const [etf, setEtf] = useState(33);
  const [stocks, setStocks] = useState(34);
  const [lockedSliders, setLockedSliders] = useState({
    savings: false,
    etf: false,
    stocks: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userData?.data) {
      setMonthlyAmount(userData.data.monthly_investment_amount?.toString() || "");
      // TODO: Load portfolio allocation from database
      // For now using default values
    }
  }, [userData]);

  const toggleLock = (slider: keyof typeof lockedSliders) => {
    setLockedSliders((prev) => ({ ...prev, [slider]: !prev[slider] }));
  };

  const adjustSliders = (
    changedSlider: "savings" | "etf" | "stocks",
    newValue: number
  ) => {
    const roundedValue = Math.round(newValue);
    const currentTotal = savings + etf + stocks;
    const difference = roundedValue - (changedSlider === "savings" ? savings : changedSlider === "etf" ? etf : stocks);

    // Get unlocked sliders (excluding the one being changed)
    const unlockedSliders = (["savings", "etf", "stocks"] as const).filter(
      (s) => s !== changedSlider && !lockedSliders[s]
    );

    if (unlockedSliders.length === 0) {
      // All other sliders are locked, just set the value and let it go over 100
      if (changedSlider === "savings") setSavings(roundedValue);
      else if (changedSlider === "etf") setEtf(roundedValue);
      else setStocks(roundedValue);
      return;
    }

    // Distribute the difference among unlocked sliders
    const adjustmentPerSlider = -difference / unlockedSliders.length;

    const newValues = {
      savings,
      etf,
      stocks,
      [changedSlider]: roundedValue,
    };

    // Adjust unlocked sliders
    unlockedSliders.forEach((slider) => {
      newValues[slider] = Math.max(
        0,
        Math.min(100, Math.round(newValues[slider] + adjustmentPerSlider))
      );
    });

    // Final adjustment to ensure exactly 100
    const total = newValues.savings + newValues.etf + newValues.stocks;
    if (total !== 100 && unlockedSliders.length > 0) {
      const diff = 100 - total;
      newValues[unlockedSliders[0]] += diff;
    }

    setSavings(Math.max(0, Math.min(100, newValues.savings)));
    setEtf(Math.max(0, Math.min(100, newValues.etf)));
    setStocks(Math.max(0, Math.min(100, newValues.stocks)));
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;

    const total = savings + etf + stocks;
    if (total !== 100) {
      Alert.alert(
        t("app.plan.errorTitle"),
        t("app.plan.percentageError")
      );
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("users_data")
        .update({
          monthly_investment_amount: parseFloat(monthlyAmount) || null,
          // TODO: Add portfolio allocation columns to database
        })
        .eq("id", session.user.id);

      if (error) {
        Alert.alert(t("app.plan.errorTitle"), error.message);
      } else {
        await queryClient.invalidateQueries();
        Alert.alert(
          t("app.plan.successTitle"),
          t("app.plan.saveSuccess"),
          [{ text: "OK", onPress: () => router.back() }]
        );
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      Alert.alert(
        t("app.plan.errorTitle"),
        t("app.plan.saveError")
      );
    } finally {
      setIsSaving(false);
    }
  };

  const total = savings + etf + stocks;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="px-6 py-6 gap-6">
        {/* Header with Back Button */}
        <View className="flex-row items-center gap-4">
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
            <Text className="font-bold text-foreground text-3xl">
              {t("app.plan.editTitle")}
            </Text>
          </View>
        </View>

        {/* Monthly Investment Amount */}
        <View className="bg-card p-6 rounded-lg border border-border gap-4">
          <Text className="font-semibold text-foreground text-lg">
            {t("app.plan.monthlyInvestment")}
          </Text>
          <View className="gap-2">
            <Label>{t("app.plan.amount")}</Label>
            <Input
              value={monthlyAmount}
              onChangeText={setMonthlyAmount}
              keyboardType="decimal-pad"
              placeholder="200"
            />
          </View>
        </View>

        {/* Portfolio Allocation */}
        <View className="bg-card p-6 rounded-lg border border-border gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-foreground text-lg">
              {t("app.plan.allocation")}
            </Text>
            <Text
              className={`text-sm font-medium ${
                total === 100 ? "text-green-500" : "text-destructive"
              }`}
            >
              {total}%
            </Text>
          </View>

          {/* Savings Slider */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Label>{t("app.plan.savings")}</Label>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-muted-foreground">
                  {savings}%
                </Text>
                <Pressable onPress={() => toggleLock("savings")}>
                  <Icon
                    as={LockIcon}
                    className={`size-5 ${
                      lockedSliders.savings
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </Pressable>
              </View>
            </View>
            <Slider
              value={savings}
              onValueChange={(value) => adjustSliders("savings", value)}
              minimumValue={0}
              maximumValue={100}
              step={1}
              disabled={lockedSliders.savings}
              minimumTrackTintColor="#fdc700"
              maximumTrackTintColor="#e5e5e5"
              thumbTintColor="#fdc700"
            />
          </View>

          {/* ETF Slider */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Label>{t("app.plan.etf")}</Label>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-muted-foreground">{etf}%</Text>
                <Pressable onPress={() => toggleLock("etf")}>
                  <Icon
                    as={LockIcon}
                    className={`size-5 ${
                      lockedSliders.etf
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </Pressable>
              </View>
            </View>
            <Slider
              value={etf}
              onValueChange={(value) => adjustSliders("etf", value)}
              minimumValue={0}
              maximumValue={100}
              step={1}
              disabled={lockedSliders.etf}
              minimumTrackTintColor="#7c86ff"
              maximumTrackTintColor="#e5e5e5"
              thumbTintColor="#7c86ff"
            />
          </View>

          {/* Stocks Slider */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Label>{t("app.plan.stocks")}</Label>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-muted-foreground">
                  {stocks}%
                </Text>
                <Pressable onPress={() => toggleLock("stocks")}>
                  <Icon
                    as={LockIcon}
                    className={`size-5 ${
                      lockedSliders.stocks
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </Pressable>
              </View>
            </View>
            <Slider
              value={stocks}
              onValueChange={(value) => adjustSliders("stocks", value)}
              minimumValue={0}
              maximumValue={100}
              step={1}
              disabled={lockedSliders.stocks}
              minimumTrackTintColor="#96f7e4"
              maximumTrackTintColor="#e5e5e5"
              thumbTintColor="#96f7e4"
            />
          </View>
        </View>

        {/* Save Button */}
        <View className="gap-3">
          <Button onPress={handleSave} disabled={isSaving || total !== 100}>
            <Text>
              {isSaving ? t("app.plan.saving") : t("app.plan.saveChanges")}
            </Text>
          </Button>
          <Button variant="outline" onPress={() => router.back()}>
            <Text>{t("app.plan.cancel")}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
