import { combineReducers, createStore, Store } from "redux";
import {
  persistStore,
  // createMigrate,
  persistReducer,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers, { RootReducerType } from "./reducers"; // , { RootReducerType }
import { SettingsState } from "./reducers/settingsReducer";
// import { SettingsState } from "./reducers/settingsReducer";

const migrations = {};

const persistConfig = {
  key: "where_is_my_car",
  version: 0, // key has to match the version specified in the migration above
  storage: ExpoFileSystemStorage,
  // migrate: createMigrate(migrations, { debug: true }),
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

// const initialState: RootReducerType = {
//   parkingsReducer: { parkings: {} },
//   settingsReducer: {} as SettingsState,
// };

const store: Store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
