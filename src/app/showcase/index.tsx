import { LanguageSwitcher } from "@/components/language-switcher";
import { ScreenContainer } from "@/components/screen-container";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartArea,
  ChartBar,
  ChartContainer,
  ChartLine,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();
  const [switchValue, setSwitchValue] = useState(false);
  const [togglePressed, setTogglePressed] = useState(false);
  const [outlineTogglePressed, setOutlineTogglePressed] = useState(false);

  // Sample data for charts
  const revenueData = [
    { x: "Jan", y: 4500 },
    { x: "Feb", y: 5200 },
    { x: "Mar", y: 4800 },
    { x: "Apr", y: 6100 },
    { x: "May", y: 7200 },
    { x: "Jun", y: 6800 },
  ];

  const userGrowthData = [
    { x: "Jan", y: 120 },
    { x: "Feb", y: 180 },
    { x: "Mar", y: 250 },
    { x: "Apr", y: 320 },
    { x: "May", y: 410 },
    { x: "Jun", y: 520 },
  ];

  const salesData = [
    { x: "Mon", y: 45 },
    { x: "Tue", y: 62 },
    { x: "Wed", y: 58 },
    { x: "Thu", y: 71 },
    { x: "Fri", y: 89 },
    { x: "Sat", y: 95 },
    { x: "Sun", y: 52 },
  ];

  return (
    <ScreenContainer>
      <ScrollView className="flex-1 bg-background">
        <View className="flex-1 p-6 gap-6">
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              {t("home.title")}
            </Text>
            <Text className="text-base text-muted-foreground">
              {t("home.description")}
            </Text>
          </View>

          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              {t("home.changeLanguage")}
            </Text>
            <LanguageSwitcher />
          </View>

          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              {t("home.changeTheme")}
            </Text>
            <ThemeSwitcher />
          </View>

          <Separator />

          {/* Buttons Section */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">Buttons</Text>
            <View className="flex-row flex-wrap gap-3">
              <Button>
                <Text>Default</Text>
              </Button>
              <Button variant="secondary">
                <Text>Secondary</Text>
              </Button>
              <Button variant="destructive">
                <Text>Destructive</Text>
              </Button>
              <Button variant="outline">
                <Text>Outline</Text>
              </Button>
              <Button variant="ghost">
                <Text>Ghost</Text>
              </Button>
              <Button variant="link">
                <Text>Link</Text>
              </Button>
            </View>
            <View className="flex-row flex-wrap gap-3">
              <Button size="sm">
                <Text>Small</Text>
              </Button>
              <Button size="default">
                <Text>Default</Text>
              </Button>
              <Button size="lg">
                <Text>Large</Text>
              </Button>
            </View>
          </View>

          <Separator />

          {/* Badges Section */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">Badges</Text>
            <View className="flex-row flex-wrap gap-3">
              <Badge>
                <Text>Default</Text>
              </Badge>
              <Badge variant="secondary">
                <Text>Secondary</Text>
              </Badge>
              <Badge variant="destructive">
                <Text>Destructive</Text>
              </Badge>
              <Badge variant="outline">
                <Text>Outline</Text>
              </Badge>
            </View>
          </View>

          <Separator />

          {/* Card Section */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">Cards</Text>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  This is a description of the card component
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Card content goes here with more details.</Text>
              </CardContent>
              <CardFooter className="flex-row gap-2">
                <Button variant="outline" size="sm">
                  <Text>Cancel</Text>
                </Button>
                <Button size="sm">
                  <Text>Confirm</Text>
                </Button>
              </CardFooter>
            </Card>
          </View>

          <Separator />

          {/* Switch Section */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">Switch</Text>
            <View className="flex-row items-center gap-4">
              <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
              <Text>Switch is {switchValue ? "ON" : "OFF"}</Text>
            </View>
          </View>

          <Separator />

          {/* Toggle Section */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">Toggle</Text>
            <View className="flex-row gap-3">
              <Toggle
                pressed={togglePressed}
                onPressedChange={setTogglePressed}
              >
                <Text>Toggle Me</Text>
              </Toggle>
              <Toggle
                variant="outline"
                pressed={outlineTogglePressed}
                onPressedChange={setOutlineTogglePressed}
              >
                <Text>Outline</Text>
              </Toggle>
            </View>
          </View>

          <Separator />

          {/* Dropdown Menu Section */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">
              Dropdown Menu
            </Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Text>Open Menu</Text>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Text>Profile</Text>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Text>Settings</Text>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Text>Logout</Text>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </View>

          <Separator />

          {/* Alert Dialog Section */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">
              Alert Dialog
            </Text>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Text>Show Alert</Text>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    <Text>Cancel</Text>
                  </AlertDialogCancel>
                  <AlertDialogAction>
                    <Text>Continue</Text>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </View>

          <Separator />

          {/* Charts Section */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">Charts</Text>

            {/* Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>
                  Revenue trends over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ChartLine data={revenueData} height={200} />
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Area Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Total users acquired over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ChartArea data={userGrowthData} height={200} />
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Sales</CardTitle>
                <CardDescription>
                  Sales performance by day of the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer>
                  <ChartBar data={salesData} height={200} />
                </ChartContainer>
              </CardContent>
            </Card>
          </View>

          <View className="h-8" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
