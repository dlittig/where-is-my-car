import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Text } from "@ui-kitten/components";
import { FlatList, ListRenderItemInfo, View } from "react-native";

import {
  parkingInactiveFilteredSelector,
  parkingInactiveFilteredPaginatedSelector,
} from "../../store/selectors";
import style from "./History.style";
import List from "../../components/List";
import Icons from "../../components/Icons";
import { Parking } from "../../store/types";
import Searchbar from "../../components/Searchbar";
import ParkingCard from "../../components/ParkingCard";
import { increaseCurrentLimit } from "../../store/actions";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import { appLimitSelector } from "../../store/selectors/appSelectors";

const renderItem = ({ item }: ListRenderItemInfo<Parking>) => (
  <ParkingCard parking={item} key={`recent-parking-card-${item.id}`} />
);

const History = () => {
  const parkings = useSelector(parkingInactiveFilteredPaginatedSelector);
  const allInactiveParkings = useSelector(parkingInactiveFilteredSelector);
  const currentLimit = useSelector(appLimitSelector);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hasParkings = useCallback(() => parkings.length > 0, [parkings]);

  const onIncrease = () => dispatch(increaseCurrentLimit());

  return (
    <BaseLayout level={"2"}>
      <Searchbar />

      {hasParkings() ? (
        <FlatList
          style={style.list}
          data={parkings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <>
              <View style={style.spacer}></View>
              {allInactiveParkings.length > currentLimit && (
                <Button
                  accessoryLeft={Icons.Add}
                  style={style.loadMore}
                  appearance="ghost"
                  onPress={onIncrease}
                >
                  Load 10 more
                </Button>
              )}
            </>
          }
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
