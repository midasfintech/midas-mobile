import { useColorScheme } from '@/hooks/use-color-scheme';
import '@/lib/i18n';
import { AuthProvider } from '@/lib/providers/auth-provider';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@/lib/theme-context';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, usePathname } from 'expo-router';
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
  const pathname = usePathname();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
      },
    },
  });

  const bgColor = pathname === "/app" ? "bg-primary" : "bg-background";

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavThemeProvider value={NAV_THEME[effectiveColorScheme]}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <View style={{ flex: 1 }} className={effectiveColorScheme === 'dark' ? `dark ${bgColor}` : bgColor}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="app" />
                <Stack.Screen name="auth" />
                <Stack.Screen name="settings" />
              </Stack>
              <StatusBar style={effectiveColorScheme === "dark" ? "light" : "dark"} translucent backgroundColor="transparent" />
              <PortalHost />
            </View>
          </QueryClientProvider>
        </AuthProvider>
      </NavThemeProvider>
    </SafeAreaProvider>
  );
}
