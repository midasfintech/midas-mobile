import { useColorScheme } from "@/hooks/use-color-scheme";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { View, type ViewProps, StyleSheet } from "react-native";
import { CartesianChart, Line, Bar, Area } from "victory-native";
import {
  Canvas,
  Circle,
  Group,
  Path,
  Skia,
  Text as SkiaText,
  matchFont,
} from "@shopify/react-native-skia";
import { useSharedValue } from "react-native-reanimated";
import { Platform } from "react-native";

// Types
export interface ChartDataPoint {
  x: string | number;
  y: number;
}

export interface PieChartDataPoint {
  value: number;
  label: string;
  color?: string;
}

export interface ChartContainerProps extends ViewProps {
  children: React.ReactNode;
}

export interface ChartProps {
  data: ChartDataPoint[];
  color?: string;
  height?: number;
  showGrid?: boolean;
  animated?: boolean;
  onPointPress?: (point: ChartDataPoint) => void;
}

// Theme colors mapping
const useChartTheme = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    primary: "#f0b100",
    secondary: "#4f39f6",
    muted: isDark ? "#24273c" : "#f5f5f5",
    mutedForeground: isDark ? "#c7cce8" : "#737373",
    border: isDark ? "#33353e" : "#e5e5e5",
    background: isDark ? "#101117" : "#ffffff",
    foreground: isDark ? "#cacddc" : "#0a0a0a",
    grid: isDark ? "rgba(99, 107, 174, 0.1)" : "rgba(0, 0, 0, 0.05)",
  };
};

// Chart Container Component
export function ChartContainer({
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <View className={className} {...props}>
      {children}
    </View>
  );
}

// Tooltip Component
interface TooltipProps {
  x: number;
  y: number;
  color: string;
}

function ChartTooltip({ x, y, color }: TooltipProps) {
  return <Circle cx={x} cy={y} r={6} color={color} opacity={0.8} />;
}

// Line Chart Component
export function ChartLine({
  data,
  color,
  height = 250,
  showGrid = true,
  animated = true,
  onPointPress,
}: ChartProps) {
  const theme = useChartTheme();
  const chartColor = color || theme.primary;
  const { state, isActive } = useChartPressState();
  const [activePoint] = useState<ChartDataPoint | null>(null);

  // Validate data
  if (!data || data.length === 0) {
    return (
      <View style={{ height, justifyContent: "center", alignItems: "center" }}>
        <Text className="text-muted-foreground">No data available</Text>
      </View>
    );
  }

  const formattedData = data.map((point, index) => ({
    x: typeof point.x === "number" ? point.x : index,
    y: point.y,
    label: point.x.toString(),
  }));

  return (
    <View style={{ height }}>
      <CartesianChart
        data={formattedData}
        xKey="x"
        padding={0}
        yKeys={["y"]}
        axisOptions={{
          font: undefined,
          tickCount: 5,
          labelColor: theme.mutedForeground,
          lineColor: showGrid ? theme.grid : "transparent",
          formatXLabel: (value) => {
            const point = data[Math.floor(value)];
            return point ? point.x.toString() : "";
          },
        }}
      >
        {({ points, chartBounds }) => (
          <>
            <Line
              points={points.y}
              color={chartColor}
              strokeWidth={3}
              animate={{ type: "timing", duration: animated ? 800 : 0 }}
              curveType="natural"
            />
            {isActive && (
              <ChartTooltip
                x={state.x.position.value}
                y={state.y.y.position.value}
                color={chartColor}
              />
            )}
          </>
        )}
      </CartesianChart>
      {activePoint && (
        <View style={styles.tooltipContainer}>
          <Text className="text-sm text-foreground font-semibold">
            {activePoint.x}: {activePoint.y}
          </Text>
        </View>
      )}
    </View>
  );
}

