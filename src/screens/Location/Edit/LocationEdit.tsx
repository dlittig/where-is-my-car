import React, { FC } from "react";

import { v4 as uuidv4 } from "uuid";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, Surface, TextInput, Text } from "react-native-paper";

import {
  cancelNotification,
  getLocalDateTime,
  isValidParkingForm,
  launchCamera,
  padd,
  requestImagePickerPermission,
  requestNotificationPermission,
  scheduleCreationNotification,
  scheduleExpirationNotification,
  showToast,
  take,
} from "../../../utils";
import styles from "./LocationEdit.style";
import List from "../../../components/List";
import { Parking } from "../../../store/types";
import { LocationEditScreenType } from "./types";
import MapView from "../../../components/MapView";
import UnitInput from "../../../components/UnitInput";
import BaseLayout from "../../../components/BaseLayout";
import MainAction from "../../../components/MainAction";
import { useParkingsForm } from "../../../hooks/parkings";
import ImageGallery from "../../../components/ImageGallery";
import DateTimeInput from "../../../components/DateTimeInput";
import BackBar from "../../../components/Navigator/Bars/BackBar";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { addParking, updateParking } from "../../../store/actions";
import { DATE_TIME_INPUT_MODE } from "../../../components/DateTimeInput/types";

const LocationEdit: FC<LocationEditScreenType> = ({ route }) => {
  const parkingId = route.params ? (route.params["id"] as string) : "";
  const parkingForm = useParkingsForm(parkingId);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectPhotos = async () => {
    const hasPermission = await requestImagePickerPermission();

    if (hasPermission) {
      const result = await launchCamera();
      if (!result.canceled) {
        const uris = result.assets.map(image => image.uri);
        parkingForm.setPhotos([...parkingForm.photos, ...uris]);
      }
    }
  };

  const onSave = async () => {
    if (!isValidParkingForm(parkingForm)) {
      showToast("Not valid form!");
      return;
    }

    const reminderDateTime = getLocalDateTime(
      padd(parkingForm.reminderDate.getFullYear()),
      padd(parkingForm.reminderDate.getMonth() + 1),
      padd(parkingForm.reminderDate.getDate()),
      padd(parkingForm.reminderTime.getHours()),
      padd(parkingForm.reminderTime.getMinutes())
    );

    const parkingObject: Parking = {
      id: take(parkingForm.parking, "id", uuidv4()),
      name: parkingForm.name,
      notes: parkingForm.notes,
      isActive: take(parkingForm.parking, "isActive", true),
      time: take(parkingForm.parking, "time", Date.now()),
      reminderDateTime: parkingForm.hasReminder ? reminderDateTime : undefined,
      hasReminder: parkingForm.hasReminder,
      paid: parkingForm.paid,
      unit: parkingForm.unit,
      latitude: parkingForm.location?.coords.latitude || 0,
      longitude: parkingForm.location?.coords.longitude || 0,
      photos: parkingForm.photos,
      scheduledNotification: take(
        parkingForm.parking,
        "scheduledNotification",
        undefined
      ),
    };

    // Schedule notification and cancel previously existing ones
    if (
      parkingObject.scheduledNotification &&
      parkingObject.scheduledNotification.length > 0
    ) {
      await cancelNotification(parkingObject.scheduledNotification);
    }

    if (parkingForm.hasReminder) {
      const permissionStatus = await requestNotificationPermission();

      if (permissionStatus) {
        const notificationId = await scheduleExpirationNotification(
          reminderDateTime,
          parkingObject
        );

        if (notificationId) {
          parkingObject.scheduledNotification = notificationId;
        }
      }
    }

    if (parkingId.length > 0) {
      dispatch(updateParking(parkingObject));
    } else {
      dispatch(addParking(parkingObject));
      const permissionStatus = await requestNotificationPermission();

      if (permissionStatus) {
        scheduleCreationNotification(parkingObject);
      }
    }

    navigation.goBack();
  };

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout>
        <List spacer padding>
          <View style={styles.element}>
            {/* Read location from object and display it and offer new location */}
            <MapView
              mode="active"
              latitude={parkingForm.location?.coords.latitude}
              longitude={parkingForm.location?.coords.longitude}
              withAction
              onLocationAcquisition={parkingForm.setLocation}
              size={MAP_VIEW_SIZE.NORMAL}
            />
          </View>
          <TextInput
            label={t("text.location.name") as string}
            style={styles.element}
            value={parkingForm.name}
            mode="outlined"
            onChangeText={parkingForm.setName}
          />
          <Button
            onPress={() => parkingForm.setHasReminder(!parkingForm.hasReminder)}
            mode="outlined"
            compact
            icon={parkingForm.hasReminder ? "calendar-remove" : "calendar"}
            style={styles.reminderButton}
          >
            {parkingForm.hasReminder
              ? (t("text.location.removeReminder") as string)
              : (t("text.location.setReminder") as string)}
          </Button>
          {parkingForm.hasReminder && (
            <Surface elevation={3} style={styles.surface}>
              <DateTimeInput
                label={t("text.location.reminderDate") as string}
                value={parkingForm.reminderDate}
                mode={DATE_TIME_INPUT_MODE.date}
                onChange={parkingForm.setReminderDate}
              />
              <DateTimeInput
                label={t("text.location.reminderTime") as string}
                value={parkingForm.reminderTime}
                mode={DATE_TIME_INPUT_MODE.time}
                onChange={parkingForm.setReminderTime}
              />
            </Surface>
          )}
          <View style={[styles.inline, styles.element]}>
            <TextInput
              label={t("text.location.paid") as string}
              mode="outlined"
              placeholder="0.00"
              keyboardType="decimal-pad"
              style={styles.paid}
              value={parkingForm.paid}
              onChangeText={parkingForm.setPaid}
            />
            <UnitInput
              value={parkingForm.unit}
              onChange={parkingForm.setUnit}
            />
          </View>

          <TextInput
            label={t("text.location.notes") as string}
            multiline
            mode="outlined"
            contentStyle={styles.notesText}
            style={styles.element}
            value={parkingForm.notes}
            onChangeText={(nextValue) => parkingForm.setNotes(nextValue)}
          />

          <Text variant="labelMedium" style={styles.photos}>
            Photos
          </Text>

          <ImageGallery
            photos={parkingForm.photos}
            enableDelete
            onDelete={parkingForm.setPhotos}
          />

          <Button compact mode="outlined" icon="plus" onPress={selectPhotos}>
            {t("actions.addPhotos") as string}
          </Button>
        </List>
        <MainAction border>
          <Button mode="contained" icon="check" onPress={onSave}>
            {t("actions.save").toUpperCase()}
          </Button>
        </MainAction>
      </BaseLayout>
    </>
  );
};

export default LocationEdit;
