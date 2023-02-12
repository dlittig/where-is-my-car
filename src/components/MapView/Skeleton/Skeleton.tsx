import React, { FC } from "react";
import { View } from "react-native";
import { ProgressBar } from "react-native-paper";

import style from "./Skeleton.style";
import { SkeletonComponentType } from "./types";

const Skeleton: FC<SkeletonComponentType> = ({ children, isLoading }) => (
  <>
    {isLoading ? (
      <>
        <View style={style.container} />
        <ProgressBar style={style.progressbar} indeterminate />
      </>
    ) : (
      <>{children}</>
    )}
  </>
);

export default Skeleton;