// Bar Chart Component
export function ChartBar({
  data,
  color,
  height = 250,
  showGrid = true,
  animated = true,
  onPointPress,
}: ChartProps) {
  const theme = useChartTheme();
  const chartColor = color || theme.primary;

  // Validate data
  if (!data || data.length === 0) {
    return (
      <View style={{ height, justifyContent: "center", alignItems: "center" }}>
        <Text className="text-muted-foreground">No data available</Text>
      </View>
    );
  }

  const formattedData = data.map((point, index) => ({
    x: typeof point.x === "number" ? point.x : index,
    y: point.y,
    label: point.x.toString(),
  }));

  return (
    <View style={{ height }}>
      <CartesianChart
        data={formattedData}
        xKey="x"
        yKeys={["y"]}
        axisOptions={{
          font: undefined,
          tickCount: 5,
          labelColor: theme.mutedForeground,
          lineColor: showGrid ? theme.grid : "transparent",
          formatXLabel: (value) => {
            const point = data[Math.floor(value)];
            return point ? point.x.toString() : "";
          },
        }}
      >
        {({ points, chartBounds }) => (
          <>
            <Bar
              points={points.y}
              chartBounds={chartBounds}
              color={chartColor}
              roundedCorners={{ topLeft: 4, topRight: 4 }}
              animate={{ type: "timing", duration: animated ? 800 : 0 }}
            />
          </>
        )}
      </CartesianChart>
    </View>
  );
}

// Area Chart Component
export function ChartArea({
  data,
  color,
  height = 250,
  showGrid = true,
  animated = true,
  onPointPress,
}: ChartProps) {
  const theme = useChartTheme();
  const chartColor = color || theme.primary;
  const { state, isActive } = useChartPressState();

  // Validate data
  if (!data || data.length === 0) {
    return (
      <View style={{ height, justifyContent: "center", alignItems: "center" }}>
        <Text className="text-muted-foreground">No data available</Text>
      </View>
    );
  }

  const formattedData = data.map((point, index) => ({
    x: typeof point.x === "number" ? point.x : index,
    y: point.y,
    label: point.x.toString(),
  }));

  return (
    <View style={{ height }}>
      <CartesianChart
        data={formattedData}
        xKey="x"
        yKeys={["y"]}
        axisOptions={{
          font: undefined,
          tickCount: 5,
          labelColor: theme.mutedForeground,
          lineColor: showGrid ? theme.grid : "transparent",
          formatXLabel: (value) => {
            const point = data[Math.floor(value)];
            return point ? point.x.toString() : "";
          },
        }}
      >
        {({ points, chartBounds }) => (
          <>
            <Area
              points={points.y}
              y0={chartBounds.bottom}
              color={chartColor}
              opacity={0.2}
              animate={{ type: "timing", duration: animated ? 800 : 0 }}
              curveType="natural"
            />
            <Line
              points={points.y}
              color={chartColor}
              strokeWidth={3}
              animate={{ type: "timing", duration: animated ? 800 : 0 }}
              curveType="natural"
            />
            {isActive && (
              <ChartTooltip
                x={state.x.position.value}
                y={state.y.y.position.value}
                color={chartColor}
              />
            )}
          </>
        )}
      </CartesianChart>
    </View>
  );
}

// Helper hook for chart press state
function useChartPressState() {
  const [isActive] = useState(false);
  const state = {
    x: { position: useSharedValue(0), value: useSharedValue(0) },
    y: { y: { position: useSharedValue(0), value: useSharedValue(0) } },
  };

  return { state, isActive };
}

// Pie Chart Component
export interface PieChartProps {
  data: PieChartDataPoint[];
  size?: number;
  innerRadius?: number;
  showLegend?: boolean;
  showLabels?: boolean;
}

