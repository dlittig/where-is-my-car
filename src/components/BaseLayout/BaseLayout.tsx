import React, { FC } from "react";
import { Layout } from "@ui-kitten/components";
import { BaseLayoutComponentType } from "./types";

import BaseLayoutStyle from "./BaseLayout.style";

const BaseLayout: FC<BaseLayoutComponentType> = ({ level, children }) => (
  <Layout style={BaseLayoutStyle.container} level={level}>
    {children}
  </Layout>
);

export default BaseLayout;
