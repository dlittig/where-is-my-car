import { Parking } from "../store/types";
import * as Location from "expo-location";
import { differenceInSeconds } from "date-fns";
import * as ImagePicker from "expo-image-picker";
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

export const padd = (elem: number): string => {
  if (elem >= 0 && elem < 10) {
    return `0${elem}`;
  } else if (elem > -10 && elem < 0) {
    return `-${padd(elem * -1)}`;
  }

  return `${elem}`;
};

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
      if (await Location.hasServicesEnabledAsync()) {
        return await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.Highest,
        });
      } else {
        console.error(`Location service is not enabled.`);
        return null;
      }
    } catch (e) {
      // TODO: Reevalute https://github.com/expo/expo/issues/14248
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

export const requestImagePickerPermission = async (): Promise<boolean> => {
  let imagePickerStatus: ImagePicker.PermissionStatus;

  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    imagePickerStatus = status;
  } catch (e) {
    console.error(
      `An error occured when asking for Image Picker permission: ${e}`
    );

    return false;
  }

  if (imagePickerStatus !== "granted") {
    console.warn(
      `Notification permission was not granted: ${imagePickerStatus}`
    );
    return false;
  }

  return true;
};

export const launchCamera =
  async (): Promise<ImagePicker.ImagePickerResult> => {
    return await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
  };

export const scheduleNotification = async (target: Date, payload: Parking) => {
  let secondsDelta = differenceInSeconds(target, new Date());

  if (secondsDelta <= 0) {
    return;
  }

  // If notification is being scheduled earlier than 15 minutes, default to 1 min
  if (secondsDelta > 0 && secondsDelta < 15 * 60) {
    secondsDelta = 60;
  } else {
    secondsDelta = secondsDelta - 15 * 60;
  }

  console.log(`Seconds until notification gets triggered: ${secondsDelta}`);

  const schedulingOptions = {
    content: {
      title: "Ticket is expiring",
      body: `Your parking expires at ${humanReadableTime(target.getTime())}!`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
      color: "blue",
      data: payload,
    },
    trigger: {
      seconds: secondsDelta,
    },
  };

  Notifications.scheduleNotificationAsync(schedulingOptions);
};

export const getLocalDateTime = (
  year: string,
  month: string,
  day: string,
  hours: string,
  minutes: string
): Date => {
  const tz = new Date().getTimezoneOffset() / -60;
  const delta = tz >= 0 ? "+" : "-";
  const datetime = new Date(
    `${year}-${month}-${day}T${hours}:${minutes}:00${delta}${padd(tz)}:00`
  );

  return datetime;
};
