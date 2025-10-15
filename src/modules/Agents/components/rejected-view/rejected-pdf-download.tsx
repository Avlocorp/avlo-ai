import { Button } from "antd";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFDownloadLink,
    Link,
} from "@react-pdf/renderer";

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


const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 11,
        fontFamily: "NotoSans",
    },

    // Umumiy
    section: { marginBottom: 12 },
    header: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    subheader: { fontSize: 14, fontWeight: "bold", marginBottom: 6 },
    text: { marginBottom: 4, fontSize: 10 },

    // 📌 Jadval (flex asosida)
    table: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        flex: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        padding: 4,
        minWidth: 60,         // ustun juda siqilib ketmasin
    },
    tableCell: {
        fontSize: 9,
        textAlign: "left",
        flexWrap: "wrap",     // matn avtomatik o‘raladi
    },


    tableCellBold: {
        fontSize: 10,
        fontWeight: "bold",
    },

    // 📌 Kartalar
    cardContainer: {
        marginBottom: 6,
        padding: 5,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 4,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#374151",
    },
    metricCard: {
        padding: 10,
        marginBottom: 8,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#bfdbfe",
        borderRadius: 4,
        backgroundColor: "#f0f9ff",
    },
    metricTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1e40af",
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb",
    },

    // 📌 Rangli bloklar
    strengthsCard: {
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        borderWidth: 1,
        padding: 8,
        marginBottom: 6,
        borderRadius: 4,
    },
    weaknessCard: {
        backgroundColor: "#fef2f2",
        borderColor: "#fecaca",
        borderWidth: 1,
        padding: 8,
        marginBottom: 6,
        borderRadius: 4,
    },
    recommendationCard: {
        backgroundColor: "#fffbeb",
        borderColor: "#fed7aa",
        borderWidth: 1,
        padding: 8,
        marginBottom: 6,
        borderRadius: 4,
    },

    // 📌 List va xatolik
    listItem: { fontSize: 10, marginBottom: 3, color: "#4b5563" },
    errorCard: {
        padding: 6,
        marginBottom: 6,
        borderWidth: 1,
        borderRadius: 4,
        borderLeftWidth: 3,
        borderColor: "#f87171",
    },
    errorTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 3 },
    errorText: { fontSize: 9, marginBottom: 2 },

    // 📌 Metrics Row
    metricsRow: { flexDirection: "row", marginBottom: 15 },
    metricWrapper: { flex: 1, marginRight: 8 },
    metricWrapperLast: { flex: 1 },
});





// Extract percentage from purchase probability
const getPurchaseProbability = (data: any): number => {
    if (!data || typeof data !== "object") {
        console.warn("Invalid data passed to getPurchaseProbability:", data);
        return 0;
    }
    const probText = data["Xarid ehtimoli (%)"];
    if (!probText) {
        console.warn("Missing 'Xarid ehtimoli (%)' in data:", data);
        return 0;
    }
    const match = String(probText).match(/(\d+)%/);
    return match ? parseInt(match[1], 10) : 0;
};

// Get color for probability (PDF safe colors)
const getProbabilityColor = (percentage: number): string => {
    if (typeof percentage !== "number" || isNaN(percentage)) return "#000000";
    if (percentage >= 70) return "#16a34a"; // green
    if (percentage >= 40) return "#d97706"; // orange
    return "#dc2626"; // red
};

// Calculate overall score
const calculateOverallScore = (data: any): number => {
    const probability = getPurchaseProbability(data);
    return Math.round((probability + 70) / 2);
};

