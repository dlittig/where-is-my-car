import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

const LOCATION = {
  ERROR_PERMISSION: "Permission to access location was denied",
  ERROR_ACQUIRING: "Failed to acquire location",
};

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  } as Location.LocationObject);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      let locationStatus;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        locationStatus = status;
      } catch (e) {
        setError(LOCATION.ERROR_PERMISSION);
      }

      if (locationStatus !== "granted") {
        setError(LOCATION.ERROR_PERMISSION);
        return;
      }

      await acquireLocation();
    })();
  }, []);

  const acquireLocation = async () => {
    try {
      setError("");
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Highest,
      });
      setLocation(location);
    } catch (e) {
      setError(LOCATION.ERROR_ACQUIRING);
    }
  };

  return {
    location,
    error,
    acquireLocation,
  };
};

const CAMERA_ROLL = {
  ERROR_PERMISSION: "Permission to access location was denied",
};

export const useCameraRoll = () => {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      let cameraStatus;

      try {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        cameraStatus = status;
      } catch (e) {
        setError(CAMERA_ROLL.ERROR_PERMISSION);
      }

      if (cameraStatus !== "granted") {
        setError(CAMERA_ROLL.ERROR_PERMISSION);
      }
    })();
  }, []);

  return {
    error,
  };
};
