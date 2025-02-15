import { Modal, Form, Button, Typography, ConfigProvider, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import BitrixIcon from "assets/images/bitrix.jpg";

interface BitrixIntegrationAddAccModalProps {
    isOpen: boolean;
    onClose: () => void;
    onIntegrate: (values: IntegrationFormValues) => void;
}

interface IntegrationFormValues {
    url: string;
}

const BitrixAddAccountModal: React.FC<BitrixIntegrationAddAccModalProps> = ({
    isOpen,
    onClose,
    onIntegrate,
}) => {
    const [form] = Form.useForm();
    const { Text } = Typography;

    const handleFinish = (values: IntegrationFormValues) => {
        onIntegrate(values);
        form.resetFields(); // Formani tozalash
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
                        Add
                    </Button>
                </div>
            ]}
            width={400}
            centered
            styles={{
                content: { backgroundColor: "#2D2D2D", borderRadius: "12px" },
                header: { backgroundColor: "#2D2D2D", borderBottom: "none", paddingBottom: 0 },
                footer: { backgroundColor: "#2D2D2D", borderTop: "none" },
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
                <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginTop: "24px" }}>
                    <Form.Item
                        name="url"
                        label={<Text style={{ color: "#fff" }}>Site URL</Text>}
                        rules={[{ required: true, message: "Please enter your Bitrix24 site URL" }]}
                    >
                        <Input placeholder="Enter your Bitrix24 site URL" />
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

export default BitrixAddAccountModal;
