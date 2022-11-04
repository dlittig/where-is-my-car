import React, { FC } from "react";
import { View } from "react-native";
import { Spinner } from "@ui-kitten/components";

import style from "./Skeleton.style";
import { SkeletonComponentType } from "./types";

const Skeleton: FC<SkeletonComponentType> = ({ children, isLoading }) => (
  <>
    {isLoading ? (
      <View style={style.container}>
        <Spinner />
      </View>
    ) : (
      <>{children}</>
    )}
  </>
);

export default Skeleton;
