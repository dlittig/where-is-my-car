import React, { FC } from "react";
import { View } from "react-native";
import { NoInteractionComponentType } from "./types";

const NoInteraction: FC<NoInteractionComponentType> = ({
  children,
  condition,
  style,
}) => (
  <>
    {condition === true ? (
      <View style={style} pointerEvents="none">{children}</View>
    ) : (
      children
    )}
  </>
);

export default NoInteraction;
