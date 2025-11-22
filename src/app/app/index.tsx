import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function AppHome() {
  const { t } = useTranslation();
  const { session, signOut } = useAuthContext();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.replace('/auth/sign-in');
  }

  return (
    <View className="flex-1 bg-background px-6 justify-center items-center gap-6">
      <View className="items-center gap-4">
        <Text variant="h1">{t('app.home.welcome')}</Text>

        <View className="bg-card p-6 rounded-lg border border-border w-full max-w-md gap-3">
          <View>
            <Text variant="muted" className="mb-1">{t('app.home.userId')}</Text>
            <Text className="font-mono text-sm">{session?.user?.id}</Text>
          </View>

          <View>
            <Text variant="muted" className="mb-1">{t('app.home.email')}</Text>
            <Text className="font-semibold">{session?.user?.email}</Text>
          </View>
        </View>
      </View>

      <Button onPress={handleSignOut} className="mt-4">
        <Text className="text-primary-foreground font-semibold">{t('app.home.signOut')}</Text>
      </Button>
    </View>
  );
}
