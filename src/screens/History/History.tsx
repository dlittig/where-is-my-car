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
import { FlatList, ListRenderItemInfo, View } from "react-native";

const renderItem = ({ item }: ListRenderItemInfo<Parking>) => (
  <ParkingCard parking={item} key={`recent-parking-card-${item.id}`} />
);

const History = () => {
  const parkings = useSelector(parkingsInactiveSortedSelector);
  const hasParkings = () => parkings.length > 0;
  const { t } = useTranslation();

  // Keep track of search and debounce
  const searchState = useSelector(parkingSearchFilterSelector);

  const searchFilter = (value: Parking) => {
    if (searchState.length === 0) return true;

    return (
      value.notes.toLowerCase().includes(searchState.toLowerCase()) ||
      value.name.toLowerCase().includes(searchState.toLowerCase())
    );
  };

  return (
    <BaseLayout level={"2"}>
      <Searchbar />

      {hasParkings() ? (
        <FlatList
          style={style.list}
          data={parkings.filter(searchFilter)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={style.spacer}></View>}
        />
      ) : (
        <List padding middle>
          <Text style={style.textCenter} appearance="hint">
            {t("empty.history") as string}
          </Text>
        </List>
      )}
    </BaseLayout>
  );
};

export default History;
