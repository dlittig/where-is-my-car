import React from "react";
import { Text } from "@ui-kitten/components";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import MainAction from "../../components/MainAction";
import List from "../../components/List";
import MapView from "../../components/MapView";
import { MAP_VIEW_SIZE } from "../../components/MapView/types";

const Recent = () => (
  <BaseLayout level={"2"}>
    <List spacer>
      <MapView size={MAP_VIEW_SIZE.CARD} />
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List</Text>
      <Text>Recent List x</Text>
    </List>
    <MainAction />
  </BaseLayout>
);

export default Recent;
