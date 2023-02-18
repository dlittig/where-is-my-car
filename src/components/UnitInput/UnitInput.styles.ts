import { StyleSheet } from "react-native";
import { CombinedDarkTheme } from "../../utils/theme";

const style = StyleSheet.create({
  modal: {
    margin: 10,
    padding: 20,
    backgroundColor: CombinedDarkTheme.colors.background,
  },
  modalTitle: {
    marginBottom: 8,
  },
});

export default style;
