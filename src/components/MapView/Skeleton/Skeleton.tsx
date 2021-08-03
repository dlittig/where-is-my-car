import React, { FC } from "react";
import SkeletonContent from "react-native-skeleton-content";
import { SkeletonComponentType } from "./types";

const Skeleton: FC<SkeletonComponentType> = ({ children, isLoading }) => (
  <SkeletonContent
    containerStyle={{ flex: 1, width: 300 }}
    isLoading={isLoading}
    highlightColor="#101426"
    boneColor="#2E3A59"
    layout={[{ key: `skeleton-bar-1`, width: "120%", height: 290 }]}
  >
    {children}
  </SkeletonContent>
);

export default Skeleton;
