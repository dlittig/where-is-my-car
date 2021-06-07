import React from "react";
import { StyleSheet, Text } from "react-native";

import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import TopNavigation from "../../components/TopBar/TopBar";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { persistor, store } from "../../store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <IconRegistry icons={EvaIconsPack} />
          <TopNavigation />
          <Layout style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
          </Layout>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
