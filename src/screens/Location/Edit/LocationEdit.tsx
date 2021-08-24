import React, { FC, useState } from "react";

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
import { Image, Platform, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import styles from "./LocationEdit.style";
import * as Location from "expo-location";
import List from "../../../components/List";
import {
  getLocalDateTime,
  padd,
  scheduleNotification,
  take,
} from "../../../utils";
import Icons from "../../../components/Icons";
import { LocationEditScreenType } from "./types";
import MapView from "../../../components/MapView";
import BaseLayout from "../../../components/BaseLayout";
import MainAction from "../../../components/MainAction";
import { parkingByIdSelector } from "../../../store/selectors";
import { Parking, paymentUnits } from "../../../store/types";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { addParking, updateParking } from "../../../store/actions";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";
import { RootReducerType } from "../../../store/reducers";
import ImageGallery from "../../../components/ImageGallery";
import { useEffect } from "react";

const getHours = () => [...Array(24).keys()].map((key) => padd(key));
const getMinutes = () => [...Array(60).keys()].map((key) => padd(key));

// TODO Refactor this component, it is waay to big
const LocationEdit: FC<LocationEditScreenType> = ({ route }) => {
  const parkingId = route.params ? (route.params["id"] as string) : "";
  const parking = useSelector((state: RootReducerType) =>
    parkingByIdSelector(state, parkingId)
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // States
  const [name, setName] = useState<string>(take(parking, "name", ""));
  const [notes, setNotes] = useState<string>(take(parking, "notes", ""));
  const [selectedIndexUnit, setSelectedIndexUnit] = useState<IndexPath>(
    new IndexPath(paymentUnits.indexOf(take(parking, "unit", "€")))
  );
  const [paid, setPaid] = useState<string>(take(parking, "paid", ""));
  const [reminderDate, setReminderDate] = useState<Date>(
    new Date(take(parking, "reminderDate", Date.now()))
  );
  const [reminderTimeHours, setReminderTimeHours] = useState<IndexPath>(
    new IndexPath(
      new Date(take(parking, "reminderTime", Date.now())).getHours()
    )
  );
  // TODO: fails if timer was set to `undefined` (not set)
  // TODO: There seems to be a timezone conversion that always adds 1h each render of that screen
  const [location, setLocation] = useState<Location.LocationObject>();
  const [reminderTimeMinutes, setReminderTimeMinutes] = useState<IndexPath>(
    new IndexPath(
      new Date(take(parking, "reminderTime", Date.now())).getMinutes()
    )
  ); // TODO: fails if timer was set to `undefined` (not set)
  const [hasReminder, setHasReminder] = useState<boolean>(
    take(parking, "hasReminder", true)
  );

  const [photos, setPhotos] = useState<string[]>(take(parking, "photos", []));

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
        setPhotos([...photos, result.uri]);
      }
    }
  };

  const onSave = () => {
    // TODO Validate data before save
    if (!location) {
      return;
    }

    // TODO Make a util function out of this
    // const reminderDateTime = new Date(
    //   `${padd(reminderDate.getFullYear())}-${padd(
    //     reminderDate.getMonth() + 1
    //   )}-${padd(reminderDate.getDate())}T${getHours()[reminderTimeHours.row]}:${
    //     getMinutes()[reminderTimeMinutes.row]
    //   }:00`
    // );
    const reminderDateTime = getLocalDateTime(
      padd(reminderDate.getFullYear()),
      padd(reminderDate.getMonth() + 1),
      padd(reminderDate.getDate()),
      getHours()[reminderTimeHours.row],
      getMinutes()[reminderTimeMinutes.row]
    );

    // TODO: use date-fns to create localized dates

    const parkingObject: Parking = {
      id: take(parking, "id", uuidv4()),
      name,
      notes,
      isActive: take(parking, "isActive", true),
      time: take(parking, "time", Date.now()),
      reminderDateTime: hasReminder ? reminderDateTime : undefined,
      hasReminder,
      paid,
      unit: paymentUnits[selectedIndexUnit.row],
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      photos,
    };

    if (parkingId.length > 0) {
      dispatch(updateParking(parkingObject));
    } else {
      dispatch(addParking(parkingObject));
    }

    console.log(parkingObject);

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
              onLocationAcquisition={setLocation}
              size={MAP_VIEW_SIZE.NORMAL}
            />
          </View>
          <Input
            label="Name"
            style={styles.element}
            value={name}
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <CheckBox
            checked={hasReminder}
            onChange={(nextChecked: boolean) => setHasReminder(nextChecked)}
          >
            Set reminder
          </CheckBox>
          {hasReminder && (
            <>
              <Datepicker
                style={styles.element}
                label="Reminder date"
                date={reminderDate}
                onSelect={(nextDate) => setReminderDate(nextDate)}
              />
              <View style={[styles.inline, styles.element]}>
                <Select
                  label="Hours"
                  style={styles.hours}
                  selectedIndex={reminderTimeHours}
                  value={() => <Text>{getHours()[reminderTimeHours.row]}</Text>}
                  onSelect={(index) => setReminderTimeHours(index as IndexPath)}
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
                  selectedIndex={reminderTimeMinutes}
                  value={() => (
                    <Text>{getMinutes()[reminderTimeMinutes.row]}</Text>
                  )}
                  onSelect={(index) =>
                    setReminderTimeMinutes(index as IndexPath)
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
              value={paid}
              onChangeText={(nextValue) => setPaid(nextValue)}
            />
            <Select
              label=" "
              style={styles.unit}
              selectedIndex={selectedIndexUnit}
              value={() => <Text>{paymentUnits[selectedIndexUnit.row]}</Text>}
              onSelect={(index) => setSelectedIndexUnit(index as IndexPath)}
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
            value={notes}
            onChangeText={(nextValue) => setNotes(nextValue)}
          />

          <ImageGallery photos={photos} enableDelete onDelete={setPhotos} />

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
