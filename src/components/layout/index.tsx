import { Layout } from "antd";
import Sidebar from "components/layout/Sidebar";
import HeaderMain from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const LayoutComponent = () => {
  return (
    <Layout className="h-screen flex overflow-hidden">
      <Sidebar />
      <Layout className="flex-1">
        <HeaderMain />
        <Content className="overflow-auto min-h-[calc(100vh-78px)] bg-[#1A1A1D]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
