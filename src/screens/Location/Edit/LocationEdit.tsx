import React, { FC } from "react";

import {
  Text,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Datepicker,
  CheckBox,
  Card,
} from "@ui-kitten/components";
import { v4 as uuidv4 } from "uuid";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import styles from "./LocationEdit.style";
import List from "../../../components/List";
import Icons from "../../../components/Icons";
import { LocationEditScreenType } from "./types";
import MapView from "../../../components/MapView";
import BaseLayout from "../../../components/BaseLayout";
import MainAction from "../../../components/MainAction";
import { useParkingsForm } from "../../../hooks/parkings";
import ImageGallery from "../../../components/ImageGallery";
import { Parking, paymentUnits } from "../../../store/types";
import {
  cancelNotification,
  getLocalDateTime,
  launchCamera,
  padd,
  requestImagePickerPermission,
  scheduleCreationNotification,
  scheduleExpirationNotification,
  take,
} from "../../../utils";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { addParking, updateParking } from "../../../store/actions";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";

const getHours = () => [...Array(24).keys()].map((key) => padd(key));
const getMinutes = () => [...Array(60).keys()].map((key) => padd(key));

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
      if (!result.cancelled) {
        parkingForm.setPhotos([...parkingForm.photos, result.uri]);
      }
    }
  };

  const onSave = async () => {
    // TODO Validate data before save
    if (!parkingForm.location) {
      return;
    }

    const reminderDateTime = getLocalDateTime(
      padd(parkingForm.reminderDate.getFullYear()),
      padd(parkingForm.reminderDate.getMonth() + 1),
      padd(parkingForm.reminderDate.getDate()),
      getHours()[parkingForm.reminderTimeHours.row],
      getMinutes()[parkingForm.reminderTimeMinutes.row]
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
      unit: paymentUnits[parkingForm.selectedIndexUnit.row],
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
      const notificationId = await scheduleExpirationNotification(
        reminderDateTime,
        parkingObject
      );

      if (notificationId) {
        parkingObject.scheduledNotification = notificationId;
      }
    }

    if (parkingId.length > 0) {
      dispatch(updateParking(parkingObject));
    } else {
      dispatch(addParking(parkingObject));
      scheduleCreationNotification(parkingObject);
    }

    navigation.goBack();
  };

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2">
        <List level="1" spacer padding>
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
          <Input
            label={t("text.location.name") as string}
            style={styles.element}
            value={parkingForm.name}
            onChangeText={(nextValue) => parkingForm.setName(nextValue)}
          />
          <Button
            onPress={() => parkingForm.setHasReminder(!parkingForm.hasReminder)}
            appearance="outline"
            size="small"
            accessoryLeft={parkingForm.hasReminder ? Icons.Remove : Icons.Clock}
            style={styles.reminderButton}
          >
            {parkingForm.hasReminder
              ? (t("text.location.removeReminder") as string)
              : (t("text.location.setReminder") as string)}
          </Button>
          {parkingForm.hasReminder && (
            <Card appearance="outline">
              <Datepicker
                label={t("text.location.reminderDate") as string}
                date={parkingForm.reminderDate}
                onSelect={(nextDate) => parkingForm.setReminderDate(nextDate)}
              />
              <View style={[styles.inline, styles.element]}>
                <Select
                  label={t("text.location.hours") as string}
                  style={styles.hours}
                  selectedIndex={parkingForm.reminderTimeHours}
                  value={() => (
                    <Text>{getHours()[parkingForm.reminderTimeHours.row]}</Text>
                  )}
                  onSelect={(index) =>
                    parkingForm.setReminderTimeHours(index as IndexPath)
                  }
                >
                  {getHours().map((hour, index) => (
                    <SelectItem
                      key={`reminder-time-selectitem-hour-${index}`}
                      title={hour}
                    />
                  ))}
                </Select>
                <Select
                  label={t("text.location.minutes") as string}
                  style={styles.minutes}
                  selectedIndex={parkingForm.reminderTimeMinutes}
                  value={() => (
                    <Text>
                      {getMinutes()[parkingForm.reminderTimeMinutes.row]}
                    </Text>
                  )}
                  onSelect={(index) =>
                    parkingForm.setReminderTimeMinutes(index as IndexPath)
                  }
                >
                  {getMinutes().map((minute, index) => (
                    <SelectItem
                      key={`reminder-time-selectitem-minute-${index}`}
                      title={minute}
                    />
                  ))}
                </Select>
              </View>
            </Card>
          )}
          <View style={[styles.inline, styles.element]}>
            <Input
              label={t("text.location.paid") as string}
              placeholder="0.00"
              keyboardType="decimal-pad"
              style={styles.paid}
              value={parkingForm.paid}
              onChangeText={(nextValue) => parkingForm.setPaid(nextValue)}
            />
            <Select
              label=" "
              style={styles.unit}
              selectedIndex={parkingForm.selectedIndexUnit}
              value={() => (
                <Text>{paymentUnits[parkingForm.selectedIndexUnit.row]}</Text>
              )}
              onSelect={(index) =>
                parkingForm.setSelectedIndexUnit(index as IndexPath)
              }
            >
              {paymentUnits.map((unit, index) => (
                <SelectItem key={`payment-selectitem-${index}`} title={unit} />
              ))}
            </Select>
          </View>

          <Input
            label={t("text.location.notes") as string}
            multiline
            textStyle={styles.notesText}
            style={styles.element}
            value={parkingForm.notes}
            onChangeText={(nextValue) => parkingForm.setNotes(nextValue)}
          />

          <Text appearance="hint" category="p2" style={styles.photos}>
            Photos
          </Text>

          <ImageGallery
            photos={parkingForm.photos}
            enableDelete
            onDelete={parkingForm.setPhotos}
          />

          <Button
            size="small"
            appearance="outline"
            accessoryLeft={Icons.Add}
            onPress={selectPhotos}
          >
            {t("actions.addPhotos") as string}
          </Button>
        </List>
        <MainAction border>
          <Button accessoryLeft={Icons.Save} onPress={onSave}>
            {t("actions.save").toUpperCase()}
          </Button>
        </MainAction>
      </BaseLayout>
    </>
  );
};

export default LocationEdit;
