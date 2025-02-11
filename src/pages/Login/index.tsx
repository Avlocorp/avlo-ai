import { useState } from "react";
import { Form, Button, message } from "antd";
import UzbekPhoneInput from "./components/uzbekPhoneNumber";
import InputField from "./components/inputField";
import { useDispatch, useSelector } from "react-redux";
import { login } from "services/api/auth/Auth.Slice";
import { AppDispatch } from "store"; // Adjust the import path as necessary
import useHooks from "../../hooks/useHooks";
import axios from "axios";

export default function AuthPage() {
    const { navigate } = useHooks();
    const [isLogin, setIsLogin] = useState(true);
    const [showVerification, setShowVerification] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
        setShowVerification(false);
    };


    const onRegisterFinish = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        message.success("Verification code sent to your Telegram");
        setShowVerification(true);
    };

    const onVerificationFinish = async (values: { verificationCode: string }) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);

        if (values.verificationCode === "123456") {
            message.success("Verification successful");
            setIsLogin(true);
            setShowVerification(false);
        } else {
            message.error("Invalid verification code");
        }
    };

    const LoginForm = () => {
        const dispatch = useDispatch<AppDispatch>()
        const { loading, error } = useSelector((state: any) => state.auth)

        // const onLoginFinish = (values: { username: string; password: string }) => {
        //     try {
        //         const resultAction = dispatch(login(values))
        //         if (login.fulfilled.match(resultAction)) {
        //             navigate("/")
        //         }
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        // }
        // https://avlo.ai
        //     / api / token /? username = admin & password=admin

        const onLoginFinish = async (values: { username: string; password: string }) => {
            setLoading(true);
            try {
                const response = await axios.post("https://avlo.ai/api/token/", values);
                const data = response.data;

                if (data.token) {
                    dispatch(login(values));

                    message.success("Login successful!");
                    navigate("/");
                }
            } catch (error) {
                message.error("Login yoki parol xato!");
                console.error("Login error:", error);
            } finally {
                setLoading(false);
            }
        };

        return (
            <Form name="login" onFinish={onLoginFinish} layout="vertical" className="space-y-4">
                <div>
                    <p className="text-white text-[22px] flex items-center justify-center my-2 pb-2">Enter your data to login</p>
                </div>
                <InputField name="username" label="Username" required />
                <InputField name="password" label="Password" type="password" required />
                {error && <div className="text-red-500">{error}</div>}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        Enter
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    const RegistrationForm = () => (
        <Form
            name="register"
            onFinish={onRegisterFinish}
            layout="vertical"
            className="text-white"
        >
            <div>
                <p className="text-white text-[22px] flex items-center justify-center my-2 pb-4">Enter your data to register</p>
            </div>
            <InputField name="firstname" label="First Name" required />
            <InputField name="lastname" label="Last Name" />
            <Form.Item
                name="phone"
                label={<span className="text-white">Phone</span>}
                rules={[{ required: true, message: "Please input your phone number!" }]}
            >
                <UzbekPhoneInput />
            </Form.Item>
            <InputField name="email" label="Email" type="email" required />
            <InputField name="username" label="Username" required />
            <InputField name="password" label="Password" type="password" required />
            <InputField name="confirmPassword" label="Confirm Password" type="password" required />
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full"
                >
                    Registration
                </Button>
            </Form.Item>
        </Form>
    );



    const VerificationForm = () => (
        <Form
            name="verification"
            onFinish={onVerificationFinish}
            layout="vertical"
            className="space-y-4"
        >

            <Form.Item
                name="verificationCode"
                label={<span className="text-white">Verification Code</span>}
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
                    Verify
                </Button>
            </Form.Item>

        </Form>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A1A1D]">
            <div className="bg-[#2A2A2D] p-8 rounded-lg shadow-md w-full max-w-md">
                {isLogin ? (
                    <LoginForm />
                ) : showVerification ? (
                    <VerificationForm />
                ) : (
                    <RegistrationForm />
                )}

                <div className="text-center mt-4">
                    {isLogin ? (
                        <p className="text-gray-400">
                            Don't have an account?{" "}
                            <button
                                onClick={handleToggleForm}
                                className="text-blue-500 hover:underline"
                            >
                                Sign up
                            </button>
                        </p>
                    ) : (
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <button
                                onClick={handleToggleForm}
                                className="text-blue-500 hover:underline"
                            >
                                Sign in
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
