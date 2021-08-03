import React from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import style from "./Recent.style";
import List from "../../components/List";
import Icons from "../../components/Icons";
import { ParkingsState } from "../../store/types";
import MainAction from "../../components/MainAction";
import { RootReducerType } from "../../store/reducers";
import ParkingCard from "../../components/ParkingCard";
import { parkingsSelector } from "../../store/selectors";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import { APP_LOCATION_EDIT } from "../../components/Navigator/Routes";

const Recent = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const parkingsReducer = useSelector<RootReducerType, ParkingsState>(
    parkingsSelector
  );
  const onPress = () => navigation.navigate(t(APP_LOCATION_EDIT));
  const parkings = parkingsReducer.sortedParkings
    .map((id) => parkingsReducer.parkings[id])
    .filter((parking) => parking.isActive);
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
            No parking saved. You can create one with the button below
          </Text>
        )}
      </List>
      <MainAction>
        <Button accessoryLeft={Icons.Add} onPress={onPress}>
          CREATE NEW
        </Button>
      </MainAction>
    </BaseLayout>
  );
};

export default Recent;
