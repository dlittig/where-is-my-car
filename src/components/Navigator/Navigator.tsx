import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import Home from "../../screens/Home";
import LocationEdit from "../../screens/Location/Edit";
import LocationView from "../../screens/Location/View";
import Map from "../../screens/Map";
import Settings from "../../screens/Settings";
import {
  APP_HOME,
  APP_LOCATION_EDIT,
  APP_LOCATION_VIEW,
  APP_MAP,
  APP_SETTINGS,
} from "./Routes";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  transitionSpec: {
    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
};

const Navigator: FC = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={t(APP_HOME)}>
        <Stack.Screen name={t(APP_HOME)} options={options} component={Home} />
        <Stack.Screen
          name={t(APP_LOCATION_EDIT)}
          options={options}
          component={LocationEdit}
        />
        <Stack.Screen
          name={t(APP_LOCATION_VIEW)}
          options={options}
          component={LocationView}
        />
        <Stack.Screen name={t(APP_MAP)} options={options} component={Map} />
        <Stack.Screen
          name={t(APP_SETTINGS)}
          options={options}
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
