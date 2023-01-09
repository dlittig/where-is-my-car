import React, { FC } from "react";
import { BaseCardComponentType } from "./types";

import Content from "./Content";
import { Card } from "react-native-paper";

const BaseCard: FC<BaseCardComponentType> & { Content: typeof Content } = ({
  children,
  appearance,
  footer,
  touchableOpacityProps,
}) => (
  <Card mode={appearance} {...touchableOpacityProps}>
    <Card.Content>
      {children}
      {footer}
    </Card.Content>
  </Card>
);

BaseCard.Content = Content;

export default BaseCard;
