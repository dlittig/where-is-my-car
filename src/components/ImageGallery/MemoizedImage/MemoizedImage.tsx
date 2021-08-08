import React, { FC } from "react";

import { Image, TouchableOpacity } from "react-native";

import { MemoizedImageType } from "../types";

const MemoizedImage: FC<MemoizedImageType> = React.memo(
  ({ photo, onPress, onLongPress }) => (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        width: "47%",
        height: 200,
        marginBottom: 20,
      }}
    >
      <Image
        source={{ uri: photo }}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          borderRadius: 5,
        }}
      />
    </TouchableOpacity>
  )
);

export default MemoizedImage;
