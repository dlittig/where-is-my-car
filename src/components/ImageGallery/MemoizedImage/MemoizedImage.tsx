import React, { FC } from "react";

import { Image, TouchableOpacity } from "react-native";

import { MemoizedImageType } from "../types";
import style from "./MemoizedImage.style";

const MemoizedImage: FC<MemoizedImageType> = React.memo(
  ({ photo, onPress, onLongPress }) => (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={style.overlay}
    >
      <Image source={{ uri: photo }} style={style.image} />
    </TouchableOpacity>
  )
);

export default MemoizedImage;
