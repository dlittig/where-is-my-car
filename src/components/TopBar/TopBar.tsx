import React from "react";
import {
  Icon,
  Text,
  TopNavigation as UIKTopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const BackAction = () => <TopNavigationAction icon={BackIcon} />;

const TopNavigation = () => (
  <UIKTopNavigation
    accessoryLeft={BackAction}
    title="Eva Application"
  />
);

export default TopNavigation;
