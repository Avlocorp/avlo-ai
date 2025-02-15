import { Modal, Form, Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
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

  // const handleCopyToken = () => {
  //   const token = form.getFieldValue("token");
  //   navigator.clipboard.writeText(token);
  // };

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
        <div className="flex justify-between gap-2 items-center">

          <Button key="cancel" onClick={onClose} style={{ width: "100%" }}>
            Cancel
          </Button>
          <Button
            key="integrate"
            type="primary"
            onClick={() => form.submit()}
            style={{ width: "100%" }}
          >
            Integrate
          </Button>
        </div>
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


      <Form
        form={form}
        layout="vertical"
        onFinish={onIntegrate}
        style={{ marginTop: "24px" }}
      >
        <Form.Item
          name="accountType"
          label={<Text style={{ color: "#fff" }}>Select Account Type</Text>}
          rules={[{ required: true, message: "Please select an account type" }]}
        >
          <select
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
              backgroundColor: "#2D2D2D",
              color: "#fff",
            }}
          >
            <option value="" className="text-[#8C8C8C]" disabled selected hidden>
              Select an account type
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">SuperUser</option>
          </select>

        </Form.Item>

        <Text style={{ color: "#8C8C8C", fontSize: "14px" }}>
          Go to the settings of your Bitrix24 account, navigate to the
          "Integrations" or "Webhooks" section, and copy the generated token
          to use in this field.
        </Text>
      </Form>

    </Modal>
  );
};

export default BitrixIntegrationModal;
