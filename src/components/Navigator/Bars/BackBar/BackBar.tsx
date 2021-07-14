import React from "react";
import {
  Icon,
  TopNavigation as UIKTopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";

const BackIcon = (props: any) => <Icon {...props} name="arrow-back-outline" />;

const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.canGoBack() && navigation.goBack()}
    />
  );
};

const BackBar: FC<{ title: string }> = ({ title }) => (
  <UIKTopNavigation accessoryLeft={BackAction} title={title} />
);

export default BackBar;
