import { Text } from '@/components/ui/text';
import { useGetProfile } from '@/lib/api-query/use-get-profile';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function AppHome() {
  const { t } = useTranslation();
  const { session } = useAuthContext();
  const router = useRouter();
  const { data: userProfile } = useGetProfile({ id: session?.user?.id });

  useEffect(() => {
    if (userProfile && userProfile.data?.knowledge === null) {
      router.replace('/auth/assessment');
    }
  }, [userProfile, router]);

  return (
    <View className="flex-1 bg-background h-screen">
      <View className='h-[40%] bg-primary px-6 py-4 gap-4'>
        <Text className="text-2xl font-extrabold text-white">
          {t("app.home.title")}
        </Text>
        <Text className="text-white">
          {t("app.home.subtitle")}
        </Text>
      </View>
    </View>
  );
}
