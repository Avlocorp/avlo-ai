
import { useState } from "react"
import { Tabs, Form, Input, Button, message } from "antd"

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("login")
    const [showVerification, setShowVerification] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleTabChange = (key: string) => {
        setActiveTab(key)
        setShowVerification(false)
    }

    const onLoginFinish = async (values: { login: string; password: string }) => {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)

        // TODO: Implement actual login logic here
        if (values.login === "akbar" && values.password === "akbar") {
            message.success("Login successful")
            // Redirect to home page
            // window.location.href = '/home'
        } else {
            message.error("Invalid login or password")
        }
    }

    const onRegisterFinish = async () => {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)

        message.success("Verification code sent to your Telegram")
        setShowVerification(true)
    }

    const onVerificationFinish = async (values: { verificationCode: string }) => {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)

        // TODO: Implement actual verification logic here
        if (values.verificationCode === "123456") {
            message.success("Verification successful")
            setActiveTab("login")
            setShowVerification(false)
        } else {
            message.error("Invalid verification code")
        }
    }

    const LoginForm = () => (
        <Form name="login" onFinish={onLoginFinish} layout="vertical" className="space-y-4">
            <Form.Item
                name="login"
                label={<span className="text-white">Login</span>} // Label uchun oq rang
                rules={[{ required: true, message: "Please input your login!" }]}
            >
                <Input
                    className="!text-white bg-[#1A1A1D] border border-[#333] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#444]"
                    style={{ color: "white" }}
                />
            </Form.Item>

            <Form.Item
                name="password"
                label={<span className="text-white">Password</span>} // Label uchun oq rang
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password
                    className="!text-white bg-[#1A1A1D] border border-[#333] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#444]"
                    style={{ color: "white" }}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                    Kirish
                </Button>
            </Form.Item>
        </Form>
    );


    const RegistrationForm = () => (
        <Form name="register" onFinish={onRegisterFinish} layout="vertical" className="text-white">
            <Form.Item name="fullName" label="F.I.O" >
                <Input />
            </Form.Item>
            <Form.Item name="login" label="Login" rules={[{ required: true, message: "Please input your login!" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please input your phone number!" }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                    Ro'yxatdan o'tish
                </Button>
            </Form.Item>
        </Form>
    )

    const sharedProps = {
        maxLength: 6,
        style: { textTransform: 'uppercase' as 'uppercase' }
    }

    const VerificationForm = () => (
        <Form name="verification" onFinish={onVerificationFinish} layout="vertical" className="text-white">
            <Form.Item
                name="verificationCode"
                label="Verification Code"
                rules={[{ required: true, message: "Please input the verification code!" }]}
            >
                <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                    Verify
                </Button>
            </Form.Item>
        </Form>
    )

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A1A1D] ">
            <div className="bg-[#2A2A2D] p-8 rounded-lg shadow-md w-full max-w-md ">
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    centered
                    items={[
                        {
                            key: "login",
                            label: "Kirish",
                            children: <LoginForm />,
                        },
                        {
                            key: "register",
                            label: "Ro'yxatdan o'tish",
                            children: showVerification ? <VerificationForm /> : <RegistrationForm />,
                        },
                    ]}
                />
            </div>
        </div>
    )
}