import { Button, Form, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function VerificationForm() {
    const [loading, setLoading] = useState(false);

    const onVerificationFinish = async (values: { verificationCode: string }) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);

        if (values.verificationCode === "123456") {
            message.success("Verification successful");
        }
    };

    const { t } = useTranslation();
    return (
        <Form
            name="verification"
            onFinish={onVerificationFinish}
            layout="vertical"
            className="space-y-4"
        >

            <Form.Item
                name="verificationCode"
                label={<span className="text-white">{t("Verification Code")}</span>}
            >
                <input
                    className="w-full bg-[#1A1A1D] border border-[#333] text-[20px] rounded-lg px-4 py-1 text-white focus:outline-none focus:ring-0 text-center tracking-widest"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full"
                >
                    {t("Verify")}
                </Button>
            </Form.Item>

        </Form>
    )
}

