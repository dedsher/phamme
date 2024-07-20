import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { theme } from "./theme.ts";
import router from "./routes.tsx";
import { store } from "./store/store.ts";
import { SocketProvider } from "@shared/sockets/socketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
