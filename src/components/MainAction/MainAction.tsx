import React, { FC } from "react";
import { Layout } from "@ui-kitten/components";

import style from "./MainAction.style";


const MainAction: FC = ({ children }) => (
  <Layout level="1" style={style.container}>
    {children}
  </Layout>
);

export default MainAction;
