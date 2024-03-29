import { take } from "../utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { paymentUnits, PaymentUnitType } from "../store/types";
import { RootReducerType } from "../store/reducers";
import { parkingByIdSelector } from "../store/selectors";

export const useParkingsForm = (parkingId: string) => {
  const parking = useSelector((state: RootReducerType) =>
    parkingByIdSelector(state, parkingId)
  );

  // States
  const [name, setName] = useState<string>(take(parking, "name", ""));
  const [notes, setNotes] = useState<string>(take(parking, "notes", ""));
  const [unit, setUnit] = useState<PaymentUnitType>(take(parking, "unit", "€"));
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
  const [reminderTime, setReminderTime] = useState<Date>(
    new Date(take(parking, "reminderDateTime", Date.now()))
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
    unit,
    setUnit,
    paid,
    setPaid,
    location,
    setLocation,
    reminderDate,
    setReminderDate,
    reminderTime,
    setReminderTime,
    hasReminder,
    setHasReminder,
    photos,
    setPhotos,
  };
};
