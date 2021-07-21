import React from "react";
import {
  TopNavigation as UIKTopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import Icons from "../../../Icons";

const SettingsAction = () => <TopNavigationAction icon={Icons.Settings} />;

const TopBar = () => (
  <UIKTopNavigation
    alignment="center"
    accessoryRight={SettingsAction}
    title="Yo, where is my car?"
  />
);

export default TopBar;
