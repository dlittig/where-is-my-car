import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { BackBarComponentType } from "./types";

const BackBar: FC<BackBarComponentType> = ({ title, accessoryRight }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction
        onPress={() => navigation.canGoBack() && navigation.goBack()}
      />
      <Appbar.Content title={title} />
      {accessoryRight}
    </Appbar.Header>
  );
};

export default BackBar;
