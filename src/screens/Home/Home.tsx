import React, { useState } from "react";
import { Tab, TabBar } from "@ui-kitten/components";

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <Tab title="USERS" />
      <Tab title="ORDERS" />
      <Tab title="TRANSACTIONS" />
    </TabBar>
  );
};

export default Home;
