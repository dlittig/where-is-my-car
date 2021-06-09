import React from "react";
import {
  Icon,
  Text,
  TopNavigation as UIKTopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

const SettingsIcon = (props: any) => (
  <Icon {...props} name="settings-outline" />
);

const SettingsAction = () => <TopNavigationAction icon={SettingsIcon} />;

const TopNavigation = () => (
  <UIKTopNavigation accessoryRight={SettingsAction} title="Yo, where is my car?" />
);

export default TopNavigation;
