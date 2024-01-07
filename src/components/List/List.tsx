import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import BaseLayout from "../BaseLayout";
import { ListComponentType } from "./types";

import style from "./List.style";

const List: FC<ListComponentType> = ({
  children,
  spacer,
  middle,
  padding,
}) => (
  <BaseLayout>
    <ScrollView
      style={[style.container, padding && style.padding]}
      contentContainerStyle={middle === true && style.middle}
    >
      {children}
      {spacer ? (
        <View style={style.spacer} />
      ) : (
        <View style={style.miniSpacer} />
      )}
    </ScrollView>
  </BaseLayout>
);

export default List;
