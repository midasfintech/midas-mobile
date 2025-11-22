# Midas Finance

Mobile app built during the AdaHack hackathon.

## 📁 Project Structure

```
midas/
├── src/
│   ├── app/                      # Expo Router pages
│   │   ├── _layout.tsx          # Root layout with providers
│   │   └── showcase/
│   │       └── index.tsx        # Component showcase
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx        # Chart components (Line, Bar, Area)
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── icon.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── text.tsx
│   │   │   └── toggle.tsx
│   │   ├── language-switcher.tsx
│   │   ├── screen-container.tsx
│   │   └── theme-switcher.tsx
│   ├── hooks/
│   │   └── use-color-scheme.ts  # Theme hook
│   ├── lib/
│   │   ├── i18n.ts              # i18next configuration
│   │   ├── icons/               # Icon utilities
│   │   ├── storage.ts           # MMKV storage wrappers
│   │   ├── theme.ts             # Navigation theme configuration
│   │   └── theme-context.tsx    # Theme provider
│   ├── locales/                 # Translation files
│   │   ├── en.json
│   │   └── sl.json
│   └── global.css               # Global styles & theme variables
├── assets/                      # Images, fonts, icons
├── app.json                     # Expo configuration
├── metro.config.js              # Metro bundler config with NativeWind
├── tailwind.config.js           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Building Development Builds

This boilerplate includes a custom build script that provides an interactive CLI for creating development and production builds locally or via EAS.

```bash
# Run the interactive build script
npm run build
```

The script will prompt you to select:

1. **Platform**: Choose between iOS or Android
2. **Build Profile**: Select development (or ios-simulator if using simulator on mac)
3. **Build Location**: Choose local build or EAS (cloud build)

**Example: Local Development Build for iOS Simulator**
```bash
npm run build
# Selections: [ios, ios-simulator, local]
```

**Example: Local Development Build for Android**
```bash
npm run build
# Selections: [android, development, local]
```

#### Build Profiles

The project includes several pre-configured build profiles (see `eas.json`):

- **development**: Development build with debugging enabled
- **preview**: Internal testing build
- **production**: Production-ready build for app stores
- **ios-simulator**: iOS build optimized for simulator (local only)

#### Local vs EAS Builds

**Local Builds:**
- Faster iteration
- No internet required after initial setup
- Outputs to `builds/` directory
- Requires proper development environment setup (Xcode for iOS, Android Studio for Android)

**EAS Builds:**
- Build in the cloud
- No local development environment needed
- Accessible from EAS dashboard
- Supports building iOS apps on non-Mac machines

### Adding New Components with React Native Reusables

This boilerplate uses [React Native Reusables](https://rnr-docs.vercel.app), which provides a CLI to easily add more pre-built components. All components are:
- Built with shadcn/ui design principles
- Fully typed with TypeScript
- Customizable with Tailwind classes
- Accessible and following best practices
- Consistent with the existing UI components

Use the CLI to add more components:

```bash
npx @react-native-reusables/cli@latest add [component-name]
```

Visit the [React Native Reusables documentation](https://rnr-docs.vercel.app) for a complete list and examples.

## 🎯 Usage Examples

### Using Theme Colors

```tsx
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

function MyComponent() {
  return (
    <View className="bg-background p-4">
      <Text className="text-foreground text-lg">Hello World</Text>
      <Button variant="primary">
        <Text>Click Me</Text>
      </Button>
    </View>
  );
}
```

### Creating Charts

```tsx
import { ChartLine } from '@/components/ui/chart';

const data = [
  { x: 'Jan', y: 100 },
  { x: 'Feb', y: 150 },
  { x: 'Mar', y: 200 },
];

function MyChart() {
  return <ChartLine data={data} height={200} />;
}
```

### Adding Translations

1. Add keys to `src/locales/en.json` and `src/locales/sl.json`
2. Use in components:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t('myKey')}</Text>;
}
```

### Using Storage

```tsx
import { getFromLocalStorage, setInLocalStorage, STORAGE_KEYS } from '@/lib/storage';

// Save data
setInLocalStorage(STORAGE_KEYS.THEME, 'dark');

// Retrieve data
const theme = getFromLocalStorage<string>(STORAGE_KEYS.THEME);
```

## 🚢 Building for Production

This project uses the custom build script (`npm run build`) for creating production builds. The script provides an interactive CLI that guides you through the build process.

### iOS Production Build

**Option 1: Local Build** (Requires macOS with Xcode)
```bash
# Create production build
npm run build
# selections: [ios, production, local]
# Output: builds/production-midas.ipa

# Submit to App Store
eas submit --platform ios
# Choose local binary option and paste path from build output
```

**Option 2: EAS Build** (Cloud build, works on any OS)
```bash
npm run build
# Selections: [ios, production, eas]

# Submit to App Store (after build completes)
eas submit --platform ios
```

### Android

**Option 1: Local Build** (Requires Android Studio setup)
```bash
# Create production build
npm run build
# selections: [android, production, local]

# Submit to Play Store
eas submit --platform android
# Choose local binary option and paste path from build output
```

**Option 2: EAS Build** (Cloud build, works on any OS)
```bash
npm run build
# Selections: [android, production, eas]

# Submit to Play Store (after build completes)
eas submit --platform android
```

### Build Output Location

Local builds are saved to the `builds/` directory with the naming format:
- `builds/{profile}-{app-slug}.{extension}`
- Examples:
  - `builds/production-midas.ipa` (iOS production)
  - `builds/development-midas.apk` (Android development)
  - `builds/ios-simulator-midas.tar.gz` (iOS simulator)

## 📝 Configuration Files

### `app.json`
Main Expo configuration file. Configure app name, bundle identifiers, icons, splash screens, and plugins here.

### `metro.config.js`
Metro bundler configuration with NativeWind integration. The `input` path points to `src/global.css`.

### `tailwind.config.js`
Tailwind CSS configuration with:
- Dark mode: 'class' strategy
- Custom color scheme from CSS variables
- Border radius utilities
- Content paths for all source files

### `tsconfig.json`
TypeScript configuration with path aliases (@/*) and strict type checking.

## 🔧 Common Tasks

### Adding a New Screen

1. Create file in `src/app/` (e.g., `src/app/profile.tsx`)
2. Export a component
3. Navigate using `<Link href="/profile">` or `router.push('/profile')`

### Adding a New Storage Key

```typescript
// In src/lib/storage.ts
export const STORAGE_KEYS = {
  LANGUAGE: "app_language",
  THEME: "app_theme",
  YOUR_KEY: "your_key", // Add here
}
```

### Customizing Components

All UI components accept a `className` prop for custom styling:

```tsx
<Button className="bg-red-500 px-8">
  <Text>Custom Button</Text>
</Button>
```
