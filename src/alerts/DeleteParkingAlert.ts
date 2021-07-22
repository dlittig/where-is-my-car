import { Alert } from "react-native";

export const deleteParkingAlert = (parkingName: string, successAction: () => any) => {
  Alert.alert(
    "Delete parking",
    `Are you sure you want to delete parking "${parkingName}"?`,
    [
      {
        text: "Cancel",
        onPress: () => undefined,
        style: "cancel",
      },
      {
        text: "Okay",
        onPress: successAction,
      },
    ],
    { cancelable: false }
  );
};
