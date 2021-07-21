import React from "react";
import { Icon } from "@ui-kitten/components";

const Icons = {
  Add: (props: any) => <Icon {...props} name="plus-outline" />,
  Back: (props: any) => <Icon {...props} name="arrow-back-outline" />,
  Clock: (props: any) => <Icon {...props} name="clock-outline" />,
  CreditCard: (props: any) => <Icon {...props} name="credit-card-outline" />,
  Edit: (props: any) => <Icon {...props} name="edit-2-outline" />,
  Localize: (props: any) => <Icon {...props} name="pin-outline" />,
  Navigation: (props: any) => <Icon {...props} name="navigation-outline" />,
  Save: (props: any) => <Icon {...props} name="checkmark-outline" />,
  Settings: (props: any) => <Icon {...props} name="settings-outline" />,
  Stop: (props: any) => <Icon {...props} name="slash-outline" />,
};

export default Icons;
