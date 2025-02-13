import { useState } from "react";
import VerificationForm from "./components/form/verificationForm";
import LoginForm from "pages/Login/components/login-form/login-form";
import RegistrationForm from "./components/registration-form";
import { useTranslation } from "react-i18next";



export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showVerification, setShowVerification] = useState(false);

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
        setShowVerification(false);
    };
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A1A1D]">
            <div className="bg-[#2A2A2D] p-8 rounded-lg shadow-md w-full max-w-md">
                {isLogin ? (
                    <LoginForm />
                ) : showVerification ? (
                    <VerificationForm />
                ) : (
                    <RegistrationForm onSuccess={() => { setIsLogin(true) }} />
                )}

                <div className="text-center mt-4">
                    {isLogin ? (
                        <p className="text-gray-400">
                            {t("Don't have an account?")}{" "}
                            <button
                                onClick={handleToggleForm}
                                className="text-blue-500 hover:underline"
                            >
                                {t("Sign up")}
                            </button>
                        </p>
                    ) : (
                        <p className="text-gray-400">
                            {t("Already have an account?")}{" "}
                            <button
                                onClick={handleToggleForm}
                                className="text-blue-500 hover:underline"
                            >
                                {t("Sign in")}
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
