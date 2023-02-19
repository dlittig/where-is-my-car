import React, { FC } from "react";
import { View } from "react-native";

import BaseLayoutStyle from "./BaseLayout.style";
import { BaseLayoutComponentType } from "./types";

const BaseLayout: FC<BaseLayoutComponentType> = ({
  children,
  center,
  padded,
  style,
}) => (
  <View
    style={[
      BaseLayoutStyle.container,
      style,
      center && BaseLayoutStyle.center,
      padded && BaseLayoutStyle.padded,
    ]}
  >
    {children}
  </View>
);

export default BaseLayout;
