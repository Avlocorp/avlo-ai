import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "store/index.ts";
import "services/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Suspense fallback="...loading">
    <Provider store={store}>
      <App />
    </Provider>
  </React.Suspense>
);
