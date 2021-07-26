import { ReactNode } from "react";

export type RenderConditionallyComponentType = {
  truthy: ReactNode;
  falsy: ReactNode;
};
