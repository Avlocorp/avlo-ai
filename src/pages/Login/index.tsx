import { useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import VerificationForm from "./components/form/verificationForm";
import LoginForm from "pages/Login/components/login-form/login-form";
import RegistrationForm from "./components/registration-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "services/contexts/ThemeContext";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showVerification, setShowVerification] = useState(false);
    const { theme } = useTheme();
    const { t } = useTranslation();

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
        setShowVerification(false);
    };

    // Theme configuration for Ant Design
    const getThemeConfig = () => {
        if (theme === "dark") {
            return {
                algorithm: antdTheme.darkAlgorithm,
                token: {
                    colorPrimary: "#4338ca",
                    borderRadius: 8,
                    colorBgContainer: "#374151",
                    colorBgElevated: "#374151",
                    colorBgLayout: "#1f2937",
                    colorText: "#f3f4f6",
                    colorTextSecondary: "#9ca3af",
                    colorBorder: "#4b5563",
                },
            };
        }

        return {
            algorithm: antdTheme.defaultAlgorithm,
            token: {
                colorPrimary: "#4338ca",
                borderRadius: 8,
                colorBgContainer: "#ffffff",
                colorBgElevated: "#ffffff",
                colorBgLayout: "#f9fafb",
                colorText: "#111827",
                colorTextSecondary: "#6b7280",
                colorBorder: "#d1d5db",
            },
        };
    };

    const containerStyle = {
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
        color: theme === "dark" ? "#f3f4f6" : "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    };

    const cardStyle = {
        backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
        borderRadius: "12px",
        boxShadow: theme === "dark"
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        padding: "32px",
        width: "100%",
        maxWidth: "400px",
        border: theme === "dark" ? "1px solid #4b5563" : "1px solid #e5e7eb",
    };

    const toggleTextStyle = {
        textAlign: "center" as const,
        marginTop: "24px",
        color: theme === "dark" ? "#9ca3af" : "#6b7280",
    };

    const toggleLinkStyle = {
        color: "#4338ca",
        textDecoration: "none",
        fontWeight: "500",
        cursor: "pointer",
    };

    return (
        <ConfigProvider theme={getThemeConfig()}>
            <div style={containerStyle}>
                <div style={cardStyle}>
                    {isLogin ? (
                        <LoginForm />
                    ) : showVerification ? (
                        <VerificationForm />
                    ) : (
                        <RegistrationForm onSuccess={() => setIsLogin(true)} />
                    )}

                    <div style={toggleTextStyle}>
                        {isLogin ? (
                            <span>
                                {t("Don't have an account?")}{" "}
                                <span
                                    style={toggleLinkStyle}
                                    onClick={handleToggleForm}
                                >
                                    {t("Sign up")}
                                </span>
                            </span>
                        ) : (
                            <span>
                                {t("Already have an account?")}{" "}
                                <span
                                    style={toggleLinkStyle}
                                    onClick={handleToggleForm}
                                >
                                    {t("Sign in")}
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}