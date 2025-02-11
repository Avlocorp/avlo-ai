import { Button, Form } from "antd";
import InputField from "pages/Login/components/inputField";

import { RegistrResponse } from "../Auth.types";
import { useRegistrMutation } from "../Auth.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




export default function RegistrationForm() {
    const [registerPost] = useRegistrMutation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const onsubmit = async (data: RegistrResponse) => {
        console.log(data)
        try {
            const response = await registerPost(data).unwrap();
            console.log(response);
            navigate("/login");
            setIsLogin(true);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Form
            name="register"
            onFinish={onsubmit}
            layout="vertical"
            className="text-white"
        >
            <div>
                <p className="text-white text-[22px] flex items-center justify-center my-2 pb-4">Enter your data to register</p>
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
                    Registration
                </Button>
            </Form.Item>
        </Form>
    )
};