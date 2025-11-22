import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function AppHome() {
  const { t } = useTranslation();
  const { session, signOut } = useAuthContext();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    // router.replace('/auth/sign-in');
  }

  function handleOpenShowcase() {
    // router.push('/showcase');
  }
  function handleOpenProfile() {
    // router.push('/profile');
  }

  return (
    <View className="flex-1 bg-background px-6 justify-center items-center gap-6">
      <View className="items-center gap-4">
        <Text variant="h1">{t('app.settings.title')}</Text>

        <View className="bg-card p-6 rounded-lg border border-border w-full max-w-md gap-3">
          <View>
            <Text variant="muted" className="mb-1">{t('app.settings.userId')}</Text>
            <Text className="font-mono text-sm">{session?.user?.id}</Text>
            <Button className="px-2 py-1 rounded-md text-xs h-6 w-1/2 m-auto mt-2">
              <Text>{t('app.settings.edit')}</Text>
            </Button>
          </View>

          <View>
            <Text variant="muted" className="mb-1">{t('app.settings.dob')}</Text>
            <Text className="font-semibold">{session?.user?.email}</Text>
            <Button className="px-2 py-1 rounded-md text-xs h-6 w-1/2 m-auto mt-2">
              <Text>{t('app.settings.edit')}</Text>
            </Button>
          </View>

          <View>
            <Text variant="muted" className="mb-1">{t('app.settings.email')}</Text>
            <Text className="font-semibold">{session?.user?.email}</Text>
            <Button onPress={handleOpenProfile} className="px-2 py-1 rounded-md text-xs h-6 w-1/2 m-auto mt-2">
              <Text>{t('app.settings.edit')}</Text>
            </Button>
          </View>
        </View>
      </View>

      <Button onPress={handleSignOut} className="mt-4">
        <Text className="text-primary-foreground font-semibold">{t('app.settings.signOut')}</Text>
      </Button>
    </View>
  );
}
