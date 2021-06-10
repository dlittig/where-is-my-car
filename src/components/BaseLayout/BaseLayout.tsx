import React, { FC } from "react";
import { Layout } from "@ui-kitten/components";
import { BaseLayoutComponentType } from "./types";

import BaseLayoutStyle from "./BaseLayout.style";

const BaseLayout: FC<BaseLayoutComponentType> = ({
  level,
  children,
  center,
}) => (
  <Layout
    style={[BaseLayoutStyle.container, center && BaseLayoutStyle.center]}
    level={level}
  >
    {children}
  </Layout>
);

export default BaseLayout;
