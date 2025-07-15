

import { Card, Button, Typography, Space, Row, Col, InputNumber, Flex, ConfigProvider, theme as antdTheme } from "antd"
import { UserOutlined, CreditCardOutlined, BookOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Language from "components/language"
import { useTranslation } from "react-i18next"
import { useTheme } from "services/contexts/ThemeContext"

const { Title, Text } = Typography

export default function Settings() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { theme, setTheme } = useTheme()

    // Theme configuration for Ant Design
    const getThemeConfig = () => {
        if (theme === "dark") {
            return {
                algorithm: antdTheme.darkAlgorithm,
                token: {
                    colorPrimary: "#4f46e5",
                    borderRadius: 8,
                    colorBgContainer: "#374151",
                    colorBgElevated: "#374151",
                    colorBgLayout: "#1f2937",
                    colorText: "#f3f4f6",
                    colorTextSecondary: "#9ca3af",
                    colorBorder: "#4b5563",
                    colorBgBase: "#1f2937",
                },
            };
        }

        return {
            algorithm: antdTheme.defaultAlgorithm,
            token: {
                colorPrimary: "#4f46e5",
                borderRadius: 8,
                colorBgContainer: "#ffffff",
                colorBgElevated: "#ffffff",
                colorBgLayout: "#f9fafb",
                colorText: "#111827",
                colorTextSecondary: "#6b7280",
                colorBorder: "#d1d5db",
                colorBgBase: "#f9fafb",
            },
        };
    };

    // Consolidated styles
    const getStyles = () => {
        const isDark = theme === "dark";
        return {
            container: {
                minHeight: "100vh",
                backgroundColor: isDark ? "#1f2937" : "#f9fafb",
                padding: "24px",
            },
            innerContainer: {
                // maxWidth: "1200px",
                margin: "0 auto",
            },
            card: {
                backgroundColor: isDark ? "#374151" : "#ffffff",
                border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
                borderRadius: "8px",
                boxShadow: isDark
                    ? "0 1px 3px 0 rgba(0, 0, 0, 0.3)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            },
            title: {
                color: isDark ? "#f3f4f6" : "#111827",
                fontWeight: 600,
                marginBottom: "32px",
            },
            sectionTitle: {
                color: isDark ? "#f3f4f6" : "#111827",
                marginBottom: "8px",
            },
            text: {
                color: isDark ? "#f3f4f6" : "#111827",
            },
            subText: {
                color: isDark ? "#9ca3af" : "#6b7280",
            },
            primaryButton: {
                backgroundColor: "#4f46e5",
                borderColor: "#4f46e5",
                color: "#ffffff",
            },
            themeButton: (isActive: boolean) => ({
                flex: 1,
                width: "50%",
                ...(isActive
                    ? {
                        backgroundColor: "#4f46e5",
                        borderColor: "#4f46e5",
                        color: "#ffffff",
                    }
                    : {
                        backgroundColor: "transparent",
                        borderColor: "#4f46e5",
                        color: "#4f46e5",
                    }),
            }),
            input: {
                backgroundColor: isDark ? "#4b5563" : "#ffffff",
                borderColor: isDark ? "#6b7280" : "#d1d5db",
                color: isDark ? "#f3f4f6" : "#111827",
            },
            switch: {
                backgroundColor: isDark ? "#4b5563" : undefined,
            },
        };
    };

    const styles = getStyles();

    return (
        <ConfigProvider theme={getThemeConfig()}>
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <Title level={2} style={styles.title}>
                        {t("Settings")}
                    </Title>

                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        {/* Language and Theme Row */}
                        <Row gutter={24}>
                            <Col xs={24} lg={12}>
                                <Card style={styles.card}>
                                    <Title level={4} style={styles.sectionTitle}>
                                        {t("Language")}
                                    </Title>
                                    <Text style={{ ...styles.subText, display: "block", marginBottom: "16px" }}>
                                        {t("Select your preferred language")}
                                    </Text>
                                    <Language width={"100%"} height={"40px"} />
                                </Card>
                            </Col>

                            <Col xs={24} lg={12}>
                                <Card style={styles.card}>
                                    <Title level={4} style={styles.sectionTitle}>
                                        {t("Theme")}
                                    </Title>
                                    <Text style={{ ...styles.subText, display: "block", marginBottom: "16px" }}>
                                        {t("Select your preferred theme")}
                                    </Text>
                                    <Space.Compact style={{ width: "100%" }}>
                                        <Button
                                            type={theme === "light" ? "primary" : "default"}
                                            icon={<SunOutlined />}
                                            size="large"
                                            onClick={() => setTheme("light")}
                                            style={styles.themeButton(theme === "light")}
                                        >
                                            {t("Light Mode")}
                                        </Button>
                                        <Button
                                            type={theme === "dark" ? "primary" : "default"}
                                            icon={<MoonOutlined />}
                                            size="large"
                                            onClick={() => setTheme("dark")}
                                            style={styles.themeButton(theme === "dark")}
                                        >
                                            {t("Dark Mode")}
                                        </Button>
                                    </Space.Compact>
                                </Card>
                            </Col>
                        </Row>

                        {/* User Management */}
                        <Card style={styles.card}>
                            <Flex justify="space-between" align="flex-start" wrap="wrap" gap={16}>
                                <div style={{ flex: 1, minWidth: "200px" }}>
                                    <Title level={4} style={{ ...styles.sectionTitle, marginBottom: "4px" }}>
                                        {t("User Management")}
                                    </Title>
                                    <Text style={styles.subText}>
                                        {t("Invite and manage users of the platform")}
                                    </Text>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<UserOutlined />}
                                    onClick={() => navigate("/pm/settings/user-manage")}
                                    size="large"
                                    style={styles.primaryButton}
                                >
                                    {t("Manage Users")}
                                </Button>
                            </Flex>
                        </Card>

                        {/* Payment Settings */}
                        <Card style={styles.card}>
                            <Flex justify="space-between" align="flex-start" wrap="wrap" gap={16}>
                                <div style={{ flex: 1, minWidth: "200px" }}>
                                    <Title level={4} style={{ ...styles.sectionTitle, marginBottom: "4px" }}>
                                        {t("Payment Settings")}
                                    </Title>
                                    <Text style={styles.subText}>
                                        {t("Manage your payment methods and billing preferences")}
                                    </Text>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<CreditCardOutlined />}
                                    size="large"
                                    style={styles.primaryButton}
                                >
                                    {t("Manage Payments")}
                                </Button>
                            </Flex>
                        </Card>

                        {/* Dictionary Settings */}
                        <Card style={styles.card}>
                            <Flex justify="space-between" align="flex-start" wrap="wrap" gap={16}>
                                <div style={{ flex: 1, minWidth: "200px" }}>
                                    <Title level={4} style={{ ...styles.sectionTitle, marginBottom: "4px" }}>
                                        {t("Dictionary Settings")}
                                    </Title>
                                    <Text style={styles.subText}>
                                        {t("Manage offensive words dictionaries for quality control")}
                                    </Text>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<BookOutlined />}
                                    size="large"
                                    style={styles.primaryButton}
                                >
                                    {t("Manage Dictionaries")}
                                </Button>
                            </Flex>
                        </Card>

                        {/* General Settings */}
                        {/* <Card style={styles.card}>
                            <Title level={4} style={styles.sectionTitle}>
                                {t("General Settings")}
                            </Title>
                            <Text style={{ ...styles.subText, display: "block", marginBottom: "24px" }}>
                                {t("Configure general application settings")}
                            </Text>
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                <div>
                                    <Text
                                        strong
                                        style={{
                                            ...styles.text,
                                            fontSize: "14px",
                                            display: "block",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {t("Company Name")}
                                    </Text>
                                    <Input
                                        defaultValue="Acme Corp"
                                        size="large"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </Space>
                        </Card> */}

                        {/* Notifications */}
                        {/* <Card style={styles.card}>
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                <div>
                                    <Title level={4} style={styles.sectionTitle}>
                                        {t("Notifications")}
                                    </Title>
                                    <Text style={styles.subText}>
                                        {t("Manage notification preferences")}
                                    </Text>
                                </div>

                                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                    <Flex justify="space-between" align="center">
                                        <Text style={styles.text}>{t("Email Notifications")}</Text>
                                        <Switch defaultChecked />
                                    </Flex>
                                    <Flex justify="space-between" align="center">
                                        <Text style={styles.text}>{t("Push Notifications")}</Text>
                                        <Switch defaultChecked={false} />
                                    </Flex>
                                </Space>
                            </Space>
                        </Card> */}

                        {/* Metrics & Analytics */}
                        <Card style={styles.card}>
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                <div>
                                    <Title level={4} style={styles.sectionTitle}>
                                        {t("Metrics & Analytics")}
                                    </Title>
                                    <Text style={styles.subText}>
                                        {t("Configure metrics calculation and display settings")}
                                    </Text>
                                </div>

                                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                        <Text style={styles.text}>{t("Default Date Range (days)")}</Text>
                                        <InputNumber
                                            defaultValue={30}
                                            min={1}
                                            max={365}
                                            size="large"
                                            style={{ width: "100%", maxWidth: "300px" }}
                                        />
                                    </Space>

                                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                        <Text style={styles.text}>{t("Metric Precision (decimal places)")}</Text>
                                        <InputNumber
                                            defaultValue={2}
                                            min={0}
                                            max={10}
                                            size="large"
                                            style={{ width: "100%", maxWidth: "300px" }}
                                        />
                                    </Space>
                                </Space>
                            </Space>
                        </Card>
                    </Space>
                </div>
            </div>
        </ConfigProvider>
    )
}