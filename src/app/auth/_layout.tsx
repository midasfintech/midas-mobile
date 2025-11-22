import { Text } from '@/components/ui/text';
import { changeLanguage } from '@/lib/i18n';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

export default function AuthLayout() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'sl' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <>
      <View
        className="w-full flex flex-row justify-between items-center px-4 py-4"
      >
        <Pressable
          onPress={toggleLanguage}
          className="bg-muted px-3 py-1.5 rounded-full active:opacity-70"
        >
          <Text variant="small" className="font-semibold uppercase">
            {i18n.language === 'en' ? 'EN' : 'SL'}
          </Text>
        </Pressable>
        <Pressable
          onPress={toggleLanguage}
        >
          
        </Pressable>
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="confirm-email" />
      </Stack>
    </>
  );
}
