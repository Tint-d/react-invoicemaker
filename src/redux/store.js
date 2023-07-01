import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import dashboardReducer from "./dashboard";
import productReducer from "./productSlice";
import invoiceReducer from "./invoiceSlice";
import clientReducer from "./client";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const reducer = combineReducers({
  Dashboard: dashboardReducer,
  Product: productReducer,
  Invoice: invoiceReducer,
  Client: clientReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
