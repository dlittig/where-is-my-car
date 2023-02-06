import React from "react";
import { Appbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { APP_SETTINGS } from "../../Routes";

const TopBar = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const onPress = () => navigation.navigate(t(APP_SETTINGS) as never);

  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Content title="Yo, where is my car?" />
      <Appbar.Action icon="cog" onPress={onPress} />
    </Appbar.Header>
  );
};

export default TopBar;
