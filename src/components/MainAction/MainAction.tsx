import React from "react";
import { Button, Icon, Layout } from "@ui-kitten/components";

import style from "./MainAction.style";

const AddIcon = (props: any) => <Icon {...props} name="plus-outline" />;

const onPress = () => {
  
};

const MainAction = () => (
  <Layout level="1" style={style.container}>
    <Button accessoryLeft={AddIcon} onPress={onPress}>
      CREATE NEW
    </Button>
  </Layout>
);

export default MainAction;
