import React, { FC } from "react";
import { Card, Divider } from "react-native-paper";

import Content from "./Content";
import { BaseCardComponentType } from "./types";

const BaseCard: FC<BaseCardComponentType> & { Content: typeof Content } = ({
  children,
  appearance,
  footer,
  touchableOpacityProps,
  cardStyle,
  contentStyle,
}) => (
  <Card mode={appearance} style={cardStyle} {...touchableOpacityProps}>
    <Card.Content style={contentStyle}>{children}</Card.Content>
    <Divider />
    {footer}
  </Card>
);

BaseCard.Content = Content;

export default BaseCard;
