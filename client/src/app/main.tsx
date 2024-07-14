import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { theme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./routes.tsx";
import { store } from "./store.ts";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
