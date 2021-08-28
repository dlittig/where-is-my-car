import React, { FC } from "react";

import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import List from "../../../components/List";
import Icons from "../../../components/Icons";
import { LocationViewScreenType } from "./types";
import MapView from "../../../components/MapView";
import BaseLayout from "../../../components/BaseLayout";
import MainAction from "../../../components/MainAction";
import { RootReducerType } from "../../../store/reducers";
import ImageGallery from "../../../components/ImageGallery";
import { parkingByIdSelector } from "../../../store/selectors";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { humanReadableDate, humanReadableTime } from "../../../utils";
import { APP_LOCATION_EDIT } from "../../../components/Navigator/Routes";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";

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

          <Field description={t("text.location.name")} content={parking.name} />

          <Field
            description={t("text.location.parked")}
            content={humanReadableDate(parking.time)}
          />

          {parking.hasReminder && (
            <Field
              description={t("text.location.reminder")}
              content={humanReadableTime(
                parking.reminderDateTime?.getTime() || 0
              )}
            />
          )}

          {parking.paid.length > 0 && (
            <Field
              description={t("text.location.paid")}
              content={`${parking.unit} ${parking.paid}`}
            />
          )}

          {parking.notes.length > 0 && (
            <Field
              description={t("text.location.notes")}
              content={parking.notes}
            />
          )}

          {parking.photos.length > 0 && (
            <>
              <Field description={t("text.location.photos")} content="" />
              <Text appearance="hint">
                {t("text.location.photosHint") as string}
              </Text>

              <ImageGallery photos={parking.photos} />
            </>
          )}
        </List>
        <MainAction>
          <Button accessoryLeft={Icons.Edit} onPress={onEdit}>
            {t("actions.edit").toUpperCase()}
          </Button>
        </MainAction>
      </BaseLayout>
    </>
  );
};

export default LocationView;
