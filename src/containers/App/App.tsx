import React, { useState } from "react";

import * as eva from "@eva-design/eva";
import { Provider } from "react-redux";
import "react-native-get-random-values";
import { StatusBar } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NotifierWrapper } from "react-native-notifier";
import { PersistGate } from "redux-persist/integration/react";
import { MD3DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import i18n from "../../translations/i18n";
import Intro from "../../components/Intro";
import Navigator from "../../components/Navigator";
import { persistor, store } from "../../store/Store";
import RenderConditionally from "../../components/RenderConditionally";
import NotificationListener from "../../components/NotificationListener";
import { CombinedDarkTheme } from "../../utils/theme";

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
        <PaperProvider theme={CombinedDarkTheme}>
          <AppThemeContext.Provider value={{ theme, toggleTheme }}>
            <ApplicationProvider {...eva} theme={getEvaTheme()}>
              <NotificationListener />
              <NotifierWrapper>
                <IconRegistry icons={EvaIconsPack} />
                <StatusBar animated backgroundColor={"#000"} />
                <RenderConditionally truthy={<Navigator />} falsy={<Intro />} />
              </NotifierWrapper>
            </ApplicationProvider>
          </AppThemeContext.Provider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
