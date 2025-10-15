import { Button } from "antd"
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Link } from "@react-pdf/renderer"
import { Font } from "@react-pdf/renderer"
import NotoSansRegular from "../../../../assets/fonts/NotoSans-Regular.ttf"
import NotoSansBold from "../../../../assets/fonts/NotoSans-Bold.ttf"

Font.register({
    family: "NotoSans",
    fonts: [
        { src: NotoSansRegular, fontWeight: "normal" },
        { src: NotoSansBold, fontWeight: "bold" },
    ],
})


// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        fontFamily: "NotoSans",
        backgroundColor: "#fafafa",
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        color: "#059669",
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#10b981",
    },
    subheader: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#047857",
    },
    text: {
        marginBottom: 6,
        fontSize: 11,
        lineHeight: 1.5,
        color: "#374151",
    },
    table: {
        width: "auto",
        marginBottom: 15,
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#d1d5db",
    },
    tableRow: {
        flexDirection: "row",
        minHeight: 40,
    },
    tableCol: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#e5e7eb",
        padding: 8,
        justifyContent: "center",
    },
    tableHeaderCol: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#d1d5db",
        padding: 10,
        backgroundColor: "#059669",
        justifyContent: "center",
    },
    tableCell: {
        fontSize: 10,
        lineHeight: 1.4,
        color: "#4b5563",
    },
    tableCellBold: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#ffffff",
    },
    tableHeaderRow: {
        flexDirection: "row",
        backgroundColor: "#059669",
        minHeight: 45,
    },
    cardContainer: {
        marginBottom: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 12,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#047857",
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#d1fae5",
    },
    metricCard: {
        padding: 20,
        marginBottom: 15,
        textAlign: "center",
        borderWidth: 2,
        borderColor: "#10b981",
        borderRadius: 16,
        backgroundColor: "#ecfdf5",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    metricTitle: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#047857",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    metricValue: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#059669",
    },
    strengthsCard: {
        backgroundColor: "#f0fdf4",
        borderColor: "#22c55e",
        borderWidth: 2,
        borderLeftWidth: 6,
        borderLeftColor: "#16a34a",
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
    },
    weaknessCard: {
        backgroundColor: "#fef2f2",
        borderColor: "#ef4444",
        borderWidth: 2,
        borderLeftWidth: 6,
        borderLeftColor: "#dc2626",
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
    },
    recommendationCard: {
        backgroundColor: "#fffbeb",
        borderColor: "#f59e0b",
        borderWidth: 2,
        borderLeftWidth: 6,
        borderLeftColor: "#d97706",
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
    },
    closingCard: {
        backgroundColor: "#f0f9ff",
        borderColor: "#3b82f6",
        borderWidth: 2,
        borderLeftWidth: 6,
        borderLeftColor: "#2563eb",
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
    },
    errorCard: {
        backgroundColor: "#fef2f2",
        borderColor: "#ef4444",
        borderWidth: 2,
        borderLeftWidth: 6,
        borderLeftColor: "#dc2626",
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
    },
    listItem: {
        fontSize: 11,
        marginBottom: 6,
        color: "#4b5563",
        lineHeight: 1.5,
        paddingLeft: 8,
    },
    errorText: {
        fontSize: 10,
        marginBottom: 4,
        lineHeight: 1.4,
        color: "#991b1b",
    },
    metricsRow: {
        flexDirection: "row",
        marginBottom: 30,
        gap: 15,
    },
    metricWrapper: {
        flex: 1,
    },
    summaryCard: {
        backgroundColor: "#f8fafc",
        borderWidth: 2,
        borderColor: "#059669",
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
    },
    summaryText: {
        fontSize: 12,
        lineHeight: 1.6,
        color: "#374151",
        textAlign: "justify",
    },
    formulaText: {
        fontSize: 10,
        fontFamily: "Courier",
        backgroundColor: "#f3f4f6",
        padding: 10,
        borderRadius: 8,
        color: "#374151",
        marginBottom: 8,
    },
})

// Map status values to visual representation
const getStatusInfo = (status: string) => {
    switch (status) {
        case "✅":
            return { label: "OK", color: "#16a34a" }
        case "⚠":
            return { label: "WARN", color: "#d97706" }
        case "❌":
            return { label: "FAIL", color: "#dc2626" }
        default:
            return { label: status || "-", color: "#6b7280" }
    }
}

// Get color for scores and percentages
const getScoreColor = (score: number) => {
    if (score >= 70) return "#16a34a" // green
    if (score >= 40) return "#d97706" // orange
    return "#dc2626" // red
}

// Type definitions
interface Technique {
    name: string
    status: string
    score?: number
    example_time?: string | null
    depth_comments: string
    recommendation?: string
}

interface ErrorItem {
    time?: string
    error: string
    severity?: string
    playbook_fix?: string
}

interface Analysis {
    umumiy_xulosa?: {
        title?: string
        description?: string
        content?: string
    }
    texnika_jadvali?: {
        title: string
        techniques: Technique[]
    }
    xatolar_kamchiliklar?: {
        title: string
        description?: string
        items: (string | ErrorItem)[] // Allow both string and ErrorItem types
    }
    tavsiyalar?: {
        title: string
        description: string
        items: string[]
    }
    tolov_ehtimoli?: {
        title?: string
        percentage?: number
        justification?: string
    }
    sotuvni_yakunlash?: {
        title: string
        description: string
        actions: string[]
    }
    kuchli_tomonlar?: {
        title: string
        items: string[]
    }
    zaif_tomonlar?: {
        title: string
        items: string[]
    }
}

export interface AnalysedData {
    response_format?: string
    analysis?: Analysis
    final_rule?: string
}

interface PdfDownloadSendPayProps {
    data: any
    transcriptions: any
    crm_id: any
}


const MyDoc = ({ data, transcriptions, crm_id }: { data: any, transcriptions: any, crm_id: any }) => {
    // Normalize data to handle array or single object
    const normalizedData: AnalysedData = Array.isArray(data) ? data[0] || {} : data
    const analysisData: Analysis = normalizedData.analysis || {}

    // Extract key metrics with fallbacks
    const umumiyXulosa = analysisData.umumiy_xulosa || {}
    const decisionPercentage = analysisData.tolov_ehtimoli?.percentage || 0
    const leadClass = "Unknown" // No lead_classification in provided data

    // Techniques table data
    const texnikaJadvali = analysisData.texnika_jadvali?.techniques || []

    // Errors and weaknesses
    const xatolar = analysisData?.xatolar_kamchiliklar?.items || []

    // Strengths and weaknesses
    const kuchliTomonlar = analysisData.kuchli_tomonlar?.items || []
    const zaifTomonlar = analysisData.zaif_tomonlar?.items || []

    // Recommendations
    const tavsiyalar = analysisData.tavsiyalar?.items || []

    // Closing actions
    const sotuvniYakunlash = analysisData.sotuvni_yakunlash?.actions || []

    // Final rule
    const finalRule = normalizedData.final_rule || ""

    const renderTechniquesTable = () => {
        if (!texnikaJadvali.length) return null

        return (
            <View wrap={false} style={{ marginBottom: 20 }}>
                <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                        <View style={[styles.tableHeaderCol, { flex: 2 }]}>
                            <Text style={styles.tableCellBold}>Texnika</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 1 }]}>
                            <Text style={styles.tableCellBold}>Holati</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 1 }]}>
                            <Text style={styles.tableCellBold}>Ball</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 1.5 }]}>
                            <Text style={styles.tableCellBold}>Vaqt</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 2.5 }]}>
                            <Text style={styles.tableCellBold}>Izohlar</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 3, borderRightWidth: 0 }]}>
                            <Text style={styles.tableCellBold}>Tavsiyalar</Text>
                        </View>
                    </View>
                    {texnikaJadvali.map((technique: Technique, index: number) => {
                        const { label: statusLabel, color: statusColor } = getStatusInfo(technique.status)
                        const isEvenRow = index % 2 === 0
                        const score = technique.score || 0

                        return (
                            <View key={index} style={[styles.tableRow, { backgroundColor: isEvenRow ? "#f9fafb" : "#ffffff" }]}>
                                <View style={[styles.tableCol, { flex: 2 }]}>
                                    <Text style={[styles.tableCell, { fontWeight: "bold" }]}>{technique.name || "-"}</Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 1 }]}>
                                    <Text style={[styles.tableCell, { color: statusColor, fontWeight: "bold" }]}>{statusLabel}</Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 1 }]}>
                                    <Text style={[styles.tableCell, { color: getScoreColor(score), fontWeight: "bold" }]}>{score}%</Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 1.5 }]}>
                                    <Text style={styles.tableCell}>{technique.example_time || "-"}</Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 2.5 }]}>
                                    <Text style={styles.tableCell}>{technique.depth_comments || "-"}</Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 3, borderRightWidth: 0 }]}>
                                    <Text style={[styles.tableCell, { color: "#d97706" }]}>
                                        {technique.recommendation === "Yo'q" ? "Tavsiyalar yo'q" : technique.recommendation || "-"}
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    const renderErrorsSection = () => {
        if (!xatolar.length) return null

        return (
            <View wrap={false} style={{ marginBottom: 12 }}>
                {xatolar.map((error: string | ErrorItem, idx: number) => {
                    // Handle both string and object formats
                    const errorText = typeof error === "string" ? error : error.error
                    const errorTime = typeof error === "object" && error.time ? ` (${error.time})` : ""
                    const severity = typeof error === "object" && error.severity ? ` [${error.severity}]` : ""

                    return (
                        <View key={idx} style={styles.errorCard}>
                            <Text style={[styles.errorText, { fontWeight: "bold" }]}>
                                {errorText}
                                {errorTime}
                                {severity}
                            </Text>
                            {typeof error === "object" && error.playbook_fix && (
                                <Text style={[styles.errorText, { color: "#d97706", marginTop: 4 }]}>Fix: {error.playbook_fix}</Text>
                            )}
                        </View>
                    )
                })}
            </View>
        )
    }

    const renderClosingActions = () => {
        if (!sotuvniYakunlash.length) return null

        return (
            <View style={styles.section}>
                <Text style={styles.cardTitle}>Sotuvni Yakunlash Uchun Harakatlar</Text>
                <View style={styles.closingCard}>
                    {sotuvniYakunlash.map((action: string, idx: number) => (
                        <Text key={idx} style={[styles.listItem, { color: "#1e40af" }]}>
                            {idx + 1}. {action}
                        </Text>
                    ))}
                </View>
            </View>
        )
    }

    const renderFinalRule = () => {
        if (!finalRule) return null

        return (
            <View style={styles.section}>
                <Text style={styles.cardTitle}>Yakuniy Xulosa</Text>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryText}>{finalRule}</Text>
                </View>
            </View>
        )
    }

    const renderTranscriptions = (transcriptions: any) => {
        if (!Array.isArray(transcriptions)) return null;

        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.cardTitle}>Call Transcriptions</Text>
                {transcriptions.map((conversation, convIdx) => (
                    <View key={convIdx} style={styles.cardContainer}>
                        {Array.isArray(conversation) ? conversation.map((line: any, lineIdx: number) => (
                            <Text key={lineIdx} style={styles.text}>
                                <Text style={{ fontWeight: "bold" }}>
                                    {line.speaker ? line.speaker.toUpperCase() : "Unknown"}:
                                </Text>{" "}
                                {line.text}
                            </Text>
                        )) : null}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>Lead Tahlili Hisoboti</Text>

                {/* Key Metrics Row */}
                <View style={styles.metricsRow}>
                    <View style={[styles.metricCard, styles.metricWrapper]}>
                        <Text style={styles.metricTitle}>{analysisData.tolov_ehtimoli?.title || "To'lov Ehtimoli"}</Text>
                        <Text style={[styles.metricValue, { color: getScoreColor(decisionPercentage) }]}>
                            {decisionPercentage}%
                        </Text>
                    </View>
                    <View
                        style={[styles.metricCard, styles.metricWrapper, { backgroundColor: "#f0f9ff", borderColor: "#3b82f6" }]}
                    >
                        <Text style={[styles.metricTitle, { color: "#1e40af" }]}>Lead Klassi</Text>
                        <Text style={[styles.metricValue, { color: "#2563eb", fontSize: 18 }]}>{leadClass}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 12, marginBottom: 4 }}>CRM Link:</Text>
                    <Link

                        src={`https://b24-l2y8pg.bitrix24.kz/crm/lead/details/${crm_id}/`}
                        style={{ fontSize: 12, color: "blue", textDecoration: "underline" }}

                    >
                        {`https://b24-l2y8pg.bitrix24.kz/crm/lead/details/${crm_id}/`}
                    </Link>
                </View>

                {/* General Summary */}
                {umumiyXulosa.content && (
                    <View style={styles.section} wrap={false}>
                        <Text style={styles.cardTitle}>{umumiyXulosa.title || "Umumiy Xulosa"}</Text>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryText}>{umumiyXulosa.description}</Text>
                            <Text style={styles.summaryText}>{umumiyXulosa.content}</Text>
                        </View>
                    </View>
                )}

                {/* Techniques Table */}
                {texnikaJadvali.length > 0 && (
                    <View style={styles.section} break>
                        <Text style={styles.cardTitle}>{analysisData.texnika_jadvali?.title || "Texnika bo'yicha Jadval"}</Text>
                        {renderTechniquesTable()}
                    </View>
                )}

                {/* Errors and Issues */}
                {xatolar.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>
                            {analysisData.xatolar_kamchiliklar?.title || "Xatolar va Kamchiliklar"}
                        </Text>
                        {renderErrorsSection()}
                    </View>
                )}

                {/* Strengths */}
                {kuchliTomonlar.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>{analysisData.kuchli_tomonlar?.title || "Top 3 Kuchli Tomonlar"}</Text>
                        <View style={styles.strengthsCard}>
                            {kuchliTomonlar.map((strength: string, idx: number) => (
                                <Text key={idx} style={[styles.listItem, { color: "#166534" }]}>
                                    ✓ {strength}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Weaknesses */}
                {zaifTomonlar.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>{analysisData.zaif_tomonlar?.title || "Top 3 Zaif Tomonlar"}</Text>
                        <View style={styles.weaknessCard}>
                            {zaifTomonlar.map((weakness: string, idx: number) => (
                                <Text key={idx} style={[styles.listItem, { color: "#991b1b" }]}>
                                    ✗ {weakness}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Recommendations */}
                {tavsiyalar.length > 0 && (
                    <View style={styles.section} break>
                        <Text style={styles.cardTitle}>{analysisData.tavsiyalar?.title || "Operator uchun Tavsiyalar"}</Text>
                        <View style={styles.recommendationCard}>
                            {tavsiyalar.map((tavsiya: string, idx: number) => (
                                <Text key={idx} style={[styles.listItem, { color: "#92400e" }]}>
                                    {idx + 1}. {tavsiya}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Closing Actions */}
                {sotuvniYakunlash.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>
                            {analysisData.sotuvni_yakunlash?.title || "Sotuvni Yakunlash Uchun Harakatlar"}
                        </Text>
                        {renderClosingActions()}
                    </View>
                )}

                {/* Final Rule */}
                {finalRule && (
                    <View style={styles.section}>
                        {renderFinalRule()}
                    </View>
                )}

                {renderTranscriptions(transcriptions)}
            </Page>
        </Document>
    )
}

export default function PdfDownloadSendPay({ data, transcriptions, crm_id }: PdfDownloadSendPayProps) {
    const now = new Date()
    const formatted = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(
        2,
        "0",
    )}.${now.getFullYear()}_${String(now.getHours()).padStart(2, "0")}.${String(now.getMinutes()).padStart(2, "0")}`

    return (
        <PDFDownloadLink document={<MyDoc data={data} transcriptions={transcriptions} crm_id={crm_id} />}
            fileName={`lead_tahlili_${formatted}.pdf`} className="mr-5">
            {({ loading }) =>
                loading ? (
                    <Button type="primary" loading>
                        PDF tayyorlanmoqda...
                    </Button>
                ) : (
                    <Button type="primary">PDF Yuklab Olish</Button>
                )
            }
        </PDFDownloadLink>
    )
}
