import React from "react";
import RoutesWrapper from "./routes";
import "./App.css";
import { ConfigProvider, theme as antdTheme } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "services/contexts/ThemeContext";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      <RoutesWrapper />
    </ConfigProvider>
  );
};

export default App;
