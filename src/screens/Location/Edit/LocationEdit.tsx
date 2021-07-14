import React, { FC } from "react";
import { Text } from "@ui-kitten/components";
import BaseLayout from "../../../components/BaseLayout";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";
import { LocationEditScreenType } from "./types";

const LocationEdit: FC<LocationEditScreenType> = ({ route }) => (
  <>
    <BackBar title={route.name} />
    <BaseLayout level="2">
      <Text>Location Edit</Text>
    </BaseLayout>
  </>
);

export default LocationEdit;
