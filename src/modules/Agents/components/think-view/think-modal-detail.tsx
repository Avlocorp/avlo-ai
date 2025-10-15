import type React from "react"
import { Modal, Table, Tag, Progress, Card, Divider, Row, Col, Typography, Space, Badge, Statistic, Spin, Button } from "antd"
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
    ClockCircleOutlined,
    QuestionCircleOutlined,
    CalculatorOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons"
import PdfDownloadThink from "./think-pdf-download"
import { useGetDetailLeadQuery } from "services/api/leads/leads.api"
import { useState } from "react"

const { Title, Text, Paragraph } = Typography

interface LeadAnalysisThinkModalProps {
    open: boolean
    onClose: () => void
    lead_id: any
}

const LeadAnalysisThinkModal: React.FC<LeadAnalysisThinkModalProps> = ({ open, onClose, lead_id }) => {
    if (!lead_id) return null;
    const { data, isLoading } = useGetDetailLeadQuery({ leadId: Number(lead_id) });
    const [view, setView] = useState<"dashboard" | "text">("dashboard");
    const analysis =
        data && data.analysed_data && "analysis" in data.analysed_data
            ? (data.analysed_data as { analysis: any }).analysis
            : undefined

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case "✅":
                return (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        Bajarilgan
                    </Tag>
                )
            case "⚠":
                return (
                    <Tag icon={<WarningOutlined />} color="warning">
                        Qisman
                    </Tag>
                )
            case "❌":
                return (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                        Bajarilmagan
                    </Tag>
                )
            default:
                return <Tag color="default">{status}</Tag>
        }
    }

    const getPurchaseProbability = () => {
        return analysis?.umumiy_xulosa?.decision_to_pay_percentage?.percentage || 0
    }

    const getProbabilityColor = (percentage: number) => {
        if (percentage >= 70) return "#52c41a"
        if (percentage >= 40) return "#faad14"
        return "#ff4d4f"
    }

    const renderTechniqueTable = () => {
        if (!analysis?.texnika_jadvali?.techniques) return null

        const dataSource = analysis?.texnika_jadvali.techniques.map((technique: any, index: number) => ({
            key: index,
            name: technique.name,
            status: technique.status,
            score: technique.score,
            example_time: technique.example_time,
            depth_comments: technique.depth_comments,
            recommendation: technique.recommendation,
            confidence: technique.confidence,
        }))

        const columns = [
            {
                title: "Texnika",
                dataIndex: "name",
                key: "name",
                width: 200,
                render: (text: string) => <Text strong>{text}</Text>,
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                width: 100,
                render: (status: string) => getStatusDisplay(status),
            },
            {
                title: "Ball",
                dataIndex: "score",
                key: "score",
                width: 80,
                render: (score: number) => (
                    <Progress
                        type="circle"
                        size={40}
                        percent={score}
                        format={() => score}
                        strokeColor={score >= 70 ? "#52c41a" : score >= 40 ? "#faad14" : "#ff4d4f"}
                    />
                ),
            },
            {
                title: "Vaqt",
                dataIndex: "example_time",
                key: "example_time",
                width: 100,
                render: (time: string) =>
                    time ? (
                        <Text
                            code
                            style={{
                                fontSize: "12px",
                                backgroundColor: "#f0f9ff",
                                color: "#0369a1",
                                padding: "2px 6px",
                                borderRadius: "4px",
                            }}
                        >
                            {time}
                        </Text>
                    ) : (
                        <Text type="secondary">-</Text>
                    ),
            },
            {
                title: "Izohlar",
                dataIndex: "depth_comments",
                key: "depth_comments",
                render: (text: string) => <Text style={{ fontSize: "13px" }}>{text}</Text>,
            },
            {
                title: "Tavsiyalar",
                dataIndex: "recommendation",
                key: "recommendation",
                render: (text: string) =>
                    text !== "Yo'q" ? (
                        <Text
                            style={{
                                fontSize: "12px",
                                color: "#d97706",
                                backgroundColor: "#fef3c7",
                                padding: "2px 6px",
                                borderRadius: "4px",
                            }}
                        >
                            💡 {text}
                        </Text>
                    ) : (
                        <Text type="secondary">Yo'q</Text>
                    ),
            },
        ]

        return (
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small"
                scroll={{ x: true }}
                className="technique-table"
            />
        )
    }

    const renderGeneralSummary = () => {
        const { umumiy_xulosa } = analysis || {}
        if (!umumiy_xulosa) return null

        return (
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card size="small" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <Title level={5}>Lead Klassifikatsiyasi</Title>
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Badge.Ribbon text={umumiy_xulosa?.lead_classification?.type} color="blue">
                                <Card size="small" style={{ backgroundColor: "#fafafa" }}>
                                    <UserOutlined style={{ fontSize: "24px", color: "#8b5cf6" }} />
                                </Card>
                            </Badge.Ribbon>
                            <Text type="secondary">Variantlar:</Text>
                            {umumiy_xulosa.lead_classification?.options?.map((option: string, idx: number) => (
                                <Tag key={idx} color={option === umumiy_xulosa.lead_classification?.type ? "blue" : "default"}>
                                    {option}
                                </Tag>
                            ))}
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card size="small" style={{ backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe" }}>
                        <Title level={5}>To'lash Qarori Ehtimoli</Title>
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Progress
                                percent={umumiy_xulosa.decision_to_pay_percentage?.percentage || 0}
                                strokeColor={getProbabilityColor(umumiy_xulosa.decision_to_pay_percentage?.percentage || 0)}
                                format={() => `${umumiy_xulosa.decision_to_pay_percentage?.percentage || 0}%`}
                            />
                            <Text type="secondary">Ishonch darajasi: {umumiy_xulosa.decision_to_pay_percentage?.confidence}</Text>
                        </Space>
                    </Card>
                </Col>
            </Row>
        )
    }

    const renderReasonDiagnostics = () => {
        const { oylayman_sabab_diagnostikasi } = analysis || {}
        if (!oylayman_sabab_diagnostikasi) return null

        return (
            <Space direction="vertical" style={{ width: "100%" }}>
                <Card size="small" style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
                    <Title level={5}>Asosiy Sabab</Title>
                    <Paragraph style={{ margin: 0 }}>{oylayman_sabab_diagnostikasi.asosiy_sabab?.description}</Paragraph>
                    {oylayman_sabab_diagnostikasi.asosiy_sabab?.quote && (
                        <blockquote
                            style={{
                                borderLeft: "4px solid #ef4444",
                                paddingLeft: "12px",
                                margin: "8px 0",
                                fontStyle: "italic",
                                color: "#991b1b",
                            }}
                        >
                            {oylayman_sabab_diagnostikasi.asosiy_sabab.quote}
                            <Text type="secondary" style={{ display: "block", fontSize: "12px" }}>
                                Vaqt: {oylayman_sabab_diagnostikasi.asosiy_sabab.time}
                            </Text>
                        </blockquote>
                    )}
                </Card>

                {oylayman_sabab_diagnostikasi.qoshimcha_sabablar && oylayman_sabab_diagnostikasi.qoshimcha_sabablar.length > 0 && (
                    <Card size="small" style={{ backgroundColor: "#fffbeb", border: "1px solid #fed7aa" }}>
                        <Title level={5}>Qo'shimcha Sabablar</Title>
                        {oylayman_sabab_diagnostikasi.qoshimcha_sabablar.map((sabab: any, idx: number) => (
                            <div key={idx} style={{ marginBottom: "12px" }}>
                                <Text>{sabab.description}</Text>
                                {sabab.quote && (
                                    <blockquote
                                        style={{
                                            borderLeft: "4px solid #f59e0b",
                                            paddingLeft: "12px",
                                            margin: "4px 0",
                                            fontStyle: "italic",
                                            color: "#92400e",
                                        }}
                                    >
                                        {sabab.quote}
                                        <Text type="secondary" style={{ display: "block", fontSize: "12px" }}>
                                            Vaqt: {sabab.time}
                                        </Text>
                                    </blockquote>
                                )}
                            </div>
                        ))}
                    </Card>
                )}
            </Space>
        )
    }

    const renderErrorsAndWeaknesses = () => {
        const { xatolar_kamchiliklar } = analysis || {}
        if (!xatolar_kamchiliklar?.items) return null

        return (
            <Space direction="vertical" style={{ width: "100%" }}>
                {xatolar_kamchiliklar.items.map((error: any, idx: number) => (
                    <Card
                        key={idx}
                        size="small"
                        style={{
                            backgroundColor: error.severity === "Critical" ? "#fef2f2" : "#fffbeb",
                            border: `1px solid ${error.severity === "Critical" ? "#fecaca" : "#fed7aa"}`,
                            borderLeft: `4px solid ${error.severity === "Critical" ? "#ef4444" : "#f59e0b"}`,
                        }}
                    >
                        <Row gutter={[16, 8]} align="middle">
                            <Col xs={24} sm={6}>
                                <Space>
                                    {error.severity === "Critical" ? (
                                        <CloseCircleOutlined style={{ color: "#ef4444", fontSize: 16 }} />
                                    ) : (
                                        <WarningOutlined style={{ color: "#f59e0b", fontSize: 16 }} />
                                    )}
                                    <Tag color={error.severity === "Critical" ? "red" : "orange"}>{error.severity}</Tag>
                                </Space>
                            </Col>
                            <Col xs={24} sm={6}>
                                <Text code style={{ fontSize: "12px" }}>
                                    {error.time}
                                </Text>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Text style={{ fontSize: "13px" }}>{error.error}</Text>
                                <Divider type="vertical" />
                                <Text
                                    style={{
                                        fontSize: "12px",
                                        color: "#d97706",
                                        backgroundColor: "#fef3c7",
                                        padding: "2px 6px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    💡 {error.playbook_fix}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Space>
        )
    }

    const renderRecommendations = () => {
        const { tavsiyalar } = analysis || {}
        if (!tavsiyalar?.items) return null

        return (
            <Card size="small" style={{ backgroundColor: "#fffbeb", border: "1px solid #fed7aa" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Text strong style={{ color: "#d97706" }}>
                        <BulbOutlined style={{ marginRight: 8 }} />
                        {tavsiyalar.description}
                    </Text>
                    {tavsiyalar.items.map((item: string, idx: number) => (
                        <Text key={idx} style={{ color: "#92400e", fontSize: "14px" }}>
                            💡 {item}
                        </Text>
                    ))}
                </Space>
            </Card>
        )
    }

    const renderProbingQuestions = () => {
        const { probing_savollar } = analysis || {}
        if (!probing_savollar?.questions) return null

        return (
            <Card size="small" style={{ backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Text strong style={{ color: "#2563eb" }}>
                        <QuestionCircleOutlined style={{ marginRight: 8 }} />
                        Keyingi qo'ng'iroq uchun savollar
                    </Text>
                    {probing_savollar.questions.map((question: string, idx: number) => (
                        <Text key={idx} style={{ color: "#1e40af", fontSize: "14px" }}>
                            ❓ {question}
                        </Text>
                    ))}
                </Space>
            </Card>
        )
    }

    const renderStrengthsWeaknesses = () => {
        const { kuchli_tomonlar, zaif_tomonlar } = analysis || {}

        return (
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    {kuchli_tomonlar?.items && (
                        <Card size="small" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Text strong style={{ color: "#15803d" }}>
                                    <TrophyOutlined style={{ marginRight: 8 }} />
                                    Top 3 Kuchli Tomonlar
                                </Text>
                                {kuchli_tomonlar.items.map((item: any, idx: number) => (
                                    <Text key={idx} style={{ color: "#166534", fontSize: "14px" }}>
                                        <CheckCircleOutlined style={{ color: "#22c55e", marginRight: 6 }} />
                                        {item.rank}. {item.description}
                                    </Text>
                                ))}
                            </Space>
                        </Card>
                    )}
                </Col>
                <Col xs={24} md={12}>
                    {zaif_tomonlar?.items && (
                        <Card size="small" style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Text strong style={{ color: "#dc2626" }}>
                                    <BugOutlined style={{ marginRight: 8 }} />
                                    Top 3 Zaif Tomonlar
                                </Text>
                                {zaif_tomonlar.items.map((item: any, idx: number) => (
                                    <Text key={idx} style={{ color: "#991b1b", fontSize: "14px" }}>
                                        <CloseCircleOutlined style={{ color: "#ef4444", marginRight: 6 }} />
                                        {item.rank}. {item.description}
                                    </Text>
                                ))}
                            </Space>
                        </Card>
                    )}
                </Col>
            </Row>
        )
    }

    const renderDecisionCalculation = () => {
        const { decision_to_pay_hisoblash } = analysis || {}
        if (!decision_to_pay_hisoblash) return null

        return (
            <Card size="small" style={{ backgroundColor: "#f5f3ff", border: "1px solid #c4b5fd" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Text strong style={{ color: "#7c3aed" }}>
                        <CalculatorOutlined style={{ marginRight: 8 }} />
                        Hisoblash Jarayoni
                    </Text>
                    <pre
                        style={{
                            backgroundColor: "#faf5ff",
                            padding: "12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            color: "#6d28d9",
                            margin: 0,
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {decision_to_pay_hisoblash.breakdown}
                    </pre>
                    <Statistic
                        title="Yakuniy Natija"
                        value={decision_to_pay_hisoblash.final_percentage}
                        suffix="%"
                        valueStyle={{ color: getProbabilityColor(decision_to_pay_hisoblash.final_percentage) }}
                    />
                </Space>
            </Card>
        )
    }

    const purchaseProbability = getPurchaseProbability()
    const leadClass = analysis?.umumiy_xulosa?.lead_classification?.type || "Unknown"

    if (!analysis) {
        return (
            <Modal
                open={open}
                onCancel={onClose}
                footer={null}
                width={600}
                title="Lead Tahlili"
            >
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <Text type="secondary">Tahlil ma'lumotlari topilmadi</Text>
                </div>
            </Modal>
        )
    }

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={1200}
            mask
            styles={{
                mask: {
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                },
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        justifyContent: "space-between",
                        borderBottom: "1px solid #e5e7eb",
                    }}
                >
                    <div className="flex gap-3 items-center">
                        <div
                            style={{
                                padding: 8,
                                backgroundColor: "#dbeafe",
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MessageOutlined style={{ color: "#2563eb", fontSize: 18 }} />
                        </div>
                        <div>
                            <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
                                Lead Tahlili Dashboard
                            </Title>
                            <Text type="secondary" style={{ fontSize: "13px" }}>
                                Suhbat tahlili va ishlash ko'rsatkichlari
                            </Text>
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

                        <PdfDownloadThink data={analysis} transcriptions={data?.transcriptions} crm_id={data?.crm_id} />
                    </div>
                </div>
            }
        >
            {isLoading ? <Spin style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                :
                <> {view === "dashboard" ?


                    <div style={{ maxHeight: "75vh", overflowY: "auto", padding: "4px" }}>
                        {/* Key Metrics Row */}
                        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                            <Col xs={24} sm={8}>
                                <Card size="small" style={{ textAlign: "center", backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe" }}>
                                    <PercentageOutlined style={{ fontSize: 24, color: "#2563eb", marginBottom: 8 }} />
                                    <Title level={5} style={{ margin: 0, color: "#1e40af" }}>
                                        Xarid Ehtimoli
                                    </Title>
                                    <Title level={2} style={{ margin: "4px 0", color: getProbabilityColor(purchaseProbability) }}>
                                        {purchaseProbability}%
                                    </Title>
                                </Card>
                            </Col>
                            <Col xs={24} sm={8}>
                                <Card size="small" style={{ textAlign: "center", backgroundColor: "#f5f3ff", border: "1px solid #c4b5fd" }}>
                                    <UserOutlined style={{ fontSize: 24, color: "#7c3aed", marginBottom: 8 }} />
                                    <Title level={5} style={{ margin: 0, color: "#6d28d9" }}>
                                        Lead Klassi
                                    </Title>
                                    <Title level={3} style={{ margin: "4px 0", color: "#7c3aed" }}>
                                        {leadClass}
                                    </Title>
                                </Card>
                            </Col>
                            <Col xs={24} sm={8}>
                                <Card size="small" style={{ textAlign: "center", backgroundColor: "#fef3c7", border: "1px solid #fcd34d" }}>
                                    <ClockCircleOutlined style={{ fontSize: 24, color: "#d97706", marginBottom: 8 }} />
                                    <Title level={5} style={{ margin: 0, color: "#92400e" }}>
                                        Coachable Moment
                                    </Title>
                                    <Paragraph style={{ margin: "4px 0", color: "#92400e", fontSize: "12px" }}>
                                        {analysis?.coachable_moment?.takeaway}
                                    </Paragraph>
                                </Card>
                            </Col>
                        </Row>

                        <Divider style={{ margin: "16px 0" }} />

                        {/* General Summary */}
                        <Card
                            size="small"
                            title={
                                <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                    Umumiy Xulosa
                                </Text>
                            }
                            style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            {renderGeneralSummary()}
                        </Card>

                        {/* Reason Diagnostics */}
                        <Card
                            size="small"
                            title={
                                <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                    O'ylayman Sabab Diagnostikasi
                                </Text>
                            }
                            style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            {renderReasonDiagnostics()}
                        </Card>

                        {/* Technique Scorecard */}
                        <Card
                            size="small"
                            title={
                                <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                    Texnika bo'yicha Jadval
                                </Text>
                            }
                            style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            {renderTechniqueTable()}
                        </Card>

                        {/* Errors and Weaknesses */}
                        <Card
                            size="small"
                            title={
                                <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                    Xatolar va Kamchiliklar
                                </Text>
                            }
                            style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            {renderErrorsAndWeaknesses()}
                        </Card>

                        {/* Recommendations */}
                        <Card
                            size="small"
                            title={
                                <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                    Operator uchun Tavsiyalar
                                </Text>
                            }
                            style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            {renderRecommendations()}
                        </Card>

                        {/* Probing Questions */}
                        <Card
                            size="small"
                            title={
                                <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                    Keyingi Qo'ng'iroq uchun Savollar
                                </Text>
                            }
                            style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            {renderProbingQuestions()}
                        </Card>

                        {/* Strengths and Weaknesses */}
                        <Card
                            size="small"
                            title={
                                <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                    Kuchli va Zaif Tomonlar
                                </Text>
                            }
                            style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            {renderStrengthsWeaknesses()}
                        </Card>

                        {/* Decision Calculation */}
                        <Card
                            size="small"
                            title={
                                <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                    Decision-to-Pay Hisoblash
                                </Text>
                            }
                            style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            {renderDecisionCalculation()}
                        </Card>
                    </div>
                    :
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
                }
                </>

            }
        </Modal>
    )
}

export default LeadAnalysisThinkModal