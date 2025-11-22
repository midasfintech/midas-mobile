import { Text } from "@/components/ui/text";
import { CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Pressable, View } from "react-native";

export interface MultiSelectTileOption {
  value: string;
  label: string;
  description?: string;
}

export interface MultiSelectTileProps {
  options: MultiSelectTileOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  className?: string;
  tileClassName?: string;
  disabled?: boolean;
  singleSelect?: boolean;
}

export function MultiSelectTile({
  options,
  value,
  onValueChange,
  className,
  tileClassName,
  disabled = false,
  singleSelect = false,
}: MultiSelectTileProps) {
  const toggleOption = (optionValue: string) => {
    if (disabled) return;

    if (singleSelect) {
      // Single select mode: only one option can be selected
      const newValue = value.includes(optionValue) ? [] : [optionValue];
      onValueChange(newValue);
    } else {
      // Multi select mode: toggle the option
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onValueChange(newValue);
    }
  };

  return (
    <View className={cn("flex flex-col gap-3", className)}>
      {options.map((option) => {
        const isSelected = value.includes(option.value);

        return (
          <Pressable
            key={option.value}
            onPress={() => toggleOption(option.value)}
            disabled={disabled}
            className={cn(
              "relative flex flex-row items-center justify-between gap-2 rounded-lg border-2 p-4",
              isSelected
                ? "border-primary bg-primary"
                : "border-border bg-muted active:bg-muted/80",
              disabled && "opacity-50",
              tileClassName
            )}
          >
            {/* Option label */}
            <Text
              className={cn(
                "pr-8 font-semibold w-4/5",
                isSelected ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {option.label}
            </Text>

            {/* Selection indicator */}
            <View
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full",
                isSelected
                  ? "bg-background"
                  : "border-2 border-muted-foreground bg-transparent"
              )}
            >
              {isSelected && (
                <CheckIcon size={12} className="text-primary" />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

// Alternative compact version without descriptions
export interface CompactMultiSelectTileProps {
  options: Pick<MultiSelectTileOption, "value" | "label">[];
  value: string[];
  onValueChange: (value: string[]) => void;
  className?: string;
  disabled?: boolean;
  singleSelect?: boolean;
}

export function CompactMultiSelectTile({
  options,
  value,
  onValueChange,
  className,
  disabled = false,
  singleSelect = false,
}: CompactMultiSelectTileProps) {
  const toggleOption = (optionValue: string) => {
    if (disabled) return;

    if (singleSelect) {
      // Single select mode: only one option can be selected
      const newValue = value.includes(optionValue) ? [] : [optionValue];
      onValueChange(newValue);
    } else {
      // Multi select mode: toggle the option
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onValueChange(newValue);
    }
  };

  return (
    <View className={cn("flex flex-row flex-wrap gap-3", className)}>
      {options.map((option) => {
        const isSelected = value.includes(option.value);

        return (
          <Pressable
            key={option.value}
            onPress={() => toggleOption(option.value)}
            disabled={disabled}
            className={cn(
              "rounded-full border-2 px-6 py-2.5",
              isSelected
                ? "border-primary bg-primary"
                : "border-border bg-background active:bg-muted",
              disabled && "opacity-50"
            )}
          >
            <Text
              className={cn(
                "font-medium",
                isSelected ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}