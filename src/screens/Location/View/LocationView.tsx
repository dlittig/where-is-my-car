import React, { FC } from "react";
import BaseLayout from "../../../components/BaseLayout";
import { LocationViewScreenType } from "./types";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";
import List from "../../../components/List";
import MapView from "../../../components/MapView";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { useSelector } from "react-redux";
import { parkingsSelector } from "../../../store/selectors";

const LocationView: FC<LocationViewScreenType> = ({ route }) => {
  const parkingsReducer = useSelector(parkingsSelector);
  const parkingId = route.params ? (route.params["id"] as string) : "";
  const parking = parkingsReducer.parkings[parkingId];

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2">
        <List spacer>
          <MapView
            size={MAP_VIEW_SIZE.NORMAL}
            latitude={parking.latitude}
            longitude={parking.longitude}
          />
        </List>
      </BaseLayout>
    </>
  );
};

export default LocationView;
