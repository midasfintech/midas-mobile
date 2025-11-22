import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenContainer({ children, edges }: { children: React.ReactNode; edges?: ("bottom" | "left" | "right")[] }) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={[...(edges ?? []), "top"]}>
      {children}
    </SafeAreaView>
  )
}