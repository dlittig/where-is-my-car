import React, { FC } from "react";
import { Surface } from "react-native-paper";

import style from "./MainAction.style";
import { MainActionComponentType } from "./types";

const MainAction: FC<MainActionComponentType> = ({ children, border }) => (
  <Surface style={[style.container, border && style.border]} elevation={2}>
    {children}
  </Surface>
);

export default MainAction;
