import { Divider } from "@ui-kitten/components";
import React, { FC } from "react";
import { View } from "react-native";

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
