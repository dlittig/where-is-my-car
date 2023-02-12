import React from "react";
import { useTranslation } from "react-i18next";
import { BottomNavigation } from "react-native-paper";

import Recent from "../Recent";
import History from "../History";
import TopBar from "../../components/Navigator/Bars/TopBar";
import { APP_HISTORY, APP_RECENT } from "../../components/Navigator/Routes";

const Home = () => {
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "recent",
      title: t(APP_RECENT),
      focusedIcon: "calendar-today",
    },
    { key: "history", title: t(APP_HISTORY), focusedIcon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    recent: Recent,
    history: History,
  });

  return (
    <>
      <TopBar />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default Home;
