import { ChildrenComponentType } from "../../utils/types";

export type BaseLayoutComponentType = {
  center?: boolean;
  padded?: boolean;
  style?: Record<string, any>;
} & ChildrenComponentType;
