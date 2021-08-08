import React, { FC } from "react";

import { useSelector } from "react-redux";
import { Button, Text } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import List from "../../../components/List";
import Icons from "../../../components/Icons";
import { LocationViewScreenType } from "./types";
import MapView from "../../../components/MapView";
import BaseLayout from "../../../components/BaseLayout";
import MainAction from "../../../components/MainAction";
import { parkingByIdSelector } from "../../../store/selectors";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { APP_LOCATION_EDIT } from "../../../components/Navigator/Routes";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";
import { humanReadableDate, humanReadableTime } from "../../../utils";
import { Image, View } from "react-native";
import ImageGallery from "../../../components/ImageGallery";
import { RootReducerType } from "../../../store/reducers";

type FieldComponentType = {
  description: string;
  content: string;
};

const Field: FC<FieldComponentType> = ({ description, content }) => (
  <View style={{ marginVertical: 10 }}>
    <Text category="h6">{description}:</Text>
    <Text>{content}</Text>
  </View>
);

const LocationView: FC<LocationViewScreenType> = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const parkingId = route.params ? (route.params["id"] as string) : "";
  const parking = useSelector((state: RootReducerType) =>
    parkingByIdSelector(state, parkingId)
  );

  const onEdit = () => {
    navigation.navigate(t(APP_LOCATION_EDIT), { id: parkingId });
  };

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2">
        <List spacer>
          <MapView
            mode="passive"
            size={MAP_VIEW_SIZE.NORMAL}
            latitude={parking.latitude}
            longitude={parking.longitude}
          />

          <Field description="Name" content={parking.name} />
          <Field
            description="Parked"
            content={humanReadableDate(parking.time)}
          />
          {parking.hasReminder && (
            <Field
              description="Reminder"
              content={humanReadableTime(parking.reminderTime || 0)}
            />
          )}
          {parking.car.length > 0 && (
            <Field description="Car" content={parking.car} />
          )}

          {parking.paid.length > 0 && (
            <Field
              description="Paid"
              content={`${parking.unit} ${parking.paid}`}
            />
          )}

          {parking.photos.length > 0 && (
            <>
              <Field description="Photos" content="" />
              <Text appearance="hint">
                You can see the photos in full size when tapping on them.
              </Text>

              <ImageGallery photos={parking.photos} />
            </>
          )}
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
