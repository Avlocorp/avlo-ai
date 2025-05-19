import type React from "react";
import RoutesWrapper from "./routes";
import "./App.css";
import { ConfigProvider } from "antd";
// import { theme } from "lib/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <ConfigProvider
    //  theme={theme}
    >
      <ToastContainer position="top-right" autoClose={5000} />

      <RoutesWrapper />
    </ConfigProvider>
  );
};

export default App;
