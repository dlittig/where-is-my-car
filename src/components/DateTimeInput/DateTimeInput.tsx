import { FC, useCallback } from "react";
import { View } from "react-native";
import { TextInput, TouchableRipple } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { humanReadableDate, humanReadableTime } from "../../utils";
import { DateTimeInputComponentType, DATE_TIME_INPUT_MODE } from "./types";

const DateTimeInput: FC<DateTimeInputComponentType> = ({
  mode,
  onChange,
  label,
  value,
}) => {
  const update = (_: any, newValue?: Date) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  const openSelector = () => {
    DateTimePickerAndroid.open({
      value,
      onChange: update,
      mode,
      is24Hour: true,
    });
  };

  const getFormatter = useCallback(() => {
    if (mode === DATE_TIME_INPUT_MODE.date) {
      return humanReadableDate;
    } else if (mode === DATE_TIME_INPUT_MODE.time) {
      return humanReadableTime;
    }

    return (value: any) => ` ${value}`;
  }, [mode]);

  return (
    <View>
      <TouchableRipple onPress={openSelector}>
        <TextInput
          mode="outlined"
          editable={false}
          value={getFormatter()(value.getTime())}
          label={label}
          right={
            mode === "date" ? (
              <TextInput.Icon icon="calendar" />
            ) : (
              <TextInput.Icon icon="clock-outline" />
            )
          }
        />
      </TouchableRipple>
    </View>
  );
};

export default DateTimeInput;
