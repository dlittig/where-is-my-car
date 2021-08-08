import React, { FC } from "react";
import { useSelector } from "react-redux";
import { settingsIntroSeenSelector } from "../../store/selectors";
import { RenderConditionallyComponentType } from "./types";

const RenderConditionally: FC<RenderConditionallyComponentType> = ({
  truthy,
  falsy,
}) => {
  const introSeen = useSelector(settingsIntroSeenSelector);
  return <>{introSeen ? truthy : falsy}</>;
};

export default RenderConditionally;
