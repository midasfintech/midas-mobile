import { useColorScheme } from "@/hooks/use-color-scheme";
import { CalendarIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import * as React from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";

interface DatePickerInputProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  className?: string;
  disabled?: boolean;
}

function DatePickerInput({
  value,
  onChange,
  placeholder = "Select date",
  minimumDate,
  maximumDate,
  className,
  disabled = false,
}: DatePickerInputProps) {
  const [showPicker, setShowPicker] = React.useState(false);
  const { colorScheme } = useColorScheme();

  const formatDate = (date: Date | undefined) => {
    if (!date) return placeholder;
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePress = () => {
    if (disabled) return;

    if (Platform.OS === "android") {
      // Use imperative API for Android
      DateTimePickerAndroid.open({
        value: value || new Date(),
        mode: "date",
        is24Hour: true,
        minimumDate,
        maximumDate,
        onChange: (event, selectedDate) => {
          if (event.type === "set" && selectedDate) {
            onChange(selectedDate);
          } else if (event.type === "dismissed") {
            // User cancelled - do nothing
          }
        },
      });
    } else {
      // Show modal for iOS
      setShowPicker(true);
    }
  };

  const handleIOSChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleIOSConfirm = () => {
    setShowPicker(false);
  };

  const handleIOSCancel = () => {
    setShowPicker(false);
  };

  return (
    <>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        className={cn(
          "dark:bg-input/30 border-input bg-background flex h-10 w-full min-w-0 flex-row items-center justify-between rounded-md border px-3 py-1 shadow-sm shadow-black/5 sm:h-9",
          disabled && "opacity-50",
          className,
        )}
      >
        <Text
          className={cn(
            "text-foreground text-base leading-5 md:text-sm",
            !value && "text-muted-foreground",
          )}
        >
          {formatDate(value)}
        </Text>
        <CalendarIcon size={16} className="text-muted-foreground ml-2" />
      </Pressable>

      {Platform.OS === 'ios' && showPicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showPicker}
          onRequestClose={handleIOSCancel}
        >
          <Pressable
            className="flex-1 justify-end bg-black/50"
            onPress={handleIOSCancel}
          >
            <Pressable className="bg-background rounded-t-2xl pb-6">
              {/* Header */}
              <View className="border-border flex-row items-center justify-between border-b px-4 py-3">
                <Pressable onPress={handleIOSCancel}>
                  <Text className="text-primary text-base font-medium">
                    Cancel
                  </Text>
                </Pressable>
                <Text className="text-foreground text-base font-semibold">
                  Select Date
                </Text>
                <Pressable onPress={handleIOSConfirm}>
                  <Text className="text-primary text-base font-medium">Done</Text>
                </Pressable>
              </View>

              {/* Date Picker */}
              <View className="pt-2 flex items-center justify-center">
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleIOSChange}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  style={{ height: 200 }}
                />
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

export { DatePickerInput };
