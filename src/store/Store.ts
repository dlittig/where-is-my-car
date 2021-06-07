import { createStore } from "redux";
import {
  persistStore,
  persistCombineReducers,
  createMigrate,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers, { RootReducerType } from "./reducers";
import { SettingsState } from "./reducers/settingsReducer";

const migrations = {};

const persistConfig = {
  key: "where_is_my_car",
  version: 0, // key has to match the version specified in the migration above
  storage: ExpoFileSystemStorage,
  // migrate: createMigrate(migrations, { debug: true }),
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const initialState: RootReducerType = {
  parkingsReducer: { parkings: {} },
  settingsReducer: {} as SettingsState,
};

const store = createStore(persistedReducer, initialState);
const persistor = persistStore(store);

export { store, persistor };
