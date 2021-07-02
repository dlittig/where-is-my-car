import React from "react";
import { Text } from "@ui-kitten/components";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import MainAction from "../../components/MainAction";
import List from "../../components/List";
import MapView from "../../components/MapView";
import { MAP_VIEW_SIZE } from "../../components/MapView/types";
import ParkingCard from "../../components/ParkingCard";
import { Parking } from "../../store/reducers/parkingReducer";

const parking: Parking = {
  id: Date.now(),
  time: Date.now(),
  reminderTime: Date.now() + 3600,
  car: "Toyota Auris",
  latitude: 51.041546001417295,
  longitude: 7.0415530865179425,
  locationName: "Home",
  name: "Home",
  paid: 3.5,
  photos: [],
};

const Recent = () => (
  <BaseLayout level={"2"}>
    <List spacer>
      <ParkingCard parking={parking} />
    </List>
    <MainAction />
  </BaseLayout>
);

export default Recent;
