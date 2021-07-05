import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  icons: {
    width: 16,
    height: 16,
    marginRight: 6,
    textAlignVertical: "bottom",
  },
  parkingName: {
    marginBottom: 6,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  alignRight: {
    textAlign: "center",
  },
  detailsItems: {
    flex: 1,
  },
});

export default style;
