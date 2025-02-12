import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#141414",
    colorTextBase: "#ffffff",
  },
  components: {
    Card: {
      colorBgContainer: "#1f1f1f",
      colorBorderSecondary: "#303030",
    },
    Table: {
      colorBgContainer: "#343436",
      colorBorderSecondary: "#303030",
      headerBg: "#2a2a2d",
      headerBorderRadius: 0,
    },
    Button: {
      colorPrimaryHover: "#40a9ff",
    },
    Tabs: {
      horizontalMargin: "0px",
      inkBarColor: "#5c9bec",
    },
  },
};
