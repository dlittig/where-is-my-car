import { FC } from "react";

export enum CARD_TYPE {
  PRIMARY = "primary",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
  BASIC = "basic",
}

export type BaseCardComponentType = {
  type: CARD_TYPE;
  appearance?: "filled" | "outline";
  footer?: any;
  touchableOpacityProps: Record<string, any>;
};
