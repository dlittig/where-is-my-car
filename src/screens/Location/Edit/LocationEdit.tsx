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

const LocalizeIcon = (props: any) => <Icon {...props} name="pin" />;
const paymentUnits = ["€", "$", "CHF", "¥", "£"];

const LocationEdit: FC<LocationEditScreenType> = ({ route }) => {
  const { error: locationError, acquireLocation, location } = useLocation();
  const [selectedIndexUnit, setSelectedIndexUnit] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [name, setName] = useState<string>("");
  const [reminderDate, setReminderDate] = useState<Date>(new Date());
  const [reminderTimeHours, setReminderTimeHours] = useState<string>(
    padd(new Date().getHours())
  );
  const [reminderTimeMinutes, setReminderTimeMinutes] = useState<string>(
    padd(new Date().getMinutes())
  );
  const [paid, setPaid] = useState<string>("");

  console.log(locationError);

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2" padded>
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
            accessoryLeft={LocalizeIcon}
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
            onChangeText={(nextValue) => setReminderTimeMinutes(nextValue)}
          />
        </View>
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
      </BaseLayout>
    </>
  );
};

export default LocationEdit;
