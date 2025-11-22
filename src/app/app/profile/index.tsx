import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { t } = useTranslation();
  const { session, signOut } = useAuthContext();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from('users_data')
          .select('*')
          .eq('id', session?.user?.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session?.user?.id]);

  async function handleSignOut() {
    await signOut();
      router.replace('/auth/sign-in');
  }


  return (
    <View className="flex-1 bg-background px-6 justify-center items-center gap-6">
      <View className="items-center gap-4">
        <Text variant="h1">{t('app.profile.title')}</Text>

        <View className="bg-card p-6 rounded-lg border border-border w-full max-w-md gap-3">
          <View>
            <Text variant="muted" className="mb-1">{t('app.profile.name')}</Text>
            <Text className="font-mono text-sm">{profile?.first_name}</Text>
            <Button className="px-2 py-1 rounded-md text-xs h-6 w-1/2 m-auto mt-2">
              <Text>{t('app.profile.edit')}</Text>
            </Button>
          </View>

          <View>
            <Text variant="muted" className="mb-1">{t('app.profile.surname')}</Text>
            <Text className="font-mono text-sm">{profile?.last_name}</Text>
            <Button className="px-2 py-1 rounded-md text-xs h-6 w-1/2 m-auto mt-2">
              <Text>{t('app.profile.edit')}</Text>
            </Button>
          </View>

          <View>
            <Text variant="muted" className="mb-1">{t('app.profile.dob')}</Text>
            <Text className="font-semibold">{profile?.dob}</Text>
            <Button className="px-2 py-1 rounded-md text-xs h-6 w-1/2 m-auto mt-2">
              <Text>{t('app.profile.edit')}</Text>
            </Button>
          </View>

          <View>
            <Text variant="muted" className="mb-1">{t('app.profile.status')}</Text>
            <Text className="font-mono text-sm">{session?.user?.id}</Text>
            <Button className="px-2 py-1 rounded-md text-xs h-6 w-1/2 m-auto mt-2">
              <Text>{t('app.profile.edit')}</Text>
            </Button>
          </View>

          <View>
            <Text variant="muted" className="mb-1">{t('app.profile.income')}</Text>
            <Text className="font-mono text-sm">{session?.user?.id}</Text>
            <Button className="px-2 py-1 rounded-md text-xs h-6 w-1/2 m-auto mt-2">
              <Text>{t('app.profile.edit')}</Text>
            </Button>
          </View>

          <View>
            <Text variant="muted" className="mb-1">{t('app.profile.email')}</Text>
            <Text className="font-semibold">{session?.user?.email}</Text>
          </View>
        </View>
      </View>

      <Button onPress={handleSignOut} className="mt-4">
        <Text className="text-primary-foreground font-semibold">{t('app.profile.signOut')}</Text>
      </Button>
    </View>
  );
}
