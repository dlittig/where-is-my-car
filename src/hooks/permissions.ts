import { useEffect, useState } from "react";

import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

import { CONFIGURATION } from "../config";
import { acquireLocation } from "../utils";

export const useLocation = (delay = true) => {
  const [location, setLocation] = useState<Location.LocationObject>({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  } as Location.LocationObject);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    (async () => {
      const executor = async () => {
        const location = await acquireLocation();

        if (location !== null) {
          setLocation(location);
        } else {
          setError("Failed to acquire location");
        }
      };

      if (delay) {
        timeout = setTimeout(executor, CONFIGURATION.LOCATION_DELAY);
      } else {
        executor();
      }
    })();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

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
