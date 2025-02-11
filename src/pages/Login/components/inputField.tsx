import { Form } from "antd";

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
}

export default function InputField({ name, label, type = "text", required = false }: InputFieldProps) {
    return (
        <Form.Item
            name={name}
            label={<span className="text-white">{label}</span>}
            rules={required ? [{ required: true, message: `Please input your ${label.toLowerCase()}!` }] : []}
        >
            <input
                type={type}
                className="w-full bg-[#1A1A1D] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-0"
            />
        </Form.Item>
    );
}