const MyDoc = ({ data, transcriptions, crm_id }: { data: any; transcriptions: any; crm_id: any }) => {
    const purchaseProbability = getPurchaseProbability(data);
    const overallScore = calculateOverallScore(data);

    // Find statuses array with better error handling
    const findStatusesArray = (checklistData: any) => {
        if (!checklistData || typeof checklistData !== "object") {
            console.warn("Invalid checklistData:", checklistData);
            return null;
        }
        const keys = ["✅/⚠/❌", "Status", "status", "statuses", "Statuses", "statusList"];
        for (const k of keys) {
            const v = checklistData[k];
            if (Array.isArray(v)) return v;
        }
        console.warn("No valid status array found in checklistData:", checklistData);
        return null;
    };

    // Map raw status with better handling
    const mapStatus = (raw: any) => {
        if (raw == null || raw === undefined) return { label: "-", color: "#000" };
        const v = String(raw).trim();

        if (["✅", "OK", "Ok", "ok", "true", "True"].includes(v))
            return { label: "OK", color: "#16a34a" };
        if (["⚠", "WARN", "Warn", "warn", "WARNING", "Warning"].includes(v))
            return { label: "WARN", color: "#d97706" };
        if (["❌", "FAIL", "Fail", "fail", "FALSE", "false", "L"].includes(v))
            return { label: "FAIL", color: "#dc2626" };

        return { label: v || "-", color: "#000" };
    };

    const renderChecklistTable = (checklistData: any) => {
        if (!checklistData || !Array.isArray(checklistData.Technique)) {
            console.warn("Invalid or missing checklistData.Technique:", checklistData);
            return null;
        }

        const statusesArray = findStatusesArray(checklistData);

        return (
            <View wrap={false} style={{ marginBottom: 12 }} break>
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCellBold}>Technique</Text>
                        </View>
                        <View style={[styles.tableCol, { flex: 1 }]}>
                            <Text style={styles.tableCellBold}>Status</Text>
                        </View>
                        <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCellBold}>Example & Time</Text>
                        </View>
                        <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCellBold}>Comments</Text>
                        </View>
                        <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCellBold}>Recommendations</Text>
                        </View>
                    </View>

                    {/* Table Rows */}
                    {checklistData.Technique.map((technique: string, index: number) => {
                        const rawStatus =
                            statusesArray?.[index] ??
                            checklistData["✅/⚠/❌"]?.[index] ??
                            checklistData["Status"]?.[index] ??
                            checklistData["status"]?.[index] ??
                            null;

                        const { label: statusLabel, color: statusColor } = mapStatus(rawStatus);

                        return (
                            <View key={index} style={styles.tableRow}>
                                <View style={[styles.tableCol, { flex: 2 }]}>
                                    <Text style={styles.tableCell}>{technique || "-"}</Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 1 }]}>
                                    <Text style={[styles.tableCell, { color: statusColor }]}>
                                        {statusLabel}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 2 }]}>
                                    <Text style={styles.tableCell}>
                                        {checklistData["Example & time"]?.[index] || "-"}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 2 }]}>
                                    <Text style={styles.tableCell}>
                                        {checklistData["Depth & comments"]?.[index] || "-"}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, { flex: 2 }]}>
                                    <Text style={[styles.tableCell, { color: "#d97706" }]}>
                                        {checklistData["Recommendations"]?.[index] || "-"}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };

    const renderErrorsSection = (value: any) => {
        if (!Array.isArray(value)) {
            console.warn("Invalid errors section data:", value);
            return null;
        }

        return (
            <View wrap={false} style={{ marginBottom: 12 }}>
                {value.map((error: any, idx: number) => {
                    if (!error || typeof error !== "object") {
                        console.warn("Invalid error data at index", idx, ":", error);
                        return null;
                    }

                    const rawErrStatus = error["✅/❌"] || error["Status"] || error["status"] || null;
                    const { label: errLabel } = mapStatus(rawErrStatus);

                    const isWarning = errLabel === "WARN";
                    const isFailed = errLabel === "FAIL";

                    const backgroundColor = isFailed ? "#fef2f2" : isWarning ? "#fffbeb" : "#f0fdf4";
                    const borderColor = isFailed ? "#ef4444" : isWarning ? "#f59e0b" : "#22c55e";
                    const textColor = isFailed ? "#dc2626" : isWarning ? "#d97706" : "#16a34a";

                    return (
                        <View
                            key={idx}
                            style={[
                                styles.errorCard,
                                { backgroundColor, borderColor, borderLeftColor: borderColor },
                            ]}
                        >
                            <Text style={[styles.errorTitle, { color: textColor }]}>
                                {error["Texnika"] || error["Technique"] || `Error ${idx + 1}`}
                            </Text>
                            <Text style={styles.errorText}>Status: {errLabel}</Text>
                            <Text style={styles.errorText}>
                                Implementation: {error["Nima ishlatilgan (yoki ishlatilmagan)"] || "N/A"}
                            </Text>
                            <Text style={styles.errorText}>
                                Recommendation: {error["Tavsiyalar"] || "No recommendations"}
                            </Text>
                        </View>
                    );
                })}
            </View>
        );
    };

    const renderTranscriptions = (transcriptions: any) => {
        if (!Array.isArray(transcriptions)) {
            console.warn("Invalid transcriptions data:", transcriptions);
            return null;
        }

        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.cardTitle}>Call Transcriptions</Text>
                {transcriptions.map((conversation, convIdx) => {
                    if (!Array.isArray(conversation)) {
                        console.warn("Invalid conversation data at index", convIdx, ":", conversation);
                        return null;
                    }
                    return (
                        <View key={convIdx} style={styles.cardContainer}>
                            {conversation.map((line: any, lineIdx: number) => {
                                if (!line || typeof line !== "object" || !line.text) {
                                    console.warn("Invalid transcription line at index", lineIdx, ":", line);
                                    return null;
                                }
                                return (
                                    <Text key={lineIdx} style={styles.text}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {line.speaker ? line.speaker.toUpperCase() : "Unknown"}:
                                        </Text>{" "}
                                        {line.text}
                                    </Text>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    };

    const renderRecommendations = (value: any) => {
        if (!value) {
            console.warn("Invalid recommendations data:", value);
            return null;
        }

        if (Array.isArray(value)) {
            return (
                <View style={styles.recommendationCard}>
                    {value.map((item, idx) => (
                        <Text key={idx} style={[styles.listItem, { color: "#92400e" }]}>
                            {idx + 1}. {typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}
                        </Text>
                    ))}
                </View>
            );
        } else if (typeof value === "string") {
            const items = value.split("=¡").filter((item) => item.trim());
            return (
                <View style={styles.recommendationCard}>
                    {items.length > 0 ? (
                        items.map((item, idx) => (
                            <Text key={idx} style={[styles.listItem, { color: "#92400e" }]}>
                                {idx + 1}. {item.trim()}
                            </Text>
                        ))
                    ) : (
                        <Text style={[styles.listItem, { color: "#92400e" }]}>No recommendations available</Text>
                    )}
                </View>
            );
        }
        return (
            <View style={styles.recommendationCard}>
                <Text style={[styles.listItem, { color: "#92400e" }]}>
                    {String(value)}
                </Text>
            </View>
        );
    };

    const renderValue = (key: string, value: any) => {
        if (value === null || value === undefined) {
            console.warn(`Value for key "${key}" is null or undefined`);
            return null;
        }

        return (
            <View wrap={false} style={{ marginBottom: 12 }}>
                <Text style={styles.cardTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>

                {/* Special handling for specific keys */}
                {key === "Checklist Table" && renderChecklistTable(value)}

                {key === "Umumiy xulosa" && (
                    <View style={styles.cardContainer}>
                        <Text style={styles.text}>{String(value)}</Text>
                    </View>
                )}

                {(key === "Xatolar va kamchiliklar" || key.toLowerCase().includes("xatolar") || key.toLowerCase().includes("errors")) &&
                    renderErrorsSection(value)}

                {key === "Xarid ehtimoli (%)" && value !== undefined && value !== null && (
                    <View style={styles.cardContainer}>
                        <Text
                            style={[
                                styles.text,
                                { color: getProbabilityColor(getPurchaseProbability({ "Xarid ehtimoli (%)": value })) },
                            ]}
                        >
                            {String(value)}
                        </Text>
                    </View>
                )}

                {key === "Lead Class" && (
                    <View style={styles.cardContainer}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>
                            Lead Class: {String(value)}
                        </Text>
                    </View>
                )}

                {key === "Top 3 Strengths" && Array.isArray(value) && (
                    <View style={styles.strengthsCard}>
                        {value.map((item, idx) => (
                            <Text key={idx} style={[styles.listItem, { color: "#166534" }]}>
                                ✓ {String(item)}
                            </Text>
                        ))}
                    </View>
                )}

                {key === "Top 3 Weaknesses" && Array.isArray(value) && (
                    <View style={styles.weaknessCard}>
                        {value.map((item, idx) => (
                            <Text key={idx} style={[styles.listItem, { color: "#991b1b" }]}>
                                ✗ {String(item)}
                            </Text>
                        ))}
                    </View>
                )}

                {(key === "Operator uchun tavsiyalar" || key.toLowerCase().includes("recommendation")) &&
                    renderRecommendations(value)}

                {/* Default handling for other content */}
                {!["Checklist Table", "Umumiy xulosa", "Xatolar va kamchiliklar", "Xarid ehtimoli (%)", "Lead Class", "Top 3 Strengths", "Top 3 Weaknesses"].includes(key) &&
                    !key.toLowerCase().includes("recommendation") &&
                    !key.toLowerCase().includes("xatolar") &&
                    !key.toLowerCase().includes("errors") && (
                        <View style={styles.cardContainer}>
                            {Array.isArray(value) ? (
                                value.map((item, idx) => (
                                    <Text key={idx} style={styles.listItem}>
                                        • {typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}
                                    </Text>
                                ))
                            ) : typeof value === "object" && value !== null ? (
                                <Text style={styles.text}>{JSON.stringify(value, null, 2)}</Text>
                            ) : (
                                <Text style={styles.text}>{String(value)}</Text>
                            )}
                        </View>
                    )}
            </View>
        );
    };

    // Safe data handling
    const safeData = data && typeof data === "object" ? data : {};

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>Lead Analysis Report</Text>

                {/* Key Metrics */}
                <View style={styles.metricsRow}>
                    <View style={[styles.metricCard, styles.metricWrapper]}>
                        <Text style={styles.metricTitle}>Purchase Probability</Text>
                        <Text style={[styles.metricValue, { color: getProbabilityColor(purchaseProbability) }]}>
                            {purchaseProbability}%
                        </Text>
                    </View>
                    <View style={[styles.metricCard, styles.metricWrapper]}>
                        <Text style={styles.metricTitle}>Lead Class</Text>
                        <Text style={styles.metricValue}>{safeData["Lead Class"] || "Unknown"}</Text>
                    </View>
                    <View style={[styles.metricCard, styles.metricWrapper]}>
                        <Text style={styles.metricTitle}>Overall Score</Text>
                        <Text style={[styles.metricValue, { color: "#16a34a" }]}>{overallScore}%</Text>
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


                {/* Dynamic Content with custom order */}
                {Object.entries(safeData)
                    .sort(([a], [b]) => {
                        const preferredOrder = [
                            "Umumiy xulosa",
                            "Xatolar va kamchiliklar (with timestamps)",
                            "Lead Class",
                            "Checklist Table",
                            "Xarid ehtimoli (%)",
                            "Top 3 Strengths",
                            "Top 3 Weaknesses",
                            "Operator uchun tavsiyalar",
                            "Lead Information",
                            "Operator Details",
                            "Qo'shimcha Izohlar",
                        ];
                        const indexA = preferredOrder.indexOf(a);
                        const indexB = preferredOrder.indexOf(b);
                        return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
                    })
                    .map(([key, value]) => (
                        <View key={key} style={styles.section}>
                            {renderValue(key, value)}
                        </View>
                    ))}

                {renderTranscriptions(transcriptions)}
            </Page>
        </Document>
    );
};

export default function PdfDownload({ data, transcriptions, crm_id }: { data: any; transcriptions: any; crm_id: any }) {
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, "0")}.${String(
        now.getMonth() + 1
    ).padStart(2, "0")}.${now.getFullYear()}_${String(now.getHours()).padStart(
        2,
        "0"
    )}.${String(now.getMinutes()).padStart(2, "0")}`;

    return (
        <PDFDownloadLink
            document={<MyDoc data={data} transcriptions={transcriptions} crm_id={crm_id} />}
            fileName={`lead-analysis_${formatted}.pdf`}
            className="mr-5"
        >
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
    );
}