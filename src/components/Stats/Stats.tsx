import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import style from "./Stats.style";
import { StatsComponentType } from "./types";

const Stats: FC<StatsComponentType> = ({ hint, value }) => (
  <View style={style.container}>
    <Text variant="bodyLarge">{value}</Text>
    <Text variant="labelLarge">{hint}</Text>
  </View>
);

export default Stats;
