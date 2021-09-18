import { take } from "../utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { paymentUnits } from "../store/types";
import { IndexPath } from "@ui-kitten/components";
import { RootReducerType } from "../store/reducers";
import { parkingByIdSelector } from "../store/selectors";

export const useParkingsForm = (parkingId: string) => {
  const parking = useSelector((state: RootReducerType) =>
    parkingByIdSelector(state, parkingId)
  );

  // States
  const [name, setName] = useState<string>(take(parking, "name", ""));
  const [notes, setNotes] = useState<string>(take(parking, "notes", ""));
  const [selectedIndexUnit, setSelectedIndexUnit] = useState<IndexPath>(
    new IndexPath(paymentUnits.indexOf(take(parking, "unit", "€")))
  );
  const [paid, setPaid] = useState<string>(take(parking, "paid", ""));
  const [reminderDate, setReminderDate] = useState<Date>(
    new Date(take(parking, "reminderDateTime", Date.now()))
  );

  const coords = {
    coords: {
      latitude: take(parking, "latitude", -1),
      longitude: take(parking, "longitude", -1),
    },
  } as Location.LocationObject;
  const [location, setLocation] = useState<Location.LocationObject>(coords);
  // TODO: fails if timer was set to `undefined` (not set)
  const [reminderTimeHours, setReminderTimeHours] = useState<IndexPath>(
    new IndexPath(
      new Date(take(parking, "reminderDateTime", Date.now())).getHours()
    )
  );
  // TODO: fails if timer was set to `undefined` (not set)
  const [reminderTimeMinutes, setReminderTimeMinutes] = useState<IndexPath>(
    new IndexPath(
      new Date(take(parking, "reminderDateTime", Date.now())).getMinutes()
    )
  );
  const [hasReminder, setHasReminder] = useState<boolean>(
    take(parking, "hasReminder", true)
  );

  const [photos, setPhotos] = useState<string[]>(take(parking, "photos", []));

  return {
    parking,
    name,
    setName,
    notes,
    setNotes,
    selectedIndexUnit,
    setSelectedIndexUnit,
    paid,
    setPaid,
    location,
    setLocation,
    reminderDate,
    setReminderDate,
    reminderTimeHours,
    setReminderTimeHours,
    reminderTimeMinutes,
    setReminderTimeMinutes,
    hasReminder,
    setHasReminder,
    photos,
    setPhotos,
  };
};
