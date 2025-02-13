import { Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import InputField from "pages/Login/components/inputField";
import { LoginResponse, ResponseError } from "../../../../services/api/auth/Auth.types";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../services/api/auth/Auth";
import { useLoginMutation } from "../../../../services/api/auth/Auth.api";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
    const [loginPost] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const onSubmit = async (data: LoginResponse) => {
        try {
            const response = await loginPost(data).unwrap();
            dispatch(
                logIn({
                    access: response.access,
                    refresh: response.refresh,
                })
            );

            navigate("/");
        } catch (error) {
            const err = error as ResponseError;
            message.error(err.error_description || "Login failed. Please try again.");
            console.error("Login Error:", err);
        }
    };

    return (
        <Form name="login" onFinish={onSubmit} layout="vertical" className="space-y-4">
            <div>
                <p className="text-white text-[22px] flex items-center justify-center my-2 pb-2">
                    {t("Enter your data to login")}
                </p>
            </div>
            <InputField name="username" label="Username" required />
            <InputField name="password" label="Password" type="password" required />
            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    {t("Enter")}
                </Button>
            </Form.Item>
        </Form>
    );
}
