import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import BaseLayout from "../BaseLayout";

import style from "./List.style";

const List: FC<ListComponentType> = ({ children, spacer, middle }) => (
  <BaseLayout level="2">
    <ScrollView
      style={style.container}
      contentContainerStyle={middle === true ? style.middle : null}
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
