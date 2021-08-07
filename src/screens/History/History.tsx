import React from "react";

import { useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";

import style from "./History.style";
import List from "../../components/List";
import ParkingCard from "../../components/ParkingCard";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import { parkingsInactiveSortedSelector } from "../../store/selectors";

const History = () => {
  const parkings = useSelector(parkingsInactiveSortedSelector);
  const hasParkings = () => parkings.length > 0;

  return (
    <BaseLayout level={"2"}>
      <List spacer middle={!hasParkings()}>
        {hasParkings() ? (
          parkings.map((parking, index) => (
            <ParkingCard
              parking={parking}
              key={`recent-parking-card-${index}`}
            />
          ))
        ) : (
          <Text style={style.textCenter} appearance="hint">
            No inactive parkings here. You can create one on the Recent screen
          </Text>
        )}
      </List>
    </BaseLayout>
  );
};

export default History;
