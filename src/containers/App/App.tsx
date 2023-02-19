import React, { useState } from "react";

import { Provider } from "react-redux";
import "react-native-get-random-values";
import { StatusBar } from "react-native";
import { NotifierWrapper } from "react-native-notifier";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";

import i18n from "../../translations/i18n";
import Intro from "../../components/Intro";
import Navigator from "../../components/Navigator";
import { persistor, store } from "../../store/Store";
import { CombinedDarkTheme } from "../../utils/theme";
import RenderConditionally from "../../components/RenderConditionally";
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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={CombinedDarkTheme}>
          <AppThemeContext.Provider value={{ theme, toggleTheme }}>
            <NotificationListener />
            <NotifierWrapper>
              <StatusBar animated backgroundColor={"#000"} />
              <RenderConditionally truthy={<Navigator />} falsy={<Intro />} />
            </NotifierWrapper>
          </AppThemeContext.Provider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
