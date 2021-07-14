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

i18n;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <IconRegistry icons={EvaIconsPack} />
          <StatusBar animated backgroundColor={"#000"} />
          <Navigator />
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}
