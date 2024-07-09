import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { ConfigProvider } from "antd";
import { theme } from "./theme.ts";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { Provider } from "react-redux";
import { store } from "@store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
