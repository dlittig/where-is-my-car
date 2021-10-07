import { combineReducers, createStore, Store } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers from "./reducers";
import { decodeDates, encodeDates } from "./transformer";

const persistConfig = {
  key: "where_is_my_car",
  version: 0, // key has to match the version specified in the migration above
  storage: ExpoFileSystemStorage,
  blacklist: ["appReducer"],
  transforms: [createTransform(encodeDates, decodeDates)],
};

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     parkingsReducer: persistReducer(
//       {
//         key: "parkingsReducer",
//         storage: ExpoFileSystemStorage,
//         blacklist: ["search", "currentLimit"],
//       },
//       Reducers.RootReducer.parkingsReducer
//     ),
//     settingsReducer: Reducers.RootReducer.settingsReducer,
//   })
// );

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

const store: Store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
