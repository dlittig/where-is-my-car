import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: -24,
    marginBottom: 8,
  },
  cardContent: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  icons: {
    width: 16,
    height: 16,
    marginRight: 6,
    textAlignVertical: "bottom",
  },
  chip: {
    marginHorizontal: 4,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  footer: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
  detailsContainer: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  cardTitle: {
    width: "65%",
  },
  cardAction: {
    position: "absolute",
    bottom: 0,
    right: 16,
  },
  parkedHint: {
    marginTop: 24,
  },
  parkedValue: {
    marginTop: 8,
    fontSize: 16,
  },
  imageGallery: {
    marginHorizontal: 16,
  },
});

export default style;
