import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { StatsComponentType } from "./types";

import style from "./Stats.style";

const Stats: FC<StatsComponentType> = ({ hint, value }) => (
  <View style={style.container}>
    <Text category="s2">{value}</Text>
    <Text appearance="hint" category="c2">
      {hint}
    </Text>
  </View>
);

export default Stats;
