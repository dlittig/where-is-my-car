import React from "react";

import { useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import {
  parkingSearchFilterSelector,
  parkingsInactiveSortedSelector,
} from "../../store/selectors";
import style from "./History.style";
import List from "../../components/List";
import { Parking } from "../../store/types";
import Searchbar from "../../components/Searchbar";
import ParkingCard from "../../components/ParkingCard";
import BaseLayout from "../../components/BaseLayout/BaseLayout";

const History = () => {
  const parkings = useSelector(parkingsInactiveSortedSelector);
  const hasParkings = () => parkings.length > 0;
  const { t } = useTranslation();

  // Keep track of search and debounce
  const searchState = useSelector(parkingSearchFilterSelector);

  const searchFilter = (value: Parking) => {
    if (searchState.length === 0) return true;

    return (
      value.notes.includes(searchState) || value.name.includes(searchState)
    );
  };

  return (
    <BaseLayout level={"2"}>
      <Searchbar />

      <List padding spacer middle={!hasParkings()}>
        {hasParkings() ? (
          parkings
            .filter(searchFilter)
            .map((parking, index) => (
              <ParkingCard
                parking={parking}
                key={`recent-parking-card-${index}`}
              />
            ))
        ) : (
          <Text style={style.textCenter} appearance="hint">
            {t("empty.history") as string}
          </Text>
        )}
      </List>
    </BaseLayout>
  );
};

export default History;
