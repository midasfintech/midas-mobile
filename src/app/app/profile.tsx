import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Option,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useGetProfile } from "@/lib/api-query/use-get-profile";
import { SettingsIcon } from "@/lib/icons";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { supabase } from "@/lib/supabase";
import { EmploymentStatuses } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const { t } = useTranslation();
  const { session, signOut } = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [employmentStatus, setEmploymentStatus] = useState<Option>(undefined);
  const [netMonthlyIncome, setNetMonthlyIncome] = useState("");

  const { data: profile, isLoading } = useGetProfile({
    id: session?.user?.id,
  });

  useEffect(() => {
    if (profile?.data) {
      setFirstName(profile.data.first_name || "");
      setLastName(profile.data.last_name || "");
      setDateOfBirth(
        profile.data.date_of_birth
          ? new Date(profile.data.date_of_birth)
          : undefined
      );
      setEmploymentStatus(
        profile.data.employment
          ? {
              value: profile.data.employment,
              label: t(`employmentStatus.${profile.data.employment}`),
            }
          : undefined
      );
      setNetMonthlyIncome(
        profile.data.net_monthly_income?.toString() || ""
      );
    }
  }, [profile?.data, t]);

  async function handleSave() {
    if (!session?.user?.id) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("users_data")
        .update({
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth?.toISOString().split("T")[0],
          employment: employmentStatus?.value || null,
          net_monthly_income: parseFloat(netMonthlyIncome) || null,
        })
        .eq("id", session.user.id);

      if (error) {
        Alert.alert(t("app.profile.errorTitle"), error.message);
      } else {
        queryClient.invalidateQueries();
        setIsEditing(false);
        Alert.alert(
          t("app.profile.successTitle"),
          t("app.profile.saveSuccess")
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert(
        t("app.profile.errorTitle"),
        t("app.profile.saveError")
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.replace("/auth/sign-in");
  }

  async function handleDeleteAccount() {
    Alert.alert(
      t("app.profile.deleteConfirmTitle"),
      t("app.profile.deleteConfirmMessage"),
      [
        {
          text: t("app.profile.cancel"),
          style: "cancel",
        },
        {
          text: t("app.profile.deleteConfirm"),
          style: "destructive",
          onPress: async () => {
            // TODO: Implement account deletion
            Alert.alert(
              t("app.profile.errorTitle"),
              "Account deletion not implemented yet"
            );
          },
        },
      ]
    );
  }

  function resetForm() {
    if (profile?.data) {
      setFirstName(profile.data.first_name || "");
      setLastName(profile.data.last_name || "");
      setDateOfBirth(
        profile.data.date_of_birth
          ? new Date(profile.data.date_of_birth)
          : undefined
      );
      setEmploymentStatus(
        profile.data.employment
          ? {
              value: profile.data.employment,
              label: t(`employmentStatus.${profile.data.employment}`),
            }
          : undefined
      );
      setNetMonthlyIncome(
        profile.data.net_monthly_income?.toString() || ""
      );
    }
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
      <View className="px-6 py-6 gap-6">
        {/* Header with Settings Button */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="font-bold text-foreground text-3xl">
              {t("app.profile.title")}
            </Text>
            <Text className="text-muted-foreground mt-1">
              {session?.user?.email}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/app/settings")}
            className="bg-card border border-border rounded-lg p-3 active:opacity-70"
          >
            <Icon as={SettingsIcon} className="text-foreground size-6" />
          </Pressable>
        </View>

        {/* Profile Card */}
        <View className="bg-card rounded-lg border border-border overflow-hidden">
          {/* Edit Mode Toggle */}
          <View className="bg-muted/30 px-6 py-3 border-b border-border">
            <Text className="text-sm font-medium text-muted-foreground">
              {isEditing
                ? t("app.profile.editMode")
                : t("app.profile.viewMode")}
            </Text>
          </View>

          {/* Form Fields */}
          <View className="p-6 gap-5">
            {/* Name Row */}
            <View className="flex-row gap-3">
              <View className="flex-1 gap-2">
                <Label>{t("auth.signUp.firstName")}</Label>
                <Input
                  value={firstName}
                  onChangeText={setFirstName}
                  editable={isEditing}
                  placeholder={t("auth.signUp.firstNamePlaceholder")}
                  className={!isEditing ? "opacity-60" : ""}
                />
              </View>

              <View className="flex-1 gap-2">
                <Label>{t("auth.signUp.lastName")}</Label>
                <Input
                  value={lastName}
                  onChangeText={setLastName}
                  editable={isEditing}
                  placeholder={t("auth.signUp.lastNamePlaceholder")}
                  className={!isEditing ? "opacity-60" : ""}
                />
              </View>
            </View>

            {/* Date of Birth */}
            <View className="gap-2">
              <Label>{t("auth.signUp.dateOfBirth")}</Label>
              {isEditing ? (
                <DatePickerInput
                  value={dateOfBirth}
                  onChange={setDateOfBirth}
                  placeholder={t("auth.signUp.dateOfBirthPlaceholder")}
                  maximumDate={new Date()}
                />
              ) : (
                <Input
                  value={dateOfBirth?.toLocaleDateString() || ""}
                  editable={false}
                  className="opacity-60"
                />
              )}
            </View>

            {/* Employment Status */}
            <View className="gap-2">
              <Label>{t("auth.signUp.employmentStatus")}</Label>
              {isEditing ? (
                <Select
                  value={employmentStatus}
                  onValueChange={setEmploymentStatus}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("auth.signUp.selectEmploymentStatus")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(EmploymentStatuses).map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        label={t(`employmentStatus.${status}`)}
                      />
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={employmentStatus?.label || ""}
                  editable={false}
                  className="opacity-60"
                />
              )}
            </View>

            {/* Net Monthly Income */}
            <View className="gap-2">
              <Label>{t("auth.signUp.netMonthlyIncome")}</Label>
              <Input
                value={netMonthlyIncome}
                onChangeText={setNetMonthlyIncome}
                editable={isEditing}
                keyboardType="decimal-pad"
                placeholder="0"
                className={!isEditing ? "opacity-60" : ""}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="px-6 pb-6 gap-3">
            {isEditing ? (
              <View className="flex-row gap-3">
                <Button
                  variant="outline"
                  onPress={() => {
                    setIsEditing(false);
                    resetForm();
                  }}
                  className="flex-1"
                  disabled={isSaving}
                >
                  <Text>{t("app.profile.cancel")}</Text>
                </Button>
                <Button
                  onPress={handleSave}
                  className="flex-1"
                  disabled={isSaving}
                >
                  <Text>
                    {isSaving
                      ? t("app.profile.saving")
                      : t("app.profile.save")}
                  </Text>
                </Button>
              </View>
            ) : (
              <Button onPress={() => setIsEditing(true)}>
                <Text>{t("app.profile.edit")}</Text>
              </Button>
            )}
          </View>
        </View>

        {/* Account Actions */}
        <View className="gap-3">
          <Text className="text-sm font-medium text-muted-foreground px-1">
            {t("app.profile.accountActions")}
          </Text>

          <Button
            variant="outline"
            onPress={handleSignOut}
            className="w-full"
          >
            <Text>{t("app.profile.signOut")}</Text>
          </Button>

          <Button
            variant="destructive"
            onPress={handleDeleteAccount}
            className="w-full"
          >
            <Text>{t("app.profile.delete")}</Text>
          </Button>
        </View>

        {/* App Info */}
        <View className="items-center py-4">
          <Text className="text-xs text-muted-foreground">
            {t("app.profile.version")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
