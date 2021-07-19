import React, { FC, useState } from "react";
import {
  Icon,
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
import { padd } from "../../../utils";

import styles from "./LocationEdit.style";
import { useLocation } from "../../../hooks";
import MainAction from "../../../components/MainAction";
import List from "../../../components/List";
import {
  Parking,
  PaymentUnitType,
} from "../../../store/reducers/parkingReducer";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateParking } from "../../../store/actions";
import { useNavigation } from "@react-navigation/native";
import { parkingsSelector } from "../../../store/selectors";
import Icons from "../../../components/Icons";

const paymentUnits: PaymentUnitType[] = ["€", "$", "CHF", "¥", "£"];

const LocationEdit: FC<LocationEditScreenType> = ({ route }) => {
  const parkingsReducer = useSelector(parkingsSelector);
  const parkingId = route.params ? (route.params["id"] as string) : undefined;
  const parking =
    typeof parkingId !== "undefined"
      ? parkingsReducer.parkings[parkingId]
      : null;

  const take = <T extends unknown>(key: string, fallback: T): T =>
    typeof parkingId !== "undefined" &&
    parking !== null &&
    typeof parking[key] !== "undefined"
      ? (parking[key] as T)
      : fallback;

  const navigation = useNavigation();
  const { error: locationError, acquireLocation, location } = useLocation();
  const dispatch = useDispatch();
  const [selectedIndexUnit, setSelectedIndexUnit] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [name, setName] = useState<string>(take("name", ""));
  const [reminderDate, setReminderDate] = useState<Date>(new Date());
  const [reminderTimeHours, setReminderTimeHours] = useState<string>(
    padd(new Date().getHours())
  );
  const [reminderTimeMinutes, setReminderTimeMinutes] = useState<string>(
    padd(new Date().getMinutes())
  );
  const [paid, setPaid] = useState<string>(take("paid", ""));
  const [hasReminder, setHasReminder] = useState<boolean>(false);

  const onSave = () => {
    const parking: Parking = {
      id: uuidv4(),
      name,
      car: "",
      time: Date.now(),
      reminderTime: hasReminder ? 0 : undefined,
      paid,
      unit: paymentUnits[selectedIndexUnit.row],
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      photos: [],
      locationName: "",
    };

    dispatch(updateParking(parking));
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
                <Input
                  label="Hours"
                  style={styles.hours}
                  value={reminderTimeHours}
                  onChangeText={(nextValue) => setReminderTimeHours(nextValue)}
                />
                <Input
                  label="Minutes"
                  style={styles.minutes}
                  value={reminderTimeMinutes}
                  onChangeText={(nextValue) =>
                    setReminderTimeMinutes(nextValue)
                  }
                />
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
