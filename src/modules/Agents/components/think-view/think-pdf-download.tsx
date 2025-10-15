import { Button } from "antd"
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Link } from "@react-pdf/renderer"


import { Font } from "@react-pdf/renderer"

// Agar lokal fayllar bo'lsa:
import NotoSansRegular from "../../../../assets/fonts/NotoSans-Regular.ttf"
import NotoSansBold from "../../../../assets/fonts/NotoSans-Bold.ttf"
import NotoSansItalic from "../../../../assets/fonts/NotoSans-Italic.ttf"
import NotoSansBoldItalic from "../../../../assets/fonts/NotoSans-BoldItalic.ttf"

Font.register({
    family: "NotoSans",
    fonts: [
        { src: NotoSansRegular, fontWeight: "normal" },              // 400
        { src: NotoSansBold, fontWeight: "bold" },                   // 700
        { src: NotoSansItalic, fontWeight: "normal", fontStyle: "italic" },      // 400 italic
        { src: NotoSansBoldItalic, fontWeight: "bold", fontStyle: "italic" },    // 700 italic
    ],
})

// --- Styles ---





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
    listItem: {
        fontSize: 11,
        marginBottom: 6,
        color: "#4b5563",
        lineHeight: 1.5,
        paddingLeft: 8,
    },
    errorCard: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 12,
        borderLeftWidth: 6,
    },
    errorTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 8,
    },
    errorText: {
        fontSize: 10,
        marginBottom: 4,
        lineHeight: 1.4,
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
    probingCard: {
        backgroundColor: "#f0f9ff",
        borderWidth: 2,
        borderColor: "#3b82f6",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
    },
    timelineCard: {
        backgroundColor: "#fef7ff",
        borderWidth: 2,
        borderColor: "#a855f7",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
    },
    formulaText: {
        fontSize: 10,
        fontFamily: "Courier",
        backgroundColor: "#f3f4f6",
        padding: 10,
        borderRadius: 8,
        color: "#374151",
        marginBottom: 8,
    }
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
interface AnalysisData {
    [key: string]: any;
    umumiy_xulosa?: any;
    texnika_jadvali?: any;
    xatolar_kamchiliklar?: any;
    kuchli_tomonlar?: any;
    zaif_tomonlar?: any;
    tavsiyalar?: any;
    probing_savollar?: any;
    cross_call_timeline?: any;
    decision_to_pay_hisoblash?: any;
    oylayman_sabab_diagnostikasi?: any;
    coachable_moment?: any;
}

const MyDoc = ({ data, transcriptions, crm_id }: { data: any, transcriptions: any, crm_id: number }) => {

    // Data structure handling - multiple possible structures
    let analysisData: AnalysisData = {}

    if (data?.analysed_data?.analysis) {
        analysisData = data.analysed_data.analysis
    } else if (data?.analysis) {
        analysisData = data.analysis
    } else if (data?.response_format) {
        analysisData = data
    } else {
        analysisData = data || {}
    }

    // Extract key metrics with fallbacks
    const umumiyXulosa = analysisData?.umumiy_xulosa || {}
    const decisionPercentage = umumiyXulosa?.decision_to_pay_percentage?.percentage ||
        analysisData?.decision_to_pay_hisoblash?.final_percentage ||
        0
    const leadClass = umumiyXulosa?.lead_classification?.type || "Unknown"
    const confidence = umumiyXulosa?.decision_to_pay_percentage?.confidence || "Unknown"

    // Techniques table data with fallbacks
    const texnikaJadvali = analysisData?.texnika_jadvali?.techniques ||
        analysisData?.texnika_jadvali ||
        []

    // Errors and weaknesses with fallbacks
    const xatolar = analysisData?.xatolar_kamchiliklar?.items ||
        analysisData?.xatolar_kamchiliklar ||
        []

    // Strengths and weaknesses with fallbacks
    const kuchliTomonlar = analysisData?.kuchli_tomonlar?.items ||
        analysisData?.kuchli_tomonlar ||
        []
    const zaifTomonlar = analysisData?.zaif_tomonlar?.items ||
        analysisData?.zaif_tomonlar ||
        []

    // Recommendations with fallbacks
    const tavsiyalar = analysisData?.tavsiyalar?.items ||
        analysisData?.tavsiyalar ||
        []

    // Probing questions with fallbacks
    const probingQuestions = analysisData?.probing_savollar?.questions ||
        analysisData?.probing_savollar ||
        []

    // Timeline with fallbacks
    const timeline = analysisData?.cross_call_timeline?.calls ||
        analysisData?.cross_call_timeline ||
        []

    // Decision calculation with fallbacks
    const decisionCalculation = analysisData?.decision_to_pay_hisoblash || {}

    const renderTechniquesTable = () => {
        if (!texnikaJadvali.length) return null

        return (
            <View wrap={false} style={{ marginBottom: 20 }}>
                <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                        <View style={[styles.tableHeaderCol, { flex: 2 }]}>
                            <Text style={styles.tableCellBold}>Technique</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 1 }]}>
                            <Text style={styles.tableCellBold}>Status</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 1 }]}>
                            <Text style={styles.tableCellBold}>Score</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 1.5 }]}>
                            <Text style={styles.tableCellBold}>Time</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 2.5 }]}>
                            <Text style={styles.tableCellBold}>Comments</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, { flex: 3, borderRightWidth: 0 }]}>
                            <Text style={styles.tableCellBold}>Recommendations</Text>
                        </View>
                    </View>

                    {texnikaJadvali.map((technique: any, index: number) => {
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
                                        {technique.recommendation === "Yo'q" ? "No recommendations" : technique.recommendation || "-"}
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
                {xatolar.map((error: any, idx: number) => {
                    const isCritical = error.severity === "Critical"
                    const isMajor = error.severity === "Major"

                    const backgroundColor = isCritical ? "#fef2f2" : isMajor ? "#fffbeb" : "#f0fdf4"
                    const borderColor = isCritical ? "#ef4444" : isMajor ? "#f59e0b" : "#22c55e"
                    const textColor = isCritical ? "#dc2626" : isMajor ? "#d97706" : "#16a34a"

                    return (
                        <View key={idx} style={[styles.errorCard, { backgroundColor, borderColor, borderLeftColor: borderColor }]}>
                            <Text style={[styles.errorTitle, { color: textColor }]}>
                                {error.severity} Error - {error.time}
                            </Text>
                            <Text style={styles.errorText}>Error: {error.error}</Text>
                            <Text style={styles.errorText}>Fix: {error.playbook_fix}</Text>
                        </View>
                    )
                })}
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
                <Text style={styles.header}>Lead Analysis Report</Text>

                {/* Key Metrics Row */}
                <View style={styles.metricsRow}>
                    <View style={[styles.metricCard, styles.metricWrapper]}>
                        <Text style={styles.metricTitle}>Decision to Pay</Text>
                        <Text style={[styles.metricValue, { color: getScoreColor(decisionPercentage) }]}>
                            {decisionPercentage}%
                        </Text>
                        <Text style={[styles.text, { fontSize: 10, textAlign: "center", marginTop: 5 }]}>
                            Confidence: {confidence}
                        </Text>
                    </View>
                    <View style={[styles.metricCard, styles.metricWrapper, { backgroundColor: "#f0f9ff", borderColor: "#3b82f6" }]}>
                        <Text style={[styles.metricTitle, { color: "#1e40af" }]}>Lead Class</Text>
                        <Text style={[styles.metricValue, { color: "#2563eb", fontSize: 18 }]}>{leadClass}</Text>
                    </View>
                </View>

                {/* General Summary */}
                {analysisData?.oylayman_sabab_diagnostikasi && (
                    <View style={styles.section} wrap={false}>
                        <Text style={styles.cardTitle}>O'ylayman sabab diagnostikasi</Text>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryText}>
                                <Text style={{ fontWeight: "bold" }}>Asosiy sabab: </Text>
                                {analysisData.oylayman_sabab_diagnostikasi?.asosiy_sabab?.description ||
                                    (typeof analysisData.oylayman_sabab_diagnostikasi?.asosiy_sabab === 'string' ?
                                        analysisData.oylayman_sabab_diagnostikasi.asosiy_sabab :
                                        JSON.stringify(analysisData.oylayman_sabab_diagnostikasi?.asosiy_sabab || {}))}
                            </Text>
                            {analysisData.oylayman_sabab_diagnostikasi?.asosiy_sabab?.quote && (
                                <Text style={[styles.summaryText, { fontStyle: "italic", marginTop: 8 }]}>
                                    "{analysisData.oylayman_sabab_diagnostikasi.asosiy_sabab.quote}" ({analysisData.oylayman_sabab_diagnostikasi.asosiy_sabab.time})
                                </Text>
                            )}
                            {analysisData.oylayman_sabab_diagnostikasi?.qoshimcha_sabablar &&
                                Array.isArray(analysisData.oylayman_sabab_diagnostikasi.qoshimcha_sabablar) && (
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={[styles.summaryText, { fontWeight: "bold" }]}>Qo'shimcha sabablar:</Text>
                                        {analysisData.oylayman_sabab_diagnostikasi.qoshimcha_sabablar.map((sabab: any, idx: number) => (
                                            <Text key={idx} style={styles.summaryText}>
                                                • {sabab?.description || sabab}
                                                {sabab?.quote && ` - "${sabab.quote}" (${sabab.time})`}
                                            </Text>
                                        ))}
                                    </View>
                                )}
                        </View>
                    </View>
                )}

                {/* Debug Information */}
                <View style={styles.section} wrap={false}>
                    <Text style={styles.cardTitle}>Debug Information</Text>
                    <View style={styles.cardContainer}>
                        <Text style={[styles.text, { fontSize: 9 }]}>
                            Data Keys: {Object.keys(analysisData || {}).join(", ")}
                        </Text>
                        <Text style={[styles.text, { fontSize: 9 }]}>
                            Decision Percentage: {decisionPercentage}
                        </Text>
                        <Text style={[styles.text, { fontSize: 9 }]}>
                            Lead Class: {leadClass}
                        </Text>
                        <Text style={[styles.text, { fontSize: 9 }]}>
                            Techniques Count: {Array.isArray(texnikaJadvali) ? texnikaJadvali.length : 0}
                        </Text>
                        <Text style={[styles.text, { fontSize: 9 }]}>
                            Errors Count: {Array.isArray(xatolar) ? xatolar.length : 0}
                        </Text>
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


                {/* Techniques Table */}
                <View style={styles.section} break>
                    <Text style={styles.cardTitle}>Texnika bo'yicha jadval (Scorecard)</Text>
                    {renderTechniquesTable()}
                </View>

                {/* Errors and Issues */}
                {xatolar.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>Xatolar va kamchiliklar</Text>
                        {renderErrorsSection()}
                    </View>
                )}

                {/* Strengths */}
                {kuchliTomonlar.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>Top 3 kuchli tomonlar</Text>
                        <View style={styles.strengthsCard}>
                            {kuchliTomonlar.map((strength: any, idx: number) => (
                                <Text key={idx} style={[styles.listItem, { color: "#166534" }]}>
                                    ✓ {strength.description}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Weaknesses */}
                {zaifTomonlar.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>Top 3 zaif tomonlar</Text>
                        <View style={styles.weaknessCard}>
                            {zaifTomonlar.map((weakness: any, idx: number) => (
                                <Text key={idx} style={[styles.listItem, { color: "#991b1b" }]}>
                                    ✗ {weakness.description}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Recommendations */}
                {tavsiyalar.length > 0 && (
                    <View style={styles.section} break>
                        <Text style={styles.cardTitle}>Operator uchun tavsiyalar</Text>
                        <View style={styles.recommendationCard}>
                            {tavsiyalar.map((tavsiya: any, idx: number) => (
                                <Text key={idx} style={[styles.listItem, { color: "#92400e" }]}>
                                    {idx + 1}. {tavsiya}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Probing Questions */}
                {probingQuestions.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>Probing savollar (next call uchun)</Text>
                        <View style={styles.probingCard}>
                            {probingQuestions.map((question: string, idx: number) => (
                                <Text key={idx} style={[styles.listItem, { color: "#1e40af" }]}>
                                    {idx + 1}. {question}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Decision Calculation */}
                {decisionCalculation.breakdown && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>Decision-to-Pay % hisoblash</Text>
                        <View style={styles.cardContainer}>
                            <Text style={styles.formulaText}>{decisionCalculation.breakdown}</Text>
                            <Text style={[styles.text, { fontWeight: "bold", color: "#059669" }]}>
                                Final Percentage: {decisionCalculation.final_percentage}%
                            </Text>
                        </View>
                    </View>
                )}

                {/* Coachable Moment */}
                {analysisData?.coachable_moment && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>Coachable Moment</Text>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryText}>
                                {analysisData.coachable_moment?.takeaway ||
                                    (typeof analysisData.coachable_moment === 'string' ?
                                        analysisData.coachable_moment :
                                        JSON.stringify(analysisData.coachable_moment))}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Timeline (if multiple calls) */}
                {timeline.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.cardTitle}>Cross-call Timeline</Text>
                        <View style={styles.timelineCard}>
                            {timeline.map((call: any, idx: number) => (
                                <Text key={idx} style={[styles.listItem, { color: "#7c3aed" }]}>
                                    Call {call.call_number}: {call.description}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {renderTranscriptions(transcriptions)}
            </Page>
        </Document>
    )
}

export default function PdfDownloadThink({ data, transcriptions, crm_id }: { data: any, transcriptions: any, crm_id: any }) {
    const now = new Date()
    const formatted = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(
        2,
        "0",
    )}.${now.getFullYear()}_${String(now.getHours()).padStart(2, "0")}.${String(now.getMinutes()).padStart(2, "0")}`

    return (
        <PDFDownloadLink document={<MyDoc data={data} transcriptions={transcriptions} crm_id={crm_id} />} fileName={`lead-analysis_${formatted}.pdf`} className="mr-5">
            {({ loading }) =>
                loading ? (
                    <Button type="primary" loading>
                        PDF tayyorlanmoqda...
                    </Button>
                ) : (
                    <Button type="primary">PDF yuklab olish</Button>
                )
            }
        </PDFDownloadLink>
    )
}