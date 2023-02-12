import React, { FC } from "react";
import { View } from "react-native";

import BaseLayoutStyle from "./BaseLayout.style";
import { BaseLayoutComponentType } from "./types";

const BaseLayout: FC<BaseLayoutComponentType> = ({
  children,
  center,
  padded,
}) => (
  <View
    style={[
      BaseLayoutStyle.container,
      center && BaseLayoutStyle.center,
      padded && BaseLayoutStyle.padded,
    ]}
  >
    {children}
  </View>
);

export default BaseLayout;
