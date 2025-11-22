import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(t('auth.signIn.errorTitle'), error.message);
    } else {
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
              {t('auth.signIn.title')}
            </Text>
            <Text variant="muted" className="text-center">
              {t('auth.signIn.subtitle')}
            </Text>
          </View>

          {/* Form Section */}
          <View className="gap-6">
            <View className="gap-2">
              <Label nativeID="email">{t('auth.signIn.email')}</Label>
              <Input
                nativeID="email"
                placeholder={t('auth.signIn.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            <View className="gap-2">
              <Label nativeID="password">{t('auth.signIn.password')}</Label>
              <Input
                nativeID="password"
                placeholder={t('auth.signIn.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
            </View>

            <Button
              onPress={signInWithEmail}
              disabled={loading}
              className="mt-2"
            >
              <Text className="text-primary-foreground font-semibold">
                {loading ? t('auth.signIn.signingIn') : t('auth.signIn.signInButton')}
              </Text>
            </Button>
          </View>

          {/* Footer Section */}
          <View className="mt-8 items-center">
            <Text variant="muted">
              {t('auth.signIn.noAccount')}{' '}
              <Link href="/auth/sign-up">
                <Text className="text-primary font-semibold">{t('auth.signIn.signUpLink')}</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
