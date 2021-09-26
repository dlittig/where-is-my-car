import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Input, Layout, Text } from "@ui-kitten/components";

import style from "./History.style";
import List from "../../components/List";
import ParkingCard from "../../components/ParkingCard";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import {
  parkingSearchFilterSelector,
  parkingsInactiveSortedSelector,
} from "../../store/selectors";
import { useTranslation } from "react-i18next";
import { Parking } from "../../store/types";
import { searchParking } from "../../store/actions";
import { useDebounce } from "use-debounce/lib";

const History = () => {
  const dispatch = useDispatch();
  const parkings = useSelector(parkingsInactiveSortedSelector);
  const hasParkings = () => parkings.length > 0;
  const { t } = useTranslation();

  // Keep track of search and debounce
  const searchState = useSelector(parkingSearchFilterSelector);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  useEffect(() => {
    dispatch(searchParking(value));
  }, [value]);

  const searchFilter = (value: Parking) => {
    if (searchState.length === 0) return true;

    return (
      value.notes.includes(searchState) || value.name.includes(searchState)
    );
  };

  return (
    <BaseLayout level={"2"}>
      <Layout level="1" style={style.search}>
        <Input
          placeholder="Search"
          size="small"
          onChangeText={(value) => setSearch(value)}
        />
      </Layout>

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
