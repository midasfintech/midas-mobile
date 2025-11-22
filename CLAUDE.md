# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the App
```bash
npm start                 # Start Expo development server
npm run android          # Run on Android device/emulator
npm run ios              # Run on iOS device/simulator
npm run web              # Run in web browser
```

### Code Quality
```bash
npm run lint             # Run ESLint
```

### Building
```bash
npm run build            # Interactive CLI for creating builds (development/production, local/EAS)
```

The build script is interactive and prompts for:
- Platform (ios/android)
- Build profile (development/ios-simulator/preview/production)
- Build location (local/eas)

Local builds output to `builds/` directory with naming: `{profile}-{app-slug}.{extension}`

## Project Architecture

### Tech Stack
- **Framework**: React Native + Expo SDK 54 (with New Architecture enabled)
- **Router**: Expo Router v6 (file-based routing in `src/app/`)
- **Styling**: NativeWind v4 (TailwindCSS for React Native)
- **Backend**: Supabase (authentication + database)
- **Storage**:
  - MMKV for general app data (via `src/lib/storage.ts`)
  - Encrypted MMKV with Expo SecureStore for sensitive auth tokens (via `src/lib/secure-storage.ts`)
- **i18n**: i18next + react-i18next (English and Slovenian)
- **State Management**: React Context API
- **Charts**: Victory Native
- **UI Components**: React Native Reusables (shadcn/ui-inspired components)

### Routing Structure

The app uses Expo Router with file-based routing:

```
src/app/
├── _layout.tsx              # Root layout with providers (Theme, Auth, Navigation)
├── index.tsx                # Redirects to /app
├── auth/
│   ├── _layout.tsx          # Auth stack layout
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   └── confirm-email.tsx
└── app/
    ├── _layout.tsx          # Main app layout (for authenticated users)
    └── index.tsx            # Main app screen
```

### Provider Hierarchy

All providers are set up in `src/app/_layout.tsx`:
1. `ThemeProvider` (from `src/lib/theme-context.tsx`) - Manages theme mode (light/dark/system) with MMKV persistence
2. `SafeAreaProvider` - Safe area handling
3. `NavThemeProvider` - React Navigation theming
4. `AuthProvider` (from `src/lib/providers/auth-provider.tsx`) - Manages Supabase authentication session
5. `PortalHost` - For modals and overlays (from @rn-primitives/portal)

### Theme System

The app uses a dual-theme system:
- **CSS Variables**: Defined in `src/global.css` with light and dark variants
- **Tailwind Integration**: Variables mapped in `tailwind.config.js` to enable className-based theming
- **Dark Mode Strategy**: `class` based (applied via `className="dark"` on root View)
- **Theme Colors**: Custom color scheme with primary (gold #f0b100), secondary (purple #4f39f6), and semantic colors

To use theme colors: `className="bg-background text-foreground"` or `className="bg-primary text-primary-foreground"`

### Storage Patterns

Two storage systems are used:

**General App Data (MMKV)**:
```typescript
import { getFromLocalStorage, setInLocalStorage, STORAGE_KEYS } from '@/lib/storage';

// Available keys: STORAGE_KEYS.LANGUAGE, STORAGE_KEYS.THEME
setInLocalStorage(STORAGE_KEYS.THEME, 'dark');
const theme = getFromLocalStorage<string>(STORAGE_KEYS.THEME);
```

**Secure Data (Encrypted MMKV)**:
```typescript
import { secureStorage } from '@/lib/secure-storage';

// Encryption key is automatically generated and stored in Expo SecureStore
secureStorage.set('key', 'sensitive_value');
const value = secureStorage.getString('key');
```

### Authentication Flow

Supabase authentication is configured in `src/lib/supabase.ts` with:
- Auto token refresh when app is in foreground
- Session persistence via AsyncStorage (native) or browser storage (web)
- Auth state managed via `AuthProvider` context

Access current session:
```typescript
const { session, signOut } = useAuthContext();
```

### Internationalization

i18next is configured in `src/lib/i18n.ts`:
- Supported languages: English (en), Slovenian (sl)
- Translation files: `src/locales/en.json`, `src/locales/sl.json`
- Auto-detects device language on first launch
- Persists language preference to MMKV

To change language:
```typescript
import { changeLanguage } from '@/lib/i18n';
await changeLanguage('sl');
```

### UI Components

Components are located in `src/components/ui/` and follow React Native Reusables patterns:
- Built with @rn-primitives base primitives
- Styled with NativeWind (Tailwind classes)
- Accessible and cross-platform (iOS, Android, Web)
- Accept `className` prop for custom styling

**Adding New Components**:
```bash
npx @react-native-reusables/cli@latest add [component-name]
```

See [React Native Reusables docs](https://rnr-docs.vercel.app) for available components.

### Charts

Victory Native is used for data visualization. Custom chart components in `src/components/ui/chart.tsx` provide wrappers for common chart types (Line, Bar, Area).

## Environment Variables

Create a `.env` file based on `.env.example`:
```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

All Expo public env vars must be prefixed with `EXPO_PUBLIC_`.

## TypeScript Configuration

- Path alias: `@/*` maps to `src/*`
- Strict mode enabled
- Typed routes enabled (via Expo Router experiments)

## Important Notes

- The project uses React 19 and React Native 0.81.5 with the New Architecture enabled
- Metro bundler is configured with NativeWind integration pointing to `src/global.css`
- When modifying theme colors, update both light and dark variants in `src/global.css`
- Platform-specific code can use `.web.ts`, `.ios.ts`, `.android.ts` extensions
- Always test theme changes in both light and dark modes
