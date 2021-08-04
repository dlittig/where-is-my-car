import { combineReducers, createStore, Store } from "redux";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers from "./reducers";

const persistConfig = {
  key: "where_is_my_car",
  version: 0, // key has to match the version specified in the migration above
  storage: ExpoFileSystemStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

const store: Store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
