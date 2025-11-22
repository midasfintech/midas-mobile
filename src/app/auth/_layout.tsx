import { Text } from '@/components/ui/text';
import { changeLanguage } from '@/lib/i18n';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AuthLayout() {
  const { i18n } = useTranslation();
  const insets = useSafeAreaInsets();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'sl' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <>
      <View
        className="absolute top-0 right-0 z-10"
        style={{ paddingTop: insets.top + 8, paddingRight: 16 }}
      >
        <Pressable
          onPress={toggleLanguage}
          className="bg-muted px-3 py-1.5 rounded-full active:opacity-70"
        >
          <Text variant="small" className="font-semibold uppercase">
            {i18n.language === 'en' ? 'EN' : 'SL'}
          </Text>
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
