import { Modal, Form, Input, Button, Typography, ConfigProvider } from "antd";
import { CopyOutlined, CloseOutlined } from "@ant-design/icons";
import BitrixIcon from "assets/images/bitrix.jpg";

interface BitrixIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIntegrate: (values: IntegrationFormValues) => void;
}

interface IntegrationFormValues {
  login: string;
  password: string;
  token: string;
}

const BitrixIntegrationModal: React.FC<BitrixIntegrationModalProps> = ({
  isOpen,
  onClose,
  onIntegrate,
}) => {
  const [form] = Form.useForm();
  const { Text } = Typography;

  const handleCopyToken = () => {
    const token = form.getFieldValue("token");
    navigator.clipboard.writeText(token);
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={BitrixIcon}
            alt="Bitrix"
            width={84}
            height={52}
            className="rounded-lg"
          />
          <span className="text-white">Bitrix24 integration process</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      closeIcon={<CloseOutlined className="text-white" />}
      footer={[
        <Button key="cancel" onClick={onClose} style={{ width: "100%" }}>
          Cancel
        </Button>,
        <Button
          key="integrate"
          type="primary"
          onClick={() => form.submit()}
          style={{ width: "100%", marginLeft: 0, marginTop: "8px" }}
        >
          Integrate
        </Button>,
      ]}
      width={400}
      centered
      styles={{
        content: {
          backgroundColor: "#2D2D2D",
          borderRadius: "12px",
        },
        header: {
          backgroundColor: "#2D2D2D",
          borderBottom: "none",
          paddingBottom: 0,
        },
        footer: {
          backgroundColor: "#2D2D2D",
          borderTop: "none",
        },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: "#1a1a1d",
          },
          components: {
            Input: {
              colorPrimary: "#1a1a1d",
              algorithm: true,
              colorTextPlaceholder: "#ffffff8a",
              colorTextBase: "#ffffff",
            },
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onIntegrate}
          style={{ marginTop: "24px" }}
        >
          <Form.Item
            name="login"
            label={<Text style={{ color: "#fff" }}>Login</Text>}
            rules={[{ required: true, message: "Please input your login" }]}
          >
            <Input placeholder="Muhammad@gmail.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<Text style={{ color: "#fff" }}>Password</Text>}
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="token"
            label={<Text style={{ color: "#fff" }}>Token</Text>}
            rules={[{ required: true, message: "Please input your token" }]}
          >
            <Input
              placeholder="jfoijjer58209uueiafaiffjdfjkhdjlha"
              suffix={
                <Button
                  type="primary"
                  icon={<CopyOutlined />}
                  onClick={handleCopyToken}
                  style={{ marginRight: "-7px" }}
                  className="!shadow-none"
                >
                  Copy
                </Button>
              }
            />
          </Form.Item>

          <Text style={{ color: "#8C8C8C", fontSize: "14px" }}>
            Go to the settings of your Bitrix24 account, navigate to the
            "Integrations" or "Webhooks" section, and copy the generated token
            to use in this field.
          </Text>
        </Form>
      </ConfigProvider>
    </Modal>
  );
};

export default BitrixIntegrationModal;
