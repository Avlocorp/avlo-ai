import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
}

export default function InputField({ name, label, type = "text", required = false }: InputFieldProps) {
    const { t } = useTranslation()
    return (
        <Form.Item
            name={name}
            label={<span className="">{t(label)}</span>}
            rules={required ? [{ required: true, message: t(`Please input your ${label.toLowerCase()}!`) }] : []}
        >
            {type === "password" ? (
                <Input.Password
                    className="w-full  border  rounded-lg px-4 py-2  focus:outline-none focus:ring-0"
                />
            ) : (
                <Input
                    type={type}
                    className="w-full  border  rounded-lg px-4 py-2  focus:outline-none focus:ring-0"
                />
            )}
        </Form.Item>
    );
}
