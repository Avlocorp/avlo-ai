import { useState } from "react";
import VerificationForm from "./components/form/verificationForm";
import LoginForm from "services/api/auth/login-form/login-form.tsx";
import RegistrationForm from "services/api/auth/registration-form";



export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showVerification, setShowVerification] = useState(false);

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
        setShowVerification(false);
    };
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
