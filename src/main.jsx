import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { DownloadRefProvider } from "./context/Context";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <DownloadRefProvider>
        <App />
      </DownloadRefProvider>
    </PersistGate>
  </Provider>
);

