import { ChildrenComponentType } from "../../utils/types";

export type BaseCardComponentType = {
  appearance?: "elevated" | "outlined" | "contained";
  footer?: any;
  touchableOpacityProps?: Record<string, any>;
  cardStyle?: Record<any, any>;
  contentStyle?: Record<any, any>;
} & ChildrenComponentType;
