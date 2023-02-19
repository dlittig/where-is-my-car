import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, ListRenderItemInfo, View } from "react-native";

import {
  parkingInactiveFilteredSelector,
  parkingInactiveFilteredPaginatedSelector,
} from "../../store/selectors";
import style from "./History.style";
import List from "../../components/List";
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
    <BaseLayout>
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
                  icon="progress-download"
                  style={style.loadMore}
                  mode="elevated"
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
          <Text style={style.textCenter} variant="bodyMedium">
            {t("empty.history") as string}
          </Text>
        </List>
      )}
    </BaseLayout>
  );
};

export default History;
