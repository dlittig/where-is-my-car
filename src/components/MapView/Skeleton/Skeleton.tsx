import React, { FC } from "react";
import SkeletonContent from "react-native-skeleton-content";
import { SkeletonComponentType } from "./types";
import style from "./Skeleton.style";

const Skeleton: FC<SkeletonComponentType> = ({ children, isLoading }) => (
  <SkeletonContent
    containerStyle={style.container}
    isLoading={isLoading}
    highlightColor="#101426"
    boneColor="#2E3A59"
    layout={[{ key: `skeleton-bar-1`, width: "120%", height: 290 }]}
  >
    {children}
  </SkeletonContent>
);

export default Skeleton;
