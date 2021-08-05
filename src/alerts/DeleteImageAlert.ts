import { Alert } from "react-native";

export const deleteImageAlert = (successAction: () => any) => {
  Alert.alert(
    "Delete image",
    `Are you sure you want to delete this image?`,
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
