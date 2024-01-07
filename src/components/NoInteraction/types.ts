import { ChildrenComponentType } from "../../utils/types";

export type NoInteractionComponentType = {
  condition: boolean;
  style?: Record<string, any>;
} & ChildrenComponentType;
