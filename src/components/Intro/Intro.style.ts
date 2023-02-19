import { StyleSheet } from "react-native";
import { CombinedDarkTheme } from "../../utils/theme";

const style = StyleSheet.create({
  mainAction: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  mainActionButton: {
    width: "45%",
  },
  mainView: {
    backgroundColor: CombinedDarkTheme.colors.background,
  },
});

export default style;
