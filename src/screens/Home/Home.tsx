import React, { FC } from "react";
import { Tab, TabBar } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Recent from "../Recent";
import History from "../History";
import { HomeComponentType } from "./types";
import { APP_HISTORY, APP_RECENT } from "../../components/Navigator/Routes";

import style from "./Home.style";
import BaseLayout from "../../components/BaseLayout";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar: FC<HomeComponentType> = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    //indicatorStyle={style.tabBar}
  >
    {state.routeNames.map((routeName, index) => (
      <Tab key={`tab-${routeName}-${index}`} title={routeName} />
    ))}
  </TabBar>
);

const Home = () => {
  const { t } = useTranslation();

  return (
    <BaseLayout level="1">
      <Navigator tabBar={(props) => <TopTabBar {...props} />}>
        <Screen name={t(APP_RECENT)} component={Recent} />
        <Screen name={t(APP_HISTORY)} component={History} />
      </Navigator>
    </BaseLayout>
  );
};

export default Home;
