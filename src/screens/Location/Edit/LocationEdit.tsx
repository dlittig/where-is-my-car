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
} from "@ui-kitten/components";
import { v4 as uuidv4 } from "uuid";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
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
import { getLocalDateTime, padd, take } from "../../../utils";
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

  const selectPhotos = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        parkingForm.setPhotos([...parkingForm.photos, result.uri]);
      }
    }
  };

  const onSave = () => {
    // TODO Validate data before save
    if (!location) {
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
    };

    if (parkingId.length > 0) {
      dispatch(updateParking(parkingObject));
    } else {
      dispatch(addParking(parkingObject));
    }

    // TODO: Save resulting id of notification to make them cancelable
    //scheduleNotification(reminderDateTime);

    navigation.goBack();
  };

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2">
        <List spacer>
          <View style={styles.element}>
            <MapView
              mode="active"
              withAction
              onLocationAcquisition={parkingForm.setLocation}
              size={MAP_VIEW_SIZE.NORMAL}
            />
          </View>
          <Input
            label="Name"
            style={styles.element}
            value={parkingForm.name}
            onChangeText={(nextValue) => parkingForm.setName(nextValue)}
          />
          <CheckBox
            checked={parkingForm.hasReminder}
            onChange={(nextChecked: boolean) =>
              parkingForm.setHasReminder(nextChecked)
            }
          >
            Set reminder
          </CheckBox>
          {parkingForm.hasReminder && (
            <>
              <Datepicker
                style={styles.element}
                label="Reminder date"
                date={parkingForm.reminderDate}
                onSelect={(nextDate) => parkingForm.setReminderDate(nextDate)}
              />
              <View style={[styles.inline, styles.element]}>
                <Select
                  label="Hours"
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
                  label="Minutes"
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
            </>
          )}
          <View style={[styles.inline, styles.element]}>
            <Input
              label="Paid"
              placeholder="0.00"
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
            label="Notes"
            multiline
            textStyle={{ minHeight: 64 }}
            style={styles.element}
            value={parkingForm.notes}
            onChangeText={(nextValue) => parkingForm.setNotes(nextValue)}
          />

          <ImageGallery
            photos={parkingForm.photos}
            enableDelete
            onDelete={parkingForm.setPhotos}
          />

          <Button accessoryLeft={Icons.Add} onPress={selectPhotos}>
            Add photos
          </Button>
        </List>
        <MainAction>
          <Button accessoryLeft={Icons.Save} onPress={onSave}>
            SAVE
          </Button>
        </MainAction>
      </BaseLayout>
    </>
  );
};

export default LocationEdit;
