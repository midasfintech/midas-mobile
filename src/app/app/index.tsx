import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useGetProfile } from '@/lib/api-query/use-get-profile';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function AppHome() {
  const { t } = useTranslation();
  const { session } = useAuthContext();
  const { data: userProfile } = useGetProfile({ id: session?.user?.id });
  const router = useRouter();

  function handleOpenShowcase() {
    // router.push('/showcase');
  }
  function handleOpenProfile() {
    router.push('/app/profile');
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

          <Button onPress={handleOpenProfile} className="mt-4">
            <Text className="text-primary-foreground font-semibold">{t('app.home.profile')}</Text>
          </Button>
        </View>
      </View>

      <Button onPress={handleOpenShowcase} className="mt-4">
        <Text className="text-primary-foreground font-semibold">{t('app.home.showcase')}</Text>
      </Button>
    </View>
  );
}
