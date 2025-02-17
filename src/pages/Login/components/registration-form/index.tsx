import { Button, Form } from "antd";
import InputField from "pages/Login/components/inputField";
import { useTranslation } from "react-i18next";
import { useRegistrMutation } from "services/api/auth/Auth.api";
import { RegistrResponse } from "services/api/auth/Auth.types";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
interface RegistrationFormProps {
    onSuccess: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
    const [registerPost] = useRegistrMutation();


    const onsubmit = async (data: RegistrResponse) => {
        // console.log(data);
        try {
            const response = await registerPost(data).unwrap();
            console.log(response);
            onSuccess();
        } catch (error: any) {
            const err = Object.values(error).join(" ");
            // Xatolik xabarini chiqarish
            toast.error(err)
        }
    };

    const { t } = useTranslation();
    return (
        <Form
            name="register"
            onFinish={onsubmit}
            layout="vertical"
            className="text-white"
        >
            <div>
                <p className="text-white text-[22px] flex items-center justify-center my-2 pb-4">
                    {t("Enter your data to register")}
                </p>
            </div>
            <InputField name="first_name" label="First Name" required />
            <InputField name="last_name" label="Last Name" />
            <InputField name="phone_number" label="Phone" required />
            <InputField name="email" label="Email" type="email" required />
            <InputField name="username" label="Username" required />
            <InputField name="password" label="Password" type="password" required />
            <InputField name="confirm_password" label="Confirm Password" type="password" required />
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                >
                    {t("Registration")}
                </Button>
            </Form.Item>
        </Form>
    );
}
