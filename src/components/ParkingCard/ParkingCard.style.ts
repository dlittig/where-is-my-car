import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  icons: {
    width: 16,
    height: 16,
    marginRight: 6,
    textAlignVertical: "bottom",
  },
  mapContainer: {
    marginTop: 20,
  },
  parkingName: {
    marginHorizontal: 16,
    marginVertical: 14,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginVertical: 24,
  },
  alignRight: {
    textAlign: "center",
  },
  detailsItems: {
    flex: 1,
  },
  container: {
    marginVertical: 10,
    marginBottom: 10,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: -8,
    paddingRight: 8,
  },
  paidButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 24,
  },
});

export default style;
