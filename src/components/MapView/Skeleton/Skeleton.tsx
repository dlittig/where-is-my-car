import React, { FC } from "react";
import SkeletonContent from "react-native-skeleton-content";

const Skeleton: FC = ({ children }) => (
  <SkeletonContent
    containerStyle={{ flex: 1, width: 300 }}
    isLoading={false}
    layout={[
      { key: "someId", width: 220, height: 20, marginBottom: 6 },
      { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
    ]}
  >
    {children}
  </SkeletonContent>
);

export default Skeleton;