export function ChartPie({
  data,
  size = 250,
  innerRadius = 0,
  showLegend = true,
  showLabels = false,
}: PieChartProps) {
  const theme = useChartTheme();

  // Default colors if not provided
  const defaultColors = [
    theme.primary,
    theme.secondary,
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
  ];

  // Validate data
  if (!data || data.length === 0) {
    return (
      <View
        style={{ height: size, justifyContent: "center", alignItems: "center" }}
      >
        <Text className="text-muted-foreground">No data available</Text>
      </View>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2;
  const center = { x: radius, y: radius };

  // Calculate angles and create paths for each slice
  let currentAngle = -Math.PI / 2; // Start from top
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const color = item.color || defaultColors[index % defaultColors.length];

    // Create path for this specific slice
    const path = Skia.Path.Make();
    const outerRadius = radius * 0.9;

    if (innerRadius > 0) {
      // Donut slice
      const x1 = center.x + Math.cos(startAngle) * innerRadius;
      const y1 = center.y + Math.sin(startAngle) * innerRadius;
      const x2 = center.x + Math.cos(startAngle) * outerRadius;
      const y2 = center.y + Math.sin(startAngle) * outerRadius;
      const x3 = center.x + Math.cos(endAngle) * outerRadius;
      const y3 = center.y + Math.sin(endAngle) * outerRadius;
      const x4 = center.x + Math.cos(endAngle) * innerRadius;
      const y4 = center.y + Math.sin(endAngle) * innerRadius;

      path.moveTo(x1, y1);
      path.lineTo(x2, y2);
      path.arcToRotated(
        outerRadius,
        outerRadius,
        0,
        angle > Math.PI ? true : false,
        true,
        x3,
        y3,
      );
      path.lineTo(x4, y4);
      path.arcToRotated(
        innerRadius,
        innerRadius,
        0,
        angle > Math.PI ? true : false,
        false,
        x1,
        y1,
      );
    } else {
      // Regular pie slice
      const x1 = center.x + Math.cos(startAngle) * outerRadius;
      const y1 = center.y + Math.sin(startAngle) * outerRadius;
      const x2 = center.x + Math.cos(endAngle) * outerRadius;
      const y2 = center.y + Math.sin(endAngle) * outerRadius;

      path.moveTo(center.x, center.y);
      path.lineTo(x1, y1);
      path.arcToRotated(
        outerRadius,
        outerRadius,
        0,
        angle > Math.PI ? true : false,
        true,
        x2,
        y2,
      );
      path.lineTo(center.x, center.y);
    }

    path.close();

    // Calculate label position
    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = innerRadius > 0
      ? (outerRadius + innerRadius) / 2
      : outerRadius * 0.65;
    const labelX = center.x + Math.cos(midAngle) * labelRadius;
    const labelY = center.y + Math.sin(midAngle) * labelRadius;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
      color,
      path,
      labelX,
      labelY,
    };
  });

  // Create font for labels
  const fontSize = 14;
  const fontFamily = Platform.select({
    ios: "Helvetica",
    default: "sans-serif",
  });
  const fontStyle = {
    fontFamily,
    fontSize,
    fontWeight: "bold" as const,
  };
  const font = matchFont(fontStyle);

  return (
    <View>
      <Canvas style={{ width: size, height: size }}>
        {slices.map((slice, index) => (
          <Group key={`slice-${index}`}>
            <Path
              path={slice.path}
              color={slice.color}
              style="fill"
            />
            {showLabels && (
              <SkiaText
                x={slice.labelX - (slice.label.length * fontSize) / 4}
                y={slice.labelY + fontSize / 3}
                text={slice.label}
                font={font}
                color="white"
              />
            )}
          </Group>
        ))}
      </Canvas>

      {showLegend && (
        <View className="mt-4 gap-2">
          {slices.map((slice, index) => (
            <View key={index} className="flex-row items-center gap-3">
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  backgroundColor: slice.color,
                }}
              />
              <Text className="text-sm text-foreground flex-1">
                {slice.label}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {slice.percentage.toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tooltipContainer: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
