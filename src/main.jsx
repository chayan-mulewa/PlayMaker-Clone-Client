import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import { ANTDESIGN_THEME } from "./config";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={ANTDESIGN_THEME}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
