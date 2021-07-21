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
import BaseLayout from "../../../components/BaseLayout";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";
import { LocationEditScreenType } from "./types";

import MapView from "../../../components/MapView";
import { MAP_VIEW_SIZE } from "../../../components/MapView/types";
import { View } from "react-native";
import { padd, take } from "../../../utils";

import styles from "./LocationEdit.style";
import { useLocation } from "../../../hooks";
import MainAction from "../../../components/MainAction";
import List from "../../../components/List";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addParking, updateParking } from "../../../store/actions";
import { useNavigation } from "@react-navigation/native";
import { parkingsSelector } from "../../../store/selectors";
import Icons from "../../../components/Icons";
import { Parking, paymentUnits } from "../../../store/types";

const getHours = () => [...Array(24).keys()].map((key) => padd(key));
const getMinutes = () => [...Array(60).keys()].map((key) => padd(key));

const LocationEdit: FC<LocationEditScreenType> = ({ route }) => {
  const parkingsReducer = useSelector(parkingsSelector);
  const parkingId = route.params ? (route.params["id"] as string) : undefined;
  const parking =
    typeof parkingId !== "undefined"
      ? parkingsReducer.parkings[parkingId]
      : null;

  const navigation = useNavigation();
  const { error: locationError, acquireLocation, location } = useLocation();
  const dispatch = useDispatch();

  // States
  const [name, setName] = useState<string>(take(parking, "name", ""));
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
  ); // TODO: fails if timer was set to `undefined` (not set)
  const [reminderTimeMinutes, setReminderTimeMinutes] = useState<IndexPath>(
    new IndexPath(
      new Date(take(parking, "reminderTime", Date.now())).getMinutes()
    )
  ); // TODO: fails if timer was set to `undefined` (not set)
  const [hasReminder, setHasReminder] = useState<boolean>(
    take(parking, "hasReminder", false)
  );

  const onSave = () => {
    const reminderTime = new Date(
      `1970-01-01T${getHours()[reminderTimeHours.row]}:${
        getMinutes()[reminderTimeMinutes.row]
      }:00`
    ).getTime();

    const parkingObject: Parking = {
      id: take(parking, "id", uuidv4()),
      name,
      car: "", // Not used for now
      time: take(parking, "time", Date.now()),
      reminderTime: hasReminder ? reminderTime : undefined,
      reminderDate: hasReminder ? reminderDate.getTime() : undefined,
      hasReminder,
      paid,
      unit: paymentUnits[selectedIndexUnit.row],
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      photos: [], // Not used for now
      locationName: "", // Not used for now
    };

    if (typeof parkingId !== "undefined") {
      dispatch(updateParking(parkingObject));
    } else {
      dispatch(addParking(parkingObject));
    }
    navigation.goBack();
  };

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2">
        <List spacer>
          <View style={styles.element}>
            {locationError.length !== 0 ? (
              <Text>{locationError}</Text>
            ) : (
              <MapView
                size={MAP_VIEW_SIZE.NORMAL}
                latitude={location.coords.latitude}
                longitude={location.coords.longitude}
              />
            )}
            <Button
              status="primary"
              accessoryLeft={Icons.Localize}
              onPress={acquireLocation}
            >
              Get location
            </Button>
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
