import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function SignUp() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert(t('auth.signUp.errorTitle'), t('auth.signUp.passwordMismatch'));
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(t('auth.signUp.errorTitle'), error.message);
      setLoading(false);
    } else if (!session) {
      // Email confirmation required - redirect to confirmation screen
      router.replace({
        pathname: '/auth/confirm-email',
        params: { email },
      });
    } else {
      // No email confirmation needed - go straight to app
      router.replace('/app');
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              source={require('../../../assets/images/android-icon-foreground.png')}
              className="w-24 h-24"
              resizeMode="contain"
            />
            <Text variant="h1" className="mt-4 mb-2">
              {t('auth.signUp.title')}
            </Text>
            <Text variant="muted" className="text-center">
              {t('auth.signUp.subtitle')}
            </Text>
          </View>

          {/* Form Section */}
          <View className="gap-6">
            <View className="gap-2">
              <Label nativeID="email">{t('auth.signUp.email')}</Label>
              <Input
                nativeID="email"
                placeholder={t('auth.signUp.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            <View className="gap-2">
              <Label nativeID="password">{t('auth.signUp.password')}</Label>
              <Input
                nativeID="password"
                placeholder={t('auth.signUp.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />
            </View>

            <View className="gap-2">
              <Label nativeID="confirmPassword">{t('auth.signUp.confirmPassword')}</Label>
              <Input
                nativeID="confirmPassword"
                placeholder={t('auth.signUp.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />
            </View>

            <Button
              onPress={signUpWithEmail}
              disabled={loading}
              className="mt-2"
            >
              <Text className="text-primary-foreground font-semibold">
                {loading ? t('auth.signUp.creatingAccount') : t('auth.signUp.signUpButton')}
              </Text>
            </Button>
          </View>

          {/* Footer Section */}
          <View className="mt-8 items-center">
            <Text variant="muted">
              {t('auth.signUp.haveAccount')}{' '}
              <Link href="/auth/sign-in">
                <Text className="text-primary font-semibold">{t('auth.signUp.signInLink')}</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
