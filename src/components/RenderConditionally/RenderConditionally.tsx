import React, { FC } from "react";
import { useSelector } from "react-redux";
import { settingsSelector } from "../../store/selectors";
import { RenderConditionallyComponentType } from "./types";

const RenderConditionally: FC<RenderConditionallyComponentType> = ({
  truthy,
  falsy,
}) => {
  const settingsReducer = useSelector(settingsSelector);
  return <>{settingsReducer.introSeen ? truthy : falsy}</>;
};

export default RenderConditionally;
