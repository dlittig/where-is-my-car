import { Parking } from "../store/types";
import * as Location from "expo-location";
import { ToastAndroid } from "react-native";
import { differenceInSeconds } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { showLocation } from "react-native-map-link";
import { NOTIFICATION_KIND } from "../components/NotificationListener/types";

export const humanReadableDate = (time: number): string => {
  const date: Date = new Date(time);
  return `${padd(date.getDate())}.${padd(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
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

export const enableLocation = async () => {
  await Location.enableNetworkProviderAsync();
  return null;
};

export const acquireLocation =
  async (): Promise<Location.LocationObject | null> => {
    try {
      if (await Location.hasServicesEnabledAsync()) {
        return await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.Highest,
        });
      } else {
        showToast(`Location service is not enabled.`);
        return null;
      }
    } catch (e) {
      // TODO: Reevalute https://github.com/expo/expo/issues/14248
      showToast(`Location could not be acquired.`);
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
    showToast("An error occured when asking for location permission");
    return false;
  }

  if (locationStatus !== Location.PermissionStatus.GRANTED) {
    console.warn(`Location permission was not granted: ${locationStatus}`);
    showToast(`Location permission was not granted: ${locationStatus}`);
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

  if (imagePickerStatus !== ImagePicker.PermissionStatus.GRANTED) {
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

export const scheduleExpirationNotification = async (
  target: Date,
  payload: Parking
): Promise<string | undefined> => {
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

  const schedulingOptions = {
    content: {
      title: "Ticket is expiring",
      body: `Your parking expires at ${humanReadableTime(target.getTime())}!`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
      color: "blue",
      data: {
        type: NOTIFICATION_KIND.EXPIRE,
        payload,
      },
    },
    trigger: {
      seconds: secondsDelta,
    },
  };

  return await Notifications.scheduleNotificationAsync(schedulingOptions);
};

export const scheduleCreationNotification = async (payload: Parking) => {
  const schedulingOptions = {
    content: {
      title: "Car parked",
      body: `Top to navigate.`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.LOW,
      color: "#666",
      data: {
        type: NOTIFICATION_KIND.CREATE,
        payload,
      },
    },
    trigger: null,
  };

  Notifications.scheduleNotificationAsync(schedulingOptions);
};

export const cancelNotification = async (id: string) => {
  await Notifications.cancelScheduledNotificationAsync(id);
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

export const showToast = (text: string) => {
  ToastAndroid.showWithGravityAndOffset(
    text,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    100
  );
};

export const routeToLocation = (latitude: number, longitude: number) => {
  showLocation({
    latitude,
    longitude,
    dialogTitle: "Navigate to your parking", // optional (default: 'Open in Maps')
    dialogMessage: "What app would you like to use?", // optional (default: 'What app would you like to use?')
    cancelText: "Cancel", // optional (default: 'Cancel')
    naverCallerName: "de.dlittig.whereismycar", // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
  });
};

export const searchFilter = (value: Parking, state: string) => {
  if (state.length === 0) return true;

  return (
    value.notes.toLowerCase().includes(state.toLowerCase()) ||
    value.name.toLowerCase().includes(state.toLowerCase())
  );
};
