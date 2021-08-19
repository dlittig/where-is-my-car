import { Parking } from "../store/types";
import * as Location from "expo-location";
import { differenceInSeconds } from "date-fns";
import * as Notifications from "expo-notifications";

export const humanReadableDate = (time: number): string => {
  const date: Date = new Date(time);
  return `${padd(date.getHours())}:${padd(date.getMinutes())} - ${padd(
    date.getDate()
  )}.${padd(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const humanReadableTime = (time: number): string => {
  const date: Date = new Date(time);
  return `${padd(date.getHours())}:${padd(date.getMinutes())}`;
};

export const humanReadableMoney = (value: number, unit: string): string => {
  // Convert value to string and figure out present decimal places
  const valueString = `${value}`;
  const decimalIndex = valueString.indexOf(".");

  if (decimalIndex !== -1) {
    // Has decimal
    const padCount = valueString.length - 1 - decimalIndex;

    if (padCount === 1) {
      return `${unit} ${valueString}0`;
    } else {
      return `${unit} ${valueString}`;
    }
  } else {
    // Has no decimal
    return `${unit} ${valueString}.00`;
  }
};

export const padd = (elem: number): string =>
  elem < 10 ? `0${elem}` : `${elem}`;

export const take = <T extends unknown>(
  suspect: Parking,
  key: string,
  fallback: T
): T =>
  typeof suspect !== "undefined" &&
  suspect !== null &&
  typeof suspect[key] !== "undefined"
    ? (suspect[key] as T)
    : fallback;

export const getHoursFromTimestamp = (date: Date) => date.getHours();

export const getMinutesFromTimestamp = (date: Date) => date.getMinutes();

export const acquireLocation =
  async (): Promise<Location.LocationObject | null> => {
    try {
      return await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Highest,
      });
    } catch (e) {
      console.error(`An error occured when acquiring location: ${e}`);
      return null;
    }
  };

export const requestLocationPermission = async (): Promise<boolean> => {
  let locationStatus: Location.PermissionStatus;

  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    locationStatus = status;
  } catch (e) {
    console.error(`An error occured when asking for location permission: ${e}`);

    return false;
  }

  if (locationStatus !== "granted") {
    console.warn(`Location permission was not granted: ${locationStatus}`);
    return false;
  }

  return true;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  let notificationStatus: Location.PermissionStatus;

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    notificationStatus = status;
  } catch (e) {
    console.error(
      `An error occured when asking for notification permission: ${e}`
    );

    return false;
  }

  if (notificationStatus !== "granted") {
    console.warn(
      `Notification permission was not granted: ${notificationStatus}`
    );
    return false;
  }

  return true;
};

export const scheduleNotification = async (target: Date) => {
  const schedulingOptions = {
    content: {
      title: "This is a notification",
      body: "This is the body",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: "blue",
    },
    trigger: {
      seconds: differenceInSeconds(new Date(), target),
    },
  };

  Notifications.scheduleNotificationAsync(schedulingOptions);
};
