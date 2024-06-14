import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";
import { ConfigProvider } from "antd";
import { theme } from "./theme.ts";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
