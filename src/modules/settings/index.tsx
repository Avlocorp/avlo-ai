
import { Card, Select, Button, Input, Typography, Space, Row, Col, Switch, InputNumber } from "antd"
import { MoonOutlined, UserOutlined, CreditCardOutlined, BookOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography
const { Option } = Select

export default function Settings() {

    const navigate = useNavigate()

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f9fafb",
                padding: "24px",
            }}
        >
            <div style={{ margin: "0 auto" }}>
                <Title
                    level={2}
                    style={{
                        color: "#111827",
                        fontWeight: 600,
                        marginBottom: "32px",
                    }}
                >
                    Settings
                </Title>

                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    {/* Language va Theme Sections */}
                    <Row gutter={24}>
                        <Col xs={24} lg={12}>
                            <Card
                                style={{
                                    backgroundColor: "white",
                                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Title
                                    level={4}
                                    style={{
                                        color: "#111827",
                                        fontWeight: 500,
                                        marginBottom: "8px",
                                    }}
                                >
                                    Language
                                </Title>
                                <Text
                                    style={{
                                        color: "#6b7280",
                                        display: "block",
                                        marginBottom: "16px",
                                    }}
                                >
                                    Select your preferred language
                                </Text>
                                <Select defaultValue="english" style={{ width: "100%" }} size="large">
                                    <Option value="english">English</Option>
                                    <Option value="spanish">Spanish</Option>
                                    <Option value="french">French</Option>
                                    <Option value="german">German</Option>
                                </Select>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card
                                style={{
                                    backgroundColor: "white",
                                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Title
                                    level={4}
                                    style={{
                                        color: "#111827",
                                        fontWeight: 500,
                                        marginBottom: "8px",
                                    }}
                                >
                                    Theme
                                </Title>
                                <Text
                                    style={{
                                        color: "#6b7280",
                                        display: "block",
                                        marginBottom: "16px",
                                    }}
                                >
                                    Select your preferred theme
                                </Text>
                                <Button
                                    type="primary"
                                    icon={<MoonOutlined />}
                                    size="large"
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#4f46e5",
                                        borderColor: "#4f46e5",
                                    }}
                                >
                                    Dark Mode
                                </Button>
                            </Card>
                        </Col>
                    </Row>

                    {/* User Management Section */}
                    <Card
                        style={{
                            backgroundColor: "white",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                gap: "16px",
                            }}
                        >
                            <div style={{ flex: 1, minWidth: "200px" }}>
                                <Title
                                    level={4}
                                    style={{
                                        color: "#111827",
                                        fontWeight: 500,
                                        marginBottom: "4px",
                                    }}
                                >
                                    User Management
                                </Title>
                                <Text style={{ color: "#6b7280" }}>Invite and manage users of the platform</Text>
                            </div>
                            <Button
                                type="primary"
                                icon={<UserOutlined />}
                                onClick={() => { navigate("/pm/settings/user-manage") }}
                                size="large"
                                style={{
                                    backgroundColor: "#4f46e5",
                                    borderColor: "#4f46e5",
                                }}
                            >
                                Manage Users
                            </Button>
                        </div>
                    </Card>

                    {/* Payment Settings Section */}
                    <Card
                        style={{
                            backgroundColor: "white",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                gap: "16px",
                            }}
                        >
                            <div style={{ flex: 1, minWidth: "200px" }}>
                                <Title
                                    level={4}
                                    style={{
                                        color: "#111827",
                                        fontWeight: 500,
                                        marginBottom: "4px",
                                    }}
                                >
                                    Payment Settings
                                </Title>
                                <Text style={{ color: "#6b7280" }}>Manage your payment methods and billing preferences</Text>
                            </div>
                            <Button
                                type="primary"
                                icon={<CreditCardOutlined />}
                                size="large"
                                style={{
                                    backgroundColor: "#4f46e5",
                                    borderColor: "#4f46e5",
                                }}
                            >
                                Manage Payments
                            </Button>
                        </div>
                    </Card>

                    {/* Dictionary Settings Section */}
                    <Card
                        style={{
                            backgroundColor: "white",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                gap: "16px",
                            }}
                        >
                            <div style={{ flex: 1, minWidth: "200px" }}>
                                <Title
                                    level={4}
                                    style={{
                                        color: "#111827",
                                        fontWeight: 500,
                                        marginBottom: "4px",
                                    }}
                                >
                                    Dictionary Settings
                                </Title>
                                <Text style={{ color: "#6b7280" }}>Manage offensive words dictionaries for quality control</Text>
                            </div>
                            <Button
                                type="primary"
                                icon={<BookOutlined />}
                                size="large"
                                style={{
                                    backgroundColor: "#4f46e5",
                                    borderColor: "#4f46e5",
                                }}
                            >
                                Manage Dictionaries
                            </Button>
                        </div>
                    </Card>

                    {/* General Settings Section */}
                    <Card
                        style={{
                            backgroundColor: "white",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Title
                            level={4}
                            style={{
                                color: "#111827",
                                fontWeight: 500,
                                marginBottom: "8px",
                            }}
                        >
                            General Settings
                        </Title>
                        <Text
                            style={{
                                color: "#6b7280",
                                display: "block",
                                marginBottom: "24px",
                            }}
                        >
                            Configure general application settings
                        </Text>

                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <div>
                                <Text
                                    strong
                                    style={{
                                        color: "#374151",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        display: "block",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Company Name
                                </Text>
                                <Input defaultValue="Acme Corp" size="large" style={{ width: "100%" }} />
                            </div>

                            <div>
                                <Text
                                    strong
                                    style={{
                                        color: "#374151",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        display: "block",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Default Timezone
                                </Text>
                                <Select defaultValue="utc" size="large" style={{ width: "100%" }}>
                                    <Option value="utc">UTC</Option>
                                    <Option value="est">EST</Option>
                                    <Option value="pst">PST</Option>
                                    <Option value="cet">CET</Option>
                                </Select>
                            </div>
                        </Space>
                    </Card>

                    <Card className="bg-white shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <Title level={3} className="!text-xl !font-semibold !text-gray-900 !mb-2">
                                    Notifications
                                </Title>
                                <Text className="text-gray-600">Manage notification preferences</Text>
                            </div>

                            <Space direction="vertical" size="large" className="w-full">
                                <div className="flex items-center justify-between">
                                    <Text className="text-gray-900 font-medium">Email Notifications</Text>
                                    <Switch
                                        defaultChecked={true}
                                        style={{
                                            backgroundColor: "#4f46e5",
                                        }}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Text className="text-gray-900 font-medium">Push Notifications</Text>
                                    <Switch defaultChecked={false} />
                                </div>
                            </Space>
                        </div>
                    </Card>

                    {/* Metrics & Analytics Section */}
                    <Card className="bg-white shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <Title level={3} className="!text-xl !font-semibold !text-gray-900 !mb-2">
                                    Metrics & Analytics
                                </Title>
                                <Text className="text-gray-600">Configure metrics calculation and display settings</Text>
                            </div>

                            <Space direction="vertical" size="large" className="w-full">
                                <div className="space-y-2">
                                    <Text className="text-gray-900 font-medium block">Default Date Range (days)</Text>
                                    <InputNumber defaultValue={30} min={1} max={365} className="w-full max-w-xs" size="large" />
                                </div>

                                <div className="space-y-2">
                                    <Text className="text-gray-900 font-medium block">Metric Precision (decimal places)</Text>
                                    <InputNumber defaultValue={2} min={0} max={10} className="w-full max-w-xs" size="large" />
                                </div>
                            </Space>
                        </div>
                    </Card>
                </Space>
            </div>
        </div>
    )
}
