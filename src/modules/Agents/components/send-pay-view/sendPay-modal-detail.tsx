import type React from "react"
import { Modal, Table, Tag, Progress, Card, Divider, Row, Col, Typography, Space, Statistic, Spin, Button } from "antd"
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
    CalculatorOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import PdfDownloadSendPay from "./sendPay-pdf-download"
import { useGetDetailLeadQuery } from "services/api/leads/leads.api"
import { useState } from "react"

const { Title, Text, Paragraph } = Typography

// Interfaces for type safety
interface Technique {
    name: string
    status: string
    score?: number
    example_time?: string | null
    depth_comments: string
    recommendation?: string
    recommendations?: string
    confidence?: string
}

interface Analysis {
    umumiy_xulosa?: {
        title?: string
        description?: string
        lead_classification?: { type: string; options: string[] }
        decision_to_pay_percentage?: { percentage: number; confidence: string }
        content?: string
    }
    oylayman_sabab_diagnostikasi?: {
        title: string
        asosiy_sabab?: { description: string; quote?: string; time?: string }
        qoshimcha_sabablar?: Array<{ description: string; quote?: string; time?: string }>
    }
    texnika_jadvali?: {
        title: string
        techniques: Technique[]
    }
    xatolar_kamchiliklar?: {
        title: string
        description?: string
        items: Array<{ time?: string; error: string; severity?: string; playbook_fix?: string }> | string[]
    }
    tavsiyalar?: {
        title: string
        description: string
        items: string[]
    }
    probing_savollar?: {
        title: string
        questions: string[]
    }
    cross_call_timeline?: {
        title: string
        calls: Array<{ call_number: number; description: string }>
    }
    decision_to_pay_hisoblash?: {
        title: string
        breakdown: string
        final_percentage: number
    }
    sotuvni_yakunlash?: {
        title: string
        description: string
        actions: string[]
    }
    kuchli_tomonlar?: {
        title: string
        items: Array<{ rank?: number; description: string }> | string[]
    }
    zaif_tomonlar?: {
        title: string
        items: Array<{ rank?: number; description: string }> | string[]
    }
    coachable_moment?: {
        title: string
        takeaway: string
    }
    tolov_ehtimoli?: {
        justification?: string
        percentage?: number
    }
}

interface ChecklistTable {
    Technique: string[]
    "✅/⚠/❌": string[]
    "Example & time": string[]
    "Depth & comments": string[]
    Recommendations: string[]
}

interface AnalysedData {
    response_format?: string
    analysis?: Analysis
    final_rule?: string
    // Fields for direct structure
    "Umumiy xulosa"?: string
    "Checklist Table"?: ChecklistTable
    "Xatolar va kamchiliklar (with timestamps)"?: Array<{
        Texnika: string
        "✅/❌": string
        "Nima ishlatilgan (yoki ishlatilmagan)": string
        Tavsiyalar: string
    }>
    "Operator uchun tavsiyalar"?: string[]
    "Xarid ehtimoli (%)"?: string
    "Sotuvni yakunlash uchun nima qilish mumkin edi"?: string[]
    "Top 3 Strengths"?: string[]
    "Top 3 Weaknesses"?: string[]
    "Lead Class"?: string
}

interface LeadAnalysisSendPayModalProps {
    open: boolean
    onClose: () => void
    lead_id: number | null
}

const LeadAnalysisSendPayModal: React.FC<LeadAnalysisSendPayModalProps> = ({ open, onClose, lead_id }) => {
    if (!lead_id) return null;
    const [view, setView] = useState<"dashboard" | "text">("dashboard");

    const { data, isLoading, isError } = useGetDetailLeadQuery({ leadId: Number(lead_id) });


    if (isError || !data) {
        return <Modal open={open} onCancel={onClose} footer={null}><Text>Error loading lead data.</Text></Modal>;
    }

    const analysedData = data?.analysed_data || null;
    // Normalize analysedData to a single object
    const normalizedData: AnalysedData = Array.isArray(analysedData) ? analysedData[0] || {} : analysedData || {}

    // Helper to compute score from status
    const getScoreFromStatus = (status: string): number => {
        if (status === "✅") return 100;
        if (status === "⚠") return 50;
        if (status === "❌") return 0;
        return 0;
    };

    // Normalize analysis to ensure it's always of type Analysis
    let analysis: Analysis = normalizedData?.analysis || {
        umumiy_xulosa: normalizedData["Umumiy xulosa"]
            ? { content: normalizedData["Umumiy xulosa"] }
            : undefined,
        texnika_jadvali: normalizedData["Checklist Table"]
            ? {
                title: "Texnika bo'yicha jadval",
                techniques: (normalizedData["Checklist Table"].Technique || []).map((name, index) => {
                    const status = normalizedData["Checklist Table"]?.["✅/⚠/❌"]?.[index] ?? "";
                    return {
                        name,
                        status,
                        score: getScoreFromStatus(status),
                        example_time: normalizedData["Checklist Table"]?.["Example & time"]?.[index] || null,
                        depth_comments: normalizedData["Checklist Table"]?.["Depth & comments"]?.[index] ?? "",
                        recommendation: normalizedData["Checklist Table"]?.Recommendations?.[index],
                    };
                }),
            }
            : undefined,
        xatolar_kamchiliklar: normalizedData["Xatolar va kamchiliklar (with timestamps)"]
            ? {
                title: "Xatolar va kamchiliklar",
                items: (normalizedData["Xatolar va kamchiliklar (with timestamps)"] || []).map((item) => ({
                    error: `${item.Texnika}: ${item["Nima ishlatilgan (yoki ishlatilmagan)"]}`,
                    severity: item["✅/❌"] === "❌" ? "Major" : "Minor",
                    playbook_fix: item.Tavsiyalar,
                })),
            }
            : normalizedData["Operator uchun tavsiyalar"]
                ? {
                    title: "Xatolar va kamchiliklar",
                    items: (normalizedData["Operator uchun tavsiyalar"] || []).map((desc: string) => ({
                        error: desc,
                    })),
                }
                : undefined,
        kuchli_tomonlar: normalizedData["Top 3 Strengths"]
            ? {
                title: "Top 3 kuchli tomonlar",
                items: (normalizedData["Top 3 Strengths"] || []).map((desc: string, index: number) => ({
                    rank: index + 1,
                    description: desc,
                })),
            }
            : undefined,
        zaif_tomonlar: normalizedData["Top 3 Weaknesses"]
            ? {
                title: "Top 3 zaif tomonlar",
                items: (normalizedData["Top 3 Weaknesses"] || []).map((desc: string, index: number) => ({
                    rank: index + 1,
                    description: desc,
                })),
            }
            : undefined,
        decision_to_pay_hisoblash: normalizedData["Xarid ehtimoli (%)"]
            ? {
                title: "Decision-to-Pay Hisoblash",
                breakdown: "Based on provided data",
                final_percentage: Number.parseInt(normalizedData["Xarid ehtimoli (%)"]) || 0,
            }
            : undefined,
    };

    // Post-normalization fixes for inconsistencies in data structures
    if (analysis.texnika_jadvali?.techniques) {
        analysis = {
            ...analysis,
            texnika_jadvali: {
                ...analysis.texnika_jadvali,
                techniques: analysis.texnika_jadvali.techniques.map(tech => ({
                    ...tech,
                    score: tech.score ?? getScoreFromStatus(tech.status),
                    recommendation: tech.recommendation || tech.recommendations,
                })),
            },
        };
    }



    // Fix for techniques mutation (from previous response)
    if (analysis.texnika_jadvali?.techniques) {
        analysis = {
            ...analysis,
            texnika_jadvali: {
                ...analysis.texnika_jadvali,
                techniques: analysis.texnika_jadvali.techniques.map(tech => ({
                    ...tech,
                    score: tech.score ?? getScoreFromStatus(tech.status),
                    recommendation: tech.recommendation || tech.recommendations,
                })),
            },
        };
    }

    // Fixes for the provided code blocks
    if (analysis.kuchli_tomonlar?.items && typeof analysis.kuchli_tomonlar.items[0] === 'string') {
        analysis = {
            ...analysis,
            kuchli_tomonlar: {
                ...analysis.kuchli_tomonlar,
                items: (analysis.kuchli_tomonlar.items as string[]).map((desc, i) => ({
                    rank: i + 1,
                    description: desc,
                })),
            },
        };
    }

    if (analysis.zaif_tomonlar?.items && typeof analysis.zaif_tomonlar.items[0] === 'string') {
        analysis = {
            ...analysis,
            zaif_tomonlar: {
                ...analysis.zaif_tomonlar,
                items: (analysis.zaif_tomonlar.items as string[]).map((desc, i) => ({
                    rank: i + 1,
                    description: desc,
                })),
            },
        };
    }

    if (analysis.xatolar_kamchiliklar?.items && typeof analysis.xatolar_kamchiliklar.items[0] === 'string') {
        analysis = {
            ...analysis,
            xatolar_kamchiliklar: {
                ...analysis.xatolar_kamchiliklar,
                items: (analysis.xatolar_kamchiliklar.items as string[]).map(desc => ({
                    error: desc,
                })),
            },
        };
    }

    if (!analysis.decision_to_pay_hisoblash && analysis.tolov_ehtimoli) {
        analysis = {
            ...analysis,
            decision_to_pay_hisoblash: {
                title: "To'lov Ehtimoli Hisoblash",
                breakdown: analysis.tolov_ehtimoli.justification || "No detailed breakdown provided",
                final_percentage: analysis.tolov_ehtimoli.percentage || 0,
            },
        };
    }

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
        const percentage =
            analysis.decision_to_pay_hisoblash?.final_percentage ||
            analysis.umumiy_xulosa?.decision_to_pay_percentage?.percentage ||
            analysis.tolov_ehtimoli?.percentage ||
            (normalizedData["Xarid ehtimoli (%)"] ? Number.parseInt(normalizedData["Xarid ehtimoli (%)"]) : 0)

        return isNaN(percentage) ? 0 : percentage
    }

    const getProbabilityColor = (percentage: number) => {
        if (percentage >= 70) return "#52c41a"
        if (percentage >= 40) return "#faad14"
        return "#ff4d4f"
    }

    const renderTechniqueTable = () => {
        if (!analysis.texnika_jadvali?.techniques || analysis.texnika_jadvali.techniques.length === 0) return null

        const dataSource = analysis.texnika_jadvali.techniques.map((technique, index) => ({
            key: index,
            name: technique.name,
            status: technique.status,
            score: technique.score || 0,
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
                render: (time: string | null) =>
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
                render: (text: string | undefined) =>
                    text && text !== "Yo'q" ? (
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

    const renderTechniqueChart = () => {
        if (!analysis.texnika_jadvali?.techniques || analysis.texnika_jadvali.techniques.length === 0) return null

        const chartData = analysis.texnika_jadvali.techniques.map((tech) => ({
            name: tech.name.split("(")[0].trim(),
            score: tech.score || 0,
        }))

        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#1890ff" />
                </BarChart>
            </ResponsiveContainer>
        )
    }

    const renderGeneralSummary = () => {
        if (!analysis.umumiy_xulosa) return null

        return (
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card size="small" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <Title level={5}>{analysis.umumiy_xulosa.title || "Umumiy Xulosa"}</Title>
                        {analysis.umumiy_xulosa.description && <Text type="secondary">{analysis.umumiy_xulosa.description}</Text>}
                        <Space direction="vertical" style={{ width: "100%" }}>
                            {analysis.umumiy_xulosa.content ? (
                                <Text>{analysis.umumiy_xulosa.content}</Text>
                            ) : (
                                <>
                                    {analysis.umumiy_xulosa.lead_classification && (
                                        <>
                                            <Text strong className="text-blue-600 text-lg">
                                                {analysis.umumiy_xulosa.lead_classification.type}
                                            </Text>
                                            <Text type="secondary">Variantlar:</Text>
                                            <Space wrap>
                                                {analysis.umumiy_xulosa.lead_classification.options?.map((option, idx) => (
                                                    <Tag
                                                        key={idx}
                                                        color={option === analysis.umumiy_xulosa?.lead_classification?.type ? "blue" : "default"}
                                                    >
                                                        {option}
                                                    </Tag>
                                                ))}
                                            </Space>
                                        </>
                                    )}
                                    {analysis.umumiy_xulosa.decision_to_pay_percentage && (
                                        <>
                                            <Title level={5}>To'lash Qarori Ehtimoli</Title>
                                            <Progress
                                                percent={analysis?.umumiy_xulosa?.decision_to_pay_percentage?.percentage || 0}
                                                strokeColor={getProbabilityColor(
                                                    analysis?.umumiy_xulosa?.decision_to_pay_percentage?.percentage || 0,
                                                )}
                                                format={() => `${analysis?.umumiy_xulosa?.decision_to_pay_percentage?.percentage}%`}
                                                size="default"
                                            />
                                            <Text type="secondary">
                                                Ishonch darajasi: {analysis?.umumiy_xulosa?.decision_to_pay_percentage?.confidence}
                                            </Text>
                                        </>
                                    )}
                                </>
                            )}
                        </Space>
                    </Card>
                </Col>
            </Row>
        )
    }

    const renderReasonDiagnostics = () => {
        if (!analysis.oylayman_sabab_diagnostikasi) return null

        return (
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <Card size="small" style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
                    <Title level={5} className="text-red-700">
                        {analysis.oylayman_sabab_diagnostikasi.title || "Asosiy Sabab"}
                    </Title>
                    <Paragraph style={{ margin: 0 }}>{analysis.oylayman_sabab_diagnostikasi.asosiy_sabab?.description}</Paragraph>
                    {analysis.oylayman_sabab_diagnostikasi.asosiy_sabab?.quote && (
                        <blockquote
                            style={{
                                borderLeft: "4px solid #ef4444",
                                paddingLeft: "12px",
                                margin: "8px 0",
                                fontStyle: "italic",
                                color: "#991b1b",
                            }}
                        >
                            {analysis.oylayman_sabab_diagnostikasi.asosiy_sabab.quote}
                            <Text type="secondary" style={{ display: "block", fontSize: "12px" }}>
                                Vaqt: {analysis.oylayman_sabab_diagnostikasi.asosiy_sabab.time || "-"}
                            </Text>
                        </blockquote>
                    )}
                </Card>

                {analysis.oylayman_sabab_diagnostikasi.qoshimcha_sabablar && (
                    <Card size="small" style={{ backgroundColor: "#fffbeb", border: "1px solid #fed7aa" }}>
                        <Title level={5} className="text-orange-700">
                            Qo'shimcha Sabablar
                        </Title>
                        {analysis.oylayman_sabab_diagnostikasi.qoshimcha_sabablar.map((sabab, idx) => (
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
                                            Vaqt: {sabab.time || "-"}
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
        if (!analysis.xatolar_kamchiliklar?.items || analysis.xatolar_kamchiliklar.items.length === 0) return null

        // Normalize items to always be objects with optional time extracted
        const normalizedItems = analysis.xatolar_kamchiliklar.items.map(item => {
            if (typeof item === 'string') {
                let errorText = item;
                let time: string | undefined;
                const timeMatch = errorText.match(/\(([\d:]+)\)$/);
                if (timeMatch) {
                    time = timeMatch[1];
                    errorText = errorText.replace(/\([\d:]+\)$/, '').trim();
                }
                return { error: errorText, time, severity: 'Minor', playbook_fix: undefined };
            }
            return { ...item, severity: item.severity || 'Minor' };
        });

        return (
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                {normalizedItems.map((error, idx) => (
                    <Card
                        key={idx}
                        size="small"
                        style={{
                            backgroundColor: error.severity === "Critical" || error.severity === "Major" ? "#fef2f2" : "#fffbeb",
                            border: `1px solid ${error.severity === "Critical" || error.severity === "Major" ? "#fecaca" : "#fed7aa"}`,
                            borderLeft: `4px solid ${error.severity === "Critical" || error.severity === "Major" ? "#ef4444" : "#f59e0b"}`,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                    >
                        <Row gutter={[16, 8]} align="middle">
                            <Col xs={24} sm={6}>
                                <Space>
                                    {error.severity === "Critical" || error.severity === "Major" ? (
                                        <CloseCircleOutlined style={{ color: "#ef4444", fontSize: 16 }} />
                                    ) : (
                                        <WarningOutlined style={{ color: "#f59e0b", fontSize: 16 }} />
                                    )}
                                    <Tag color={error.severity === "Critical" || error.severity === "Major" ? "red" : "orange"}>
                                        {error.severity}
                                    </Tag>
                                </Space>
                            </Col>
                            <Col xs={24} sm={6}>
                                <Text code style={{ fontSize: "12px" }}>
                                    {error.time || "-"}
                                </Text>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Text style={{ fontSize: "13px" }}>{error.error}</Text>
                                {error.playbook_fix && (
                                    <>
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
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Space>
        )
    }

    const renderRecommendations = () => {
        if (!analysis.tavsiyalar?.items) return null

        return (
            <Card
                size="small"
                style={{ backgroundColor: "#fffbeb", border: "1px solid #fed7aa", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            >
                <Space direction="vertical" style={{ width: "100%" }} size="small">
                    <Text strong style={{ color: "#d97706" }}>
                        <BulbOutlined style={{ marginRight: 8 }} />
                        {analysis.tavsiyalar.description}
                    </Text>
                    {analysis.tavsiyalar.items.map((item, idx) => (
                        <Text key={idx} style={{ color: "#92400e", fontSize: "14px" }}>
                            💡 {item}
                        </Text>
                    ))}
                </Space>
            </Card>
        )
    }

    const renderStrengthsWeaknesses = () => {
        if (!analysis.kuchli_tomonlar && !analysis.zaif_tomonlar) return null

        return (
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    {analysis.kuchli_tomonlar?.items && (
                        <Card
                            size="small"
                            style={{
                                backgroundColor: "#f0fdf4",
                                border: "1px solid #bbf7d0",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            <Space direction="vertical" style={{ width: "100%" }} size="small">
                                <Text strong style={{ color: "#15803d" }}>
                                    <TrophyOutlined style={{ marginRight: 8 }} />
                                    {analysis.kuchli_tomonlar.title || "Top 3 Kuchli Tomonlar"}
                                </Text>
                                {(analysis.kuchli_tomonlar.items as Array<{ rank?: number; description: string }>).map((item, idx) => (
                                    <Text key={idx} style={{ color: "#166534", fontSize: "14px" }}>
                                        <CheckCircleOutlined style={{ color: "#22c55e", marginRight: 6 }} />
                                        {item.rank ? `${item.rank}. ` : ""}
                                        {item.description}
                                    </Text>
                                ))}
                            </Space>
                        </Card>
                    )}
                </Col>
                <Col xs={24} md={12}>
                    {analysis.zaif_tomonlar?.items && (
                        <Card
                            size="small"
                            style={{
                                backgroundColor: "#fef2f2",
                                border: "1px solid #fecaca",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            <Space direction="vertical" style={{ width: "100%" }} size="small">
                                <Text strong style={{ color: "#dc2626" }}>
                                    <BugOutlined style={{ marginRight: 8 }} />
                                    {analysis.zaif_tomonlar.title || "Top 3 Zaif Tomonlar"}
                                </Text>
                                {(analysis.zaif_tomonlar.items as Array<{ rank?: number; description: string }>).map((item, idx) => (
                                    <Text key={idx} style={{ color: "#991b1b", fontSize: "14px" }}>
                                        <CloseCircleOutlined style={{ color: "#ef4444", marginRight: 6 }} />
                                        {item.rank ? `${item.rank}. ` : ""}
                                        {item.description}
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
        if (!analysis.decision_to_pay_hisoblash) return null

        return (
            <Card
                size="small"
                style={{ backgroundColor: "#f5f3ff", border: "1px solid #c4b5fd", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            >
                <Space direction="vertical" style={{ width: "100%" }} size="middle">
                    <Text strong style={{ color: "#7c3aed" }}>
                        <CalculatorOutlined style={{ marginRight: 8 }} />
                        {analysis.decision_to_pay_hisoblash.title || "Hisoblash Jarayoni"}
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
                            overflowX: "auto",
                        }}
                    >
                        {analysis.decision_to_pay_hisoblash.breakdown}
                    </pre>
                    <Statistic
                        title="Yakuniy Natija"
                        value={analysis.decision_to_pay_hisoblash.final_percentage}
                        suffix="%"
                        valueStyle={{ color: getProbabilityColor(analysis.decision_to_pay_hisoblash.final_percentage) }}
                    />
                </Space>
            </Card>
        )
    }

    const renderClosingActions = () => {
        if (!analysis.sotuvni_yakunlash?.actions) return null

        return (
            <Card
                size="small"
                style={{ backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            >
                <Space direction="vertical" style={{ width: "100%" }} size="small">
                    <Text strong style={{ color: "#2563eb" }}>
                        <BulbOutlined style={{ marginRight: 8 }} />
                        {analysis.sotuvni_yakunlash.title || "Sotuvni yakunlash uchun nima qilish mumkin edi"}
                    </Text>
                    <Text type="secondary">{analysis.sotuvni_yakunlash.description}</Text>
                    {analysis.sotuvni_yakunlash.actions.map((action, idx) => (
                        <Text key={idx} style={{ color: "#1e40af", fontSize: "14px" }}>
                            💡 {action}
                        </Text>
                    ))}
                </Space>
            </Card>
        )
    }

    const renderFinalRule = () => {
        if (!normalizedData.final_rule) return null

        return (
            <Card
                size="small"
                style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            >
                <Space direction="vertical" style={{ width: "100%" }} size="small">
                    <Text strong style={{ color: "#374151" }}>
                        <CalculatorOutlined style={{ marginRight: 8 }} />
                        Yakuniy Xulosa
                    </Text>
                    <Text style={{ color: "#374151", fontSize: "14px" }}>{normalizedData.final_rule}</Text>
                </Space>
            </Card>
        )
    }

    const purchaseProbability = getPurchaseProbability()
    const leadClass = analysis.umumiy_xulosa?.lead_classification?.type || normalizedData["Lead Class"] || "Unknown"

    return (
        <Modal
            open={open}
            onCancel={() => {
                console.log("SendPay modal closed")
                onClose()
            }}
            footer={null}
            width={1200}
            mask
            styles={{
                mask: { backgroundColor: "rgba(0, 0, 0, 0.15)" },
                body: { padding: "16px", backgroundColor: "#f9fafb" },
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        justifyContent: "space-between",
                        borderBottom: "1px solid #e5e7eb",
                        paddingBottom: "12px",
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
                        <PdfDownloadSendPay data={normalizedData} transcriptions={data?.transcriptions} crm_id={data?.crm_id} />
                    </div>
                </div>
            }
        >
            {isLoading ? <Spin style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                : <> {view === "dashboard" ? (

                    <div style={{ maxHeight: "75vh", overflowY: "auto", padding: "4px" }}>
                        {/* Key Metrics Row */}
                        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                            <Col xs={24} sm={8}>
                                <Card
                                    size="small"
                                    style={{
                                        textAlign: "center",
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bfdbfe",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                    }}
                                >
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
                                <Card
                                    size="small"
                                    style={{
                                        textAlign: "center",
                                        backgroundColor: "#f5f3ff",
                                        border: "1px solid #c4b5fd",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                    }}
                                >
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
                                <Card
                                    size="small"
                                    style={{
                                        textAlign: "center",
                                        backgroundColor: "#fef3c7",
                                        border: "1px solid #fcd34d",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <ClockCircleOutlined style={{ fontSize: 24, color: "#d97706", marginBottom: 8 }} />
                                    <Title level={5} style={{ margin: 0, color: "#92400e" }}>
                                        Coachable Moment
                                    </Title>
                                    <Paragraph style={{ margin: "4px 0", color: "#92400e", fontSize: "12px" }}>
                                        {analysis.coachable_moment?.takeaway || "No coachable moment provided"}
                                    </Paragraph>
                                </Card>
                            </Col>
                        </Row>

                        <Divider style={{ margin: "16px 0" }} />

                        {/* General Summary */}
                        {analysis.umumiy_xulosa && (
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
                        )}

                        {/* Reason Diagnostics */}
                        {analysis.oylayman_sabab_diagnostikasi && (
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
                        )}

                        {/* Technique Scorecard */}
                        {analysis.texnika_jadvali && (
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
                                <>
                                    <Divider style={{ margin: "16px 0" }} />
                                    <Title level={5} style={{ marginBottom: 12 }}>
                                        Texnika Ballari Grafiki
                                    </Title>
                                    {renderTechniqueChart()}
                                </>
                            </Card>
                        )}

                        {/* Errors and Weaknesses */}
                        {analysis.xatolar_kamchiliklar && (
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
                        )}

                        {/* Recommendations */}
                        {analysis.tavsiyalar && (
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
                        )}

                        {/* Closing Actions */}
                        {analysis.sotuvni_yakunlash && (
                            <Card
                                size="small"
                                title={
                                    <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                        Sotuvni yakunlash uchun nima qilish mumkin edi
                                    </Text>
                                }
                                style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                            >
                                {renderClosingActions()}
                            </Card>
                        )}

                        {/* Decision Calculation */}
                        {analysis.decision_to_pay_hisoblash && (
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
                        )}

                        {/* Strengths and Weaknesses */}
                        {(analysis.kuchli_tomonlar || analysis.zaif_tomonlar) && (
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
                        )}

                        {/* Final Rule */}
                        {normalizedData.final_rule && (
                            <Card
                                size="small"
                                title={
                                    <Text strong style={{ color: "#374151", fontSize: "15px" }}>
                                        Yakuniy Xulosa
                                    </Text>
                                }
                                style={{ marginBottom: 16, borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
                            >
                                {renderFinalRule()}
                            </Card>
                        )}
                    </div>) :
                    <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
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

export default LeadAnalysisSendPayModal