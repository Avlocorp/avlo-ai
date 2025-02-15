import { Result, Typography, Button, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { CloudAlert } from "lucide-react";

const { Text, Title } = Typography;

const DashboardError = () => {
  return (
    <Result
      icon={<CloudAlert />}
      title={
        <Title level={2} style={{ color: "#ff4d4f" }}>
          Oops! Something went wrong
        </Title>
      }
      extra={
        <Space direction="vertical" size="large" align="center">
          <Text
            type="secondary"
            style={{ fontSize: "16px", maxWidth: "400px", textAlign: "center" }}
          >
            We encountered an error. Don't worry, our team has been notified and
            is working on fixing it.
          </Text>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            size="large"
            className="shadow-none bg-[#3A3A41]"
          >
            Retry
          </Button>
        </Space>
      }
      rootClassName="[&_.ant-result-icon]:flex [&_.ant-result-icon]:justify-center"
    />
  );
};

export default DashboardError;
