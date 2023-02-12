import React from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import style from "./Recent.style";
import List from "../../components/List";
import MainAction from "../../components/MainAction";
import BaseLayout from "../../components/BaseLayout";
import ParkingCard from "../../components/ParkingCard";
import { parkingsActiveSortedSelector } from "../../store/selectors";
import { APP_LOCATION_EDIT } from "../../components/Navigator/Routes";

const Recent = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const onPress = () => navigation.navigate(t(APP_LOCATION_EDIT) as never);
  const parkings = useSelector(parkingsActiveSortedSelector);
  const hasParkings = () => parkings.length > 0;

  return (
    <BaseLayout>
      <List padding spacer middle={!hasParkings()}>
        {hasParkings() ? (
          parkings.map((parking, index) => (
            <ParkingCard
              parking={parking}
              key={`recent-parking-card-${index}`}
            />
          ))
        ) : (
          <Text style={style.textCenter} variant="bodyMedium">
            {t("empty.recent") as string}
          </Text>
        )}
      </List>
      <MainAction>
        <Button mode="contained" icon="plus" onPress={onPress}>
          {t("actions.createNew").toUpperCase()}
        </Button>
      </MainAction>
    </BaseLayout>
  );
};

export default Recent;
