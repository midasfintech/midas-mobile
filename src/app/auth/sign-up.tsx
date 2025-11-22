import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { supabase } from "@/lib/supabase";
import { EmploymentStatus, EmploymentStatuses } from "@/lib/types";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function SignUp() {
  const { t } = useTranslation();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus | "">("");
  const [netMonthlyIncome, setNetMonthlyIncome] = useState("");
  const [monthlyInvestmentAmount, setMonthlyInvestmentAmount] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const localizedEmploymentStatuses: Record<EmploymentStatus, string> = {
    employed: t("employmentStatus.employed"),
    self_employed: t("employmentStatus.selfEmployed"),
    unemployed: t("employmentStatus.unemployed"),
    student: t("employmentStatus.student"),
    retired: t("employmentStatus.retired"),
  };

  const handleSelectEmploymentStatus = (value: { value: string; label: string } | undefined) => {
      if (value?.value) {
        setEmploymentStatus(value.value as EmploymentStatus);
      }
    }

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert(
        t("auth.signUp.errorTitle"),
        t("auth.signUp.passwordMismatch"),
      );
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth?.toISOString() || null,
          net_monthly_income: netMonthlyIncome ? parseFloat(netMonthlyIncome) : null,
          employment: employmentStatus || null,
          monthly_investment_amount: monthlyInvestmentAmount ? parseFloat(monthlyInvestmentAmount) : null,
        }
      }
    });

    console.log({ error })

    if (error) {
      Alert.alert(t("auth.signUp.errorTitle"), error.message);
      setLoading(false);
    } else if (!session) {
      // Email confirmation required - redirect to confirmation screen
      router.replace({
        pathname: "/auth/confirm-email",
        params: { email },
      });
    } else {
      // No email confirmation needed - go straight to app
      router.replace("/app");
    }
    setLoading(false);
  }

  const handleStep2 = () => {
    if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
      Alert.alert(
        t("auth.signUp.errorTitle"),
        t("auth.signUp.fillAllFields"),
      );
      return;
    }

    setStep(2);
  }

  const handleStep3 = () => {
    if (firstName.length === 0 || lastName.length === 0 || dateOfBirth === undefined) {
      Alert.alert(
        t("auth.signUp.errorTitle"),
        t("auth.signUp.fillAllFields"),
      );
      return;
    }

    setStep(3);
  }

  const getContent = () => {
    if (step === 1) {
      return (
        <View className="gap-4">
          <View className="gap-2">
            <Label nativeID="email">{t("auth.signUp.email")}</Label>
            <Input
              nativeID="email"
              placeholder={t("auth.signUp.emailPlaceholder")}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View className="gap-2">
            <Label nativeID="password">{t("auth.signUp.password")}</Label>
            <Input
              nativeID="password"
              placeholder={t("auth.signUp.passwordPlaceholder")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
            />
          </View>

          <View className="gap-2">
            <Label nativeID="confirmPassword">
              {t("auth.signUp.confirmPassword")}
            </Label>
            <Input
              nativeID="confirmPassword"
              placeholder={t("auth.signUp.confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
            />
          </View>

          <Button onPress={handleStep2} className="mt-2">
            <Text className="text-primary-foreground font-semibold">
              {t("auth.signUp.next")}
            </Text>
          </Button>
        </View>
      );
    }

    if (step === 2) {
      return (
        <View className="gap-4">
          <View className="gap-2">
            <Label nativeID="firstName">{t("auth.signUp.firstName")}</Label>
            <Input
              nativeID="firstName"
              placeholder={t("auth.signUp.firstNamePlaceholder")}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              autoComplete="name-given"
            />
          </View>

          <View className="gap-2">
            <Label nativeID="lastName">{t("auth.signUp.lastName")}</Label>
            <Input
              nativeID="lastName"
              placeholder={t("auth.signUp.lastNamePlaceholder")}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              autoComplete="name-family"
            />
          </View>

          <View className="gap-2">
            <Label nativeID="dateOfBirth">{t("auth.signUp.dateOfBirth")}</Label>
            <DatePickerInput
              value={dateOfBirth}
              onChange={setDateOfBirth}
              placeholder={t("auth.signUp.dateOfBirthPlaceholder")}
              maximumDate={new Date()}
            />
          </View>

          <Button onPress={handleStep3} className="mt-2">
            <Text className="text-primary-foreground font-semibold">
              {t("auth.signUp.next")}
            </Text>
          </Button>
        </View>
      );
    }

    if (step === 3) {
      return (
        <View className="gap-4">
          <View className="gap-2">
            <Label nativeID="netMonthlyIncome">{t("auth.signUp.netMonthlyIncome")}</Label>
            <Input
              nativeID="netMonthlyIncome"
              placeholder={t("auth.signUp.netMonthlyIncome")}
              value={netMonthlyIncome}
              onChangeText={setNetMonthlyIncome}
              keyboardType="number-pad"
            />
          </View>

          <View className="gap-2">
            <Label nativeID="employmentStatus">{t("auth.signUp.employmentStatus")}</Label>
            <Select
              defaultValue={{
                value: employmentStatus,
                label: employmentStatus !== "" ? localizedEmploymentStatuses[employmentStatus] : t("auth.signUp.selectEmploymentStatus"),
              }}
              onValueChange={handleSelectEmploymentStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('auth.signUp.selectEmploymentStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(EmploymentStatuses).map((status) => (
                    <SelectItem label={localizedEmploymentStatuses[status]} value={status} key={status}>
                      {localizedEmploymentStatuses[status]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>

          <View className="gap-2">
            <Label nativeID="monthlyInvestmentAmount">{t("auth.signUp.monthlyInvestmentAmount")}</Label>
            <Input
              nativeID="monthlyInvestmentAmount"
              placeholder={t("auth.signUp.monthlyInvestmentAmount")}
              value={monthlyInvestmentAmount}
              onChangeText={setMonthlyInvestmentAmount}
              keyboardType="number-pad"
            />
          </View>

          <Button onPress={signUpWithEmail} disabled={loading} className="mt-2">
            <Text className="text-primary-foreground font-semibold">
              {loading
                ? t("auth.signUp.creatingAccount")
                : t("auth.signUp.signUpButton")}
            </Text>
          </Button>
        </View>
      )
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 bg-background px-6 justify-center">
          {/* Logo Section */}
          <View className="items-center mb-12">
            <Image
              source={require("../../../assets/images/android-icon-foreground.png")}
              className="w-24 h-24"
              resizeMode="contain"
            />
            <Text variant="h1" className="mt-4 mb-2">
              {t("auth.signUp.title")}
            </Text>
            <Text variant="muted" className="text-center">
              {t("auth.signUp.subtitle")}
            </Text>
          </View>

          {/* Form Section */}
          {getContent()}

          {/* Footer Section */}
          <View className="mt-8 items-center">
            <Text variant="muted">
              {t("auth.signUp.haveAccount")}{" "}
              <Link href="/auth/sign-in">
                <Text className="text-primary font-semibold">
                  {t("auth.signUp.signInLink")}
                </Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
