import React, { FC } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

import { ContentComponentType } from "./types";

const Content: FC<ContentComponentType> = ({
  dividerTop,
  dividerBottom,
  children,
}) => (
  <View>
    {dividerTop && <Divider />}
    {children}
    {dividerBottom && <Divider />}
  </View>
);

export default Content;
