import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useGetProfile } from '@/lib/api-query/use-get-profile.ts';
import { setProfile } from '@/lib/api-query/set-profile.ts';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { t } = useTranslation();
  const { session, signOut } = useAuthContext();
  const router = useRouter();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');
  const [income, setIncome] = useState('');

  useEffect(() => {
    if (profile?.data) {
      setName(profile.data.first_name || '');
      setSurname(profile.data.last_name || '');
      setDob(profile.data.date_of_birth || '');
      setStatus(profile.data.employment || '');
      setIncome(profile.data.net_monthly_income || '');
    }
  }, [profile?.data]);

  const { data: profile } = useGetProfile({ id: session?.user?.id });

  async function handleSignOut() {
    await signOut();
      router.replace('/auth/sign-in');
  }
  async function handleDelete() {
    // Handle account deletion
  }
  function handleSaveEdit() {
    setProfile({
      id: session?.user?.id, 
      name: profile?.data.first_name || '', 
      surname: profile?.data.last_name || '', 
      income: profile?.data.net_monthly_income || 0, 
      status: profile?.data.employment || '', 
      dob: profile?.data.date_of_birth || ''
    });
  }

  return (
    <View className="flex-1 bg-background px-6 justify-center items-center gap-6">
      <View className="items-center gap-4">
        <Text variant="h1">{t('app.profile.title')}{profile.data.first_name}!</Text>

        <View className="bg-card p-6 rounded-lg border border-border w-[60%] gap-3">
          <View className="flex-row items-center gap-2">
            <Text variant="muted" className="mb-1">{t('app.profile.name')}</Text>
            <Input
              value={name}
              editable={true}
              className="font-mono text-sm bg-transparent border-none outline-none"
              onChangeText={setName}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <Text variant="muted" className="mb-1">{t('app.profile.surname')}</Text>
            <Input
              value={surname}
              editable={true}
              className="font-mono text-sm bg-transparent border-b border-border"
              onChangeText={setSurname}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <Text variant="muted" className="mb-1">{t('app.profile.dob')}</Text>
            <Input
              value={dob}
              editable={true}
              className="font-mono text-sm bg-transparent border-none outline-none"
              onChangeText={setDob}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <Text variant="muted" className="mb-1">{t('app.profile.status')}</Text>
            <Input
              value={status}
              editable={true}
              className="font-mono text-sm bg-transparent border-none outline-none"
              onChangeText={setStatus}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <Text variant="muted" className="mb-1">{t('app.profile.income')}</Text>
            <Input
              value={income}
              editable={true}
              className="font-mono text-sm bg-transparent border-none outline-none"
              onChangeText={setIncome}
            />
          </View>

          <Button onPress={handleSaveEdit} className="mt-4">
            <Text className="text-primary-foreground font-semibold">{t('app.profile.edit')}</Text>
          </Button>
        </View>

      </View>
      <View className="flex-row justify-center items-center gap-4 mt-4">
        <Button onPress={handleSignOut} className="mt-4">
          <Text className="text-primary-foreground font-semibold">{t('app.profile.signOut')}</Text>
        </Button>
        <Button variant="destructive" onPress={handleDelete} className="mt-4">
          <Text className="font-semibold">{t('app.profile.delete')}</Text>
        </Button>
      </View>
    </View>
  );
}
