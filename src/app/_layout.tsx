import { useColorScheme } from '@/hooks/use-color-scheme';
import '@/lib/i18n';
import { AuthProvider } from '@/lib/providers/auth-provider';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@/lib/theme-context';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  const { colorScheme } = useColorScheme();
  const effectiveColorScheme = colorScheme ?? 'light';

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavThemeProvider value={NAV_THEME[effectiveColorScheme]}>
        <AuthProvider>
          <View style={{ flex: 1 }} className={effectiveColorScheme === 'dark' ? 'dark bg-background' : 'bg-background'}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="home" />
              <Stack.Screen name="auth" />
            </Stack>
            <StatusBar style={effectiveColorScheme === "dark" ? "light" : "dark"} translucent backgroundColor="transparent" />
            <PortalHost />
          </View>
        </AuthProvider>
      </NavThemeProvider>
    </SafeAreaProvider>
  );
}
