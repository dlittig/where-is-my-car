import * as Location from "expo-location";
import { showLocation } from "react-native-map-link";
import { showToast } from "./ui";

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
