import type React from "react";
import RoutesWrapper from "./routes";
import "./App.css";
import { ConfigProvider } from "antd";
import { theme } from "lib/theme";
// analysisData

const App: React.FC = () => {
  return (
    <ConfigProvider theme={theme}>
      <RoutesWrapper />
    </ConfigProvider>
  );
};

export default App;
