import React, { FC } from "react";
import BaseLayout from "../../../components/BaseLayout";
import { LocationViewScreenType } from "./types";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";
import List from "../../../components/List";
import MapView from "../../../components/MapView";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { useSelector } from "react-redux";
import { parkingsSelector } from "../../../store/selectors";
import MainAction from "../../../components/MainAction";
import { Button } from "@ui-kitten/components";
import Icons from "../../../components/Icons";
import { useNavigation } from "@react-navigation/native";
import { APP_LOCATION_EDIT } from "../../../components/Navigator/Routes";
import { useTranslation } from "react-i18next";

const LocationView: FC<LocationViewScreenType> = ({ route }) => {
  const parkingsReducer = useSelector(parkingsSelector);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const parkingId = route.params ? (route.params["id"] as string) : "";
  const parking = parkingsReducer.parkings[parkingId];

  const onEdit = () => {
    navigation.navigate(t(APP_LOCATION_EDIT), { id: parkingId });
  };

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2">
        <List spacer>
          <MapView
            size={MAP_VIEW_SIZE.NORMAL}
            latitude={parking.latitude}
            longitude={parking.longitude}
          />
        </List>
        <MainAction>
          <Button accessoryLeft={Icons.Edit} onPress={onEdit}>
            EDIT
          </Button>
        </MainAction>
      </BaseLayout>
    </>
  );
};

export default LocationView;
