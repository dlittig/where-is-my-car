import React from "react";

import { useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";

import List from "../../components/List";
import { ParkingsState } from "../../store/types";
import { RootReducerType } from "../../store/reducers";
import ParkingCard from "../../components/ParkingCard";
import { parkingsSelector } from "../../store/selectors";
import BaseLayout from "../../components/BaseLayout/BaseLayout";

const History = () => {
  const parkingsReducer = useSelector<RootReducerType, ParkingsState>(
    parkingsSelector
  );
  const parkings = Object.values(parkingsReducer.parkings).filter(
    (parking) => !parking.isActive
  );
  const hasParkings = () => parkings.length > 0;

  return (
    <BaseLayout level={"2"}>
      <List spacer>
        {hasParkings() ? (
          parkings.map((parking, index) => (
            <ParkingCard
              parking={parking}
              key={`recent-parking-card-${index}`}
            />
          ))
        ) : (
          <Text>No parking saved. You can create one on the Recent screen</Text>
        )}
      </List>
    </BaseLayout>
  );
};

export default History;
