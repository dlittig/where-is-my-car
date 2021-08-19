import React from "react";
import { StatusBar, StyleSheet, Text } from "react-native";

import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { persistor, store } from "../../store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "../../translations/i18n";
import Navigator from "../../components/Navigator";
import "react-native-get-random-values";
import { useState } from "react";
import RenderConditionally from "../../components/RenderConditionally";
import Intro from "../../components/Intro";
import NotificationListener from "../../components/NotificationListener";

i18n;

export const AppThemeContext = React.createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export default function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const getEvaTheme = () => (theme === "light" ? eva.light : eva.dark);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider {...eva} theme={getEvaTheme()}>
            <NotificationListener />
            <IconRegistry icons={EvaIconsPack} />
            <StatusBar animated backgroundColor={"#000"} />
            <RenderConditionally truthy={<Navigator />} falsy={<Intro />} />
          </ApplicationProvider>
        </AppThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
}
