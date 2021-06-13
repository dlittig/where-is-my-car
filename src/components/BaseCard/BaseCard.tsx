import React, { FC } from "react";
import { BaseCardComponentType } from "./types";

import Content from "./Content";
import { Card } from "@ui-kitten/components";

const BaseCard: FC<BaseCardComponentType> & { Content: typeof Content } = ({
  children,
  type,
}) => <Card status={type}>{children}</Card>;

BaseCard.Content = Content;

export default BaseCard;
