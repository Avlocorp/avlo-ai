import React, { useState } from "react";
import { Modal, Table, Tag, Progress, Card, Divider, Row, Col, Typography, Space, Badge, Spin, Button } from "antd";
import {
    CheckCircleOutlined,
    WarningOutlined,
    CloseCircleOutlined,
    TrophyOutlined,
    BugOutlined,
    BulbOutlined,
    PercentageOutlined,
    UserOutlined,
    MessageOutlined,
    ArrowLeftOutlined
} from "@ant-design/icons";
import { useGetDetailLeadQuery } from "services/api/leads/leads.api";
import PdfDownload from "./rejected-pdf-download";

const { Title, Text, Paragraph } = Typography;

interface LeadAnalysisModalRejectedProps {
    open: boolean;
    onClose: () => void;
    lead_id: number | string | null;
}

const LeadAnalysisRejectedModal: React.FC<LeadAnalysisModalRejectedProps> = ({ open, onClose, lead_id }) => {
    if (!lead_id) return null;

    const { data, isLoading } = useGetDetailLeadQuery({ leadId: Number(lead_id) });
    // ✅ Tipni qat'iylashtirdik
    const analysedData: Record<string, unknown> = (data?.analysed_data as unknown as Record<string, unknown>) || {};
    const [view, setView] = useState<"dashboard" | "text">("dashboard");
    // Status teglari
    const getStatusDisplay = (status: string) => {
        switch (status) {
            case "✅":
                return <Tag icon={<CheckCircleOutlined />} color="success">Success</Tag>;
            case "⚠":
                return <Tag icon={<WarningOutlined />} color="warning">Warning</Tag>;
            case "❌":
                return <Tag icon={<CloseCircleOutlined />} color="error">Failed</Tag>;
            default:
                return <Tag color="default">{status}</Tag>;
        }
    };

    // Xarid ehtimoli (%)
    const getPurchaseProbability = () => {
        const probText = analysedData["Xarid ehtimoli (%)"];
        if (!probText) return 0;
        const match = String(probText).match(/(\d+)%/);
        const v = match ? parseInt(match[1], 10) : Number.isFinite(probText) ? Number(probText) : 0;
        return Number.isFinite(v) ? v : 0;
    };

    const getProbabilityColor = (percentage: number) => {
        if (percentage >= 70) return "#52c41a";
        if (percentage >= 40) return "#faad14";
        return "#ff4d4f";
    };

    // Checklist Table
    const renderChecklistTable = (checklistData: any) => {
        if (!checklistData || !checklistData.Technique) return null;

        const dataSource = checklistData.Technique.map((technique: string, index: number) => ({
            key: index,
            technique,
            status: checklistData["✅/⚠/❌"]?.[index] ?? "-",
            example: checklistData["Example & time"]?.[index] ?? "-",
            comment: checklistData["Depth & comments"]?.[index] ?? "-",
            recommendation: checklistData["Recommendations"]?.[index] ?? "-",
        }));

        const columns = [
            { title: "Technique", dataIndex: "technique", key: "technique", width: 200, render: (t: string) => <Text strong>{t}</Text> },
            { title: "Status", dataIndex: "status", key: "status", width: 100, render: (s: string) => getStatusDisplay(s) },
            {
                title: "Example & Time",
                dataIndex: "example",
                key: "example",
                width: 250,
                render: (txt: string) =>
                    txt === "-" ? <Text type="secondary">-</Text> :
                        <Text code style={{ fontSize: 12, backgroundColor: "#f0f9ff", color: "#0369a1", padding: "2px 6px", borderRadius: 4 }}>{txt}</Text>
            },
            { title: "Comments", dataIndex: "comment", key: "comment", render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
            {
                title: "Recommendations",
                dataIndex: "recommendation",
                key: "recommendation",
                render: (t: string) =>
                    <Text style={{ fontSize: 12, color: "#d97706", backgroundColor: "#fef3c7", padding: "2px 6px", borderRadius: 4 }}>💡 {t}</Text>
            }
        ];

        return (
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small"
                scroll={{ x: true }}
                className="checklist-table"
            />
        );
    };

    const renderValue = (key: string, value: any) => {
        if (key === "Checklist Table") return renderChecklistTable(value);

        if (key === "Umumiy xulosa") {
            return (
                <Card size="small" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <Paragraph style={{ margin: 0, lineHeight: 1.6 }}>
                        <MessageOutlined style={{ color: "#3b82f6", marginRight: 8 }} />
                        {String(value)}
                    </Paragraph>
                </Card>
            );
        }

        if (key === "Xarid ehtimoli (%)" && value) {
            const percentage = getPurchaseProbability();
            const color = getProbabilityColor(percentage);
            return (
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Progress percent={percentage} strokeColor={color} format={() => `${percentage}%`} />
                    <Text type="secondary" style={{ fontSize: 12 }}>{String(value)}</Text>
                </Space>
            );
        }

        if (key === "Lead Class") {
            const getLeadClassColor = (leadClass: string) => {
                switch (leadClass?.toLowerCase()) {
                    case "hot": return "red";
                    case "warm": return "orange";
                    case "potential": return "blue";
                    case "cold": return "default";
                    default: return "default";
                }
            };
            return (
                <Badge.Ribbon text={String(value)} color={getLeadClassColor(String(value))}>
                    <Card size="small" style={{ backgroundColor: "#fafafa" }}>
                        <UserOutlined style={{ fontSize: 24, color: "#8b5cf6" }} />
                    </Card>
                </Badge.Ribbon>
            );
        }

        if (key === "Top 3 Strengths") {
            return (
                <Card size="small" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Text strong style={{ color: "#15803d" }}>
                            <TrophyOutlined style={{ marginRight: 8 }} />
                            Strengths
                        </Text>
                        {Array.isArray(value) && value.map((item, idx) => (
                            <Text key={idx} style={{ color: "#166534", fontSize: 14 }}>
                                <CheckCircleOutlined style={{ color: "#22c55e", marginRight: 6 }} />
                                {String(item)}
                            </Text>
                        ))}
                    </Space>
                </Card>
            );
        }

        if (key === "Top 3 Weaknesses") {
            return (
                <Card size="small" style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Text strong style={{ color: "#dc2626" }}>
                            <BugOutlined style={{ marginRight: 8 }} />
                            Weaknesses
                        </Text>
                        {Array.isArray(value) && value.map((item, idx) => (
                            <Text key={idx} style={{ color: "#991b1b", fontSize: 14 }}>
                                <CloseCircleOutlined style={{ color: "#ef4444", marginRight: 6 }} />
                                {String(item)}
                            </Text>
                        ))}
                    </Space>
                </Card>
            );
        }

        if (key === "Operator uchun tavsiyalar" || key.toLowerCase().includes("recommendation")) {
            return (
                <Card size="small" style={{ backgroundColor: "#fffbeb", border: "1px solid #fed7aa" }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Text strong style={{ color: "#d97706" }}>
                            <BulbOutlined style={{ marginRight: 8 }} />
                            Recommendations
                        </Text>
                        {Array.isArray(value) && value.map((item, idx) => (
                            <Text key={idx} style={{ color: "#92400e", fontSize: 14 }}>
                                💡 {typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}
                            </Text>
                        ))}
                    </Space>
                </Card>
            );
        }

        if (key === "Xatolar va kamchiliklar" || key.toLowerCase().includes("xatolar") || key.toLowerCase().includes("errors")) {
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {Array.isArray(value) && value.map((error: any, idx: number) => {
                        const isWarning = error["✅/❌"] === "⚠";
                        const isFailed = error["✅/❌"] === "❌";

                        const cardStyle = {
                            backgroundColor: isFailed ? "#fef2f2" : isWarning ? "#fffbeb" : "#f0fdf4",
                            border: `1px solid ${isFailed ? "#fecaca" : isWarning ? "#fed7aa" : "#bbf7d0"}`,
                            borderLeft: `4px solid ${isFailed ? "#ef4444" : isWarning ? "#f59e0b" : "#22c55e"}`,
                            borderRadius: 8
                        } as React.CSSProperties;

                        const statusIcon = isFailed
                            ? <CloseCircleOutlined style={{ color: "#ef4444", fontSize: 16 }} />
                            : isWarning
                                ? <WarningOutlined style={{ color: "#f59e0b", fontSize: 16 }} />
                                : <CheckCircleOutlined style={{ color: "#22c55e", fontSize: 16 }} />;

                        return (
                            <Card key={idx} size="small" style={cardStyle}>
                                <Row gutter={[16, 8]} align="middle">
                                    <Col xs={24} sm={6}>
                                        <Space>
                                            {statusIcon}
                                            <Text strong style={{ color: isFailed ? "#dc2626" : isWarning ? "#d97706" : "#16a34a", fontSize: 14 }}>
                                                {error["Texnika"] || error["Technique"]}
                                            </Text>
                                        </Space>
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <div>
                                            <Text type="secondary" style={{ fontSize: 11, display: "block" }}>Status</Text>
                                            {getStatusDisplay(error["✅/❌"])}
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <div>
                                            <Text type="secondary" style={{ fontSize: 11, display: "block" }}>Implementation</Text>
                                            <Text style={{ fontSize: 13, color: "#4b5563" }}>
                                                {error["Nima ishlatilgan (yoki ishlatilmagan)"] || "N/A"}
                                            </Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <div>
                                            <Text type="secondary" style={{ fontSize: 11, display: "block" }}>Recommendation</Text>
                                            <Text style={{ fontSize: 12, color: "#d97706", backgroundColor: "#fef3c7", padding: "2px 6px", borderRadius: 4, display: "inline-block" }}>
                                                💡 {error["Tavsiyalar"] || "No recommendations"}
                                            </Text>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        );
                    })}
                </div>
            );
        }

        // Default rendering
        if (Array.isArray(value)) {
            return (
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                    {value.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: 4, color: "#4b5563", fontSize: 14 }}>
                            {typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}
                        </li>
                    ))}
                </ul>
            );
        }

        if (typeof value === "object" && value !== null) {
            // ✅ faqat massiv bo‘lsa ustun yaratamiz, aks holda oddiy JSON ko‘rsatamiz
            if (Array.isArray(value)) {
                const firstRow = (value[0] && typeof value[0] === "object") ? value[0] : {};
                const columns = Object.keys(firstRow).map((k) => ({
                    title: k.charAt(0).toUpperCase() + k.slice(1),
                    dataIndex: k,
                    key: k,
                    render: (val: any) => typeof val === "boolean" ? (val ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>) : String(val),
                }));
                return (
                    <Table
                        dataSource={value}
                        columns={columns}
                        pagination={false}
                        size="small"
                        rowKey={(_, idx) => (idx !== undefined ? idx.toString() : Math.random().toString())}
                    />
                );
            }
            // Non-array object: JSON sifatida
            return <Text style={{ color: "#4b5563" }}>{JSON.stringify(value, null, 2)}</Text>;
        }

        return <Text style={{ color: "#4b5563" }}>{String(value)}</Text>;
    };

    // Overall score (himoya)
    const calculateOverallScore = () => {
        const checklist = analysedData["Checklist Table"] as any;
        const statuses: string[] = checklist?.["✅/⚠/❌"] || [];
        if (!Array.isArray(statuses) || statuses.length === 0) return 0;
        const successCount = statuses.filter((s) => s === "✅").length;
        return Math.round((successCount / statuses.length) * 100);
    };

    const overallScore = calculateOverallScore();
    const purchaseProbability = getPurchaseProbability();

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={1200}
            mask
            styles={{ mask: { backgroundColor: "rgba(0, 0, 0, 0.15)" } }}
            title={
                <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between", borderBottom: "1px solid #e5e7eb" }}>
                    <div className="flex gap-3 items-center">
                        <div style={{ padding: 8, backgroundColor: "#dbeafe", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <MessageOutlined style={{ color: "#2563eb", fontSize: 18 }} />
                        </div>
                        <div>
                            <Title level={4} style={{ margin: 0, color: "#1f2937" }}>Lead Analysis Dashboard</Title>
                            <Text type="secondary" style={{ fontSize: 13 }}>Detailed conversation analysis and performance metrics</Text>
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        {view === "dashboard" ? (
                            <Button type="primary" onClick={() => setView("text")}>
                                Matni ko'rish
                            </Button>
                        ) : (
                            <Button onClick={() => setView("dashboard")} icon={<ArrowLeftOutlined />}>Orqaga</Button>
                        )}
                        <PdfDownload data={data?.analysed_data} transcriptions={data?.transcriptions} crm_id={data?.crm_id} />
                    </div>
                </div>
            }
        >
            {isLoading ?
                <Spin
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                />
                :
                <>
                    {view === "dashboard" && (
                        <div style={{ maxHeight: "75vh", overflowY: "auto", padding: 4 }}>
                            {/* Metrics */}
                            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                                <Col xs={24} sm={8}>
                                    <Card size="small" style={{ textAlign: "center", backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe" }}>
                                        <PercentageOutlined style={{ fontSize: 24, color: "#2563eb", marginBottom: 8 }} />
                                        <Title level={5} style={{ margin: 0, color: "#1e40af" }}>Purchase Probability</Title>
                                        <Title level={2} style={{ margin: "4px 0", color: getProbabilityColor(purchaseProbability) }}>
                                            {purchaseProbability}%
                                        </Title>
                                    </Card>
                                </Col>

                                <Col xs={24} sm={8}>
                                    <Card size="small" style={{ textAlign: "center", backgroundColor: "#f5f3ff", border: "1px solid #c4b5fd" }}>
                                        <UserOutlined style={{ fontSize: 24, color: "#7c3aed", marginBottom: 8 }} />
                                        <Title level={5} style={{ margin: 0, color: "#6d28d9" }}>Lead Class</Title>
                                        <Title level={3} style={{ margin: "4px 0", color: "#7c3aed" }}>
                                            {(analysedData["Lead Class"] as string) || "Unknown"}
                                        </Title>
                                    </Card>
                                </Col>

                                <Col xs={24} sm={8}>
                                    <Card size="small" style={{ textAlign: "center", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                                        <TrophyOutlined style={{ fontSize: 24, color: "#16a34a", marginBottom: 8 }} />
                                        <Title level={5} style={{ margin: 0, color: "#15803d" }}>Overall Score</Title>
                                        <Title level={2} style={{ margin: "4px 0", color: "#16a34a" }}>
                                            {overallScore}%
                                        </Title>
                                    </Card>
                                </Col>
                            </Row>

                            <Divider style={{ margin: "16px 0" }} />

                            {/* Dynamic */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {Object.entries(analysedData).map(([k, v]) => (
                                    <Card
                                        key={k}
                                        size="small"
                                        title={<Text strong style={{ color: "#374151", fontSize: 15 }}>{k}</Text>}
                                        style={{ borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)", border: "1px solid #e5e7eb" }}
                                        styles={{ header: { backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", minHeight: "auto", padding: "12px 16px" }, body: { padding: 16 } }}
                                    >
                                        {renderValue(k, v)}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )
                    }
                    {view === "text" && (
                        <div style={{ maxHeight: "75vh", overflowY: "auto", padding: 16 }}>
                            <Title level={5} style={{ marginBottom: 12 }}>
                                Call Transcriptions
                            </Title>

                            {Array.isArray(data?.transcriptions) && data?.transcriptions.length > 0 ? (
                                data?.transcriptions.map((conversation: any, convIdx: number) => {
                                    if (!Array.isArray(conversation)) {
                                        console.warn("Invalid conversation data at index", convIdx, ":", conversation);
                                        return null;
                                    }
                                    return (
                                        <div
                                            key={convIdx}
                                            style={{
                                                border: "1px solid #e5e7eb",
                                                borderRadius: 8,
                                                padding: 12,
                                                marginBottom: 16,
                                                backgroundColor: "#fff",
                                            }}
                                        >
                                            {conversation.map((line: any, lineIdx: number) => {
                                                if (!line || typeof line !== "object" || !line.text) {
                                                    console.warn("Invalid transcription line at index", lineIdx, ":", line);
                                                    return null;
                                                }
                                                return (
                                                    <Paragraph key={lineIdx} style={{ marginBottom: 8 }}>
                                                        <Text strong>
                                                            {line.speaker ? line.speaker.toUpperCase() : "Unknown"}:
                                                        </Text>{" "}
                                                        {line.text}
                                                    </Paragraph>
                                                );
                                            })}
                                        </div>
                                    );
                                })
                            ) : (
                                <Text type="secondary">Transcription not available</Text>
                            )}
                        </div>
                    )}



                </>
            }
        </Modal>
    );
};

export default LeadAnalysisRejectedModal;
