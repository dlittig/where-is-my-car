import React from "react";
import { Button, Icon, Layout } from "@ui-kitten/components";
import { View } from "react-native";

import style from "./MainAction.style";

const AddIcon = (props: any) => <Icon {...props} name="plus-outline" />;

const MainAction = () => (
  <Layout level="1" style={style.container}>
    <Button accessoryLeft={AddIcon}>CREATE NEW</Button>
  </Layout>
);

export default MainAction;
