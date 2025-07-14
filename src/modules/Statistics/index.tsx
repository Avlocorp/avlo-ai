import { useEffect, useMemo, useState } from "react"
import { Avatar, Button, Checkbox, ConfigProvider, DatePicker, Spin, theme as antdTheme } from "antd"
import { CalendarOutlined, SettingOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons"
import dayjs, { type Dayjs } from "dayjs"
import { Headset, Printer, Users, UsersRound } from "lucide-react"
import { useGetOperatorListQuery } from "services/api/settings"
import Dropdown from "antd/es/dropdown/dropdown"

import LeaderboardDrawer from "./components/liaderboard-modal"
import { AnalyticsCard } from "./components/analitics-card"
import SimpleAIChat from "components/simpleAIchat"
import PerformanceCard from "./components/perfonmance-card"
import SettingsButton from "./components/setting-btn"
import MetricsSelectionModal from "./components/MetricsSelectionModal"
import { useTranslation } from "react-i18next"
import Language from "components/language"
import { useGetStatisticsResponseMutation, useSendStatisticsJsonMutation } from "services/api/statistics/statistics.api"
import { useTheme } from "services/contexts/ThemeContext"

const { RangePicker } = DatePicker

export default function Dashboard() {
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
    const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false)
    const { t } = useTranslation()
    const { theme } = useTheme()

    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().startOf("month"), dayjs().endOf("month")])

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [operatorIdsForQuery, setOperatorIdsForQuery] = useState<string | undefined>(undefined)

    const [getStatistics, { data, isLoading: isStatisticsLoading, error: statisticsError }] =
        useGetStatisticsResponseMutation()

    const [sendStatisticsJson, { isLoading: isSendingJson }] = useSendStatisticsJsonMutation()
    const formatDateForApi = (date: Dayjs | null): string => (date ? date.format("YYYY-MM-DD") : "")

    const queryParams = {
        start_date: formatDateForApi(dateRange[0]),
        end_date: formatDateForApi(dateRange[1]),
        operators: operatorIdsForQuery,
    }

    const handleSendJsonToServer = async () => {
        try {
            if (!data) {
                console.error("❌ No data available to send")
                return
            }

            console.log("📤 Sending raw data to server exactly as received...")

            // Send the raw data exactly as received from getStatisticsResponse
            const pdfBlob = await sendStatisticsJson({
                statistics_data: data,
            }).unwrap()

            console.log("✅ Received PDF blob:", pdfBlob)

            // Verify we have a valid blob
            if (!(pdfBlob instanceof Blob)) {
                throw new Error("Invalid response: Expected PDF blob")
            }

            if (pdfBlob.size === 0) {
                throw new Error("Received empty PDF file")
            }

            // Create filename with timestamp
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
            const filename = `statistics-${formatDateForApi(dateRange[0])}-to-${formatDateForApi(dateRange[1])}-${timestamp}.pdf`

            // Create download link for PDF
            const url = window.URL.createObjectURL(pdfBlob)

            // Create a temporary anchor element and trigger download
            const link = document.createElement("a")
            link.href = url
            link.download = filename
            link.style.display = "none"

            // Add to DOM, click, and remove
            document.body.appendChild(link)
            link.click()

            // Clean up
            setTimeout(() => {
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
            }, 100)

            console.log(`✅ PDF download initiated: ${filename}`)
            console.log(`📊 File size: ${(pdfBlob.size / 1024).toFixed(2)} KB`)
        } catch (err) {
            console.error("❌ Error processing PDF download:", err)

            // Show user-friendly error message
            if (err instanceof Error) {
                console.error("Error details:", err.message)
            }
        }
    }

    // 📌 Date range select
    const handleRangeSelect = (range: string) => {
        let startDate: Dayjs
        let endDate: Dayjs = dayjs()

        switch (range) {
            case "Last 7 Days":
                startDate = dayjs().subtract(6, "days")
                break
            case "Last 30 Days":
                startDate = dayjs().subtract(29, "days")
                break
            case "This Month":
                startDate = dayjs().startOf("month")
                endDate = dayjs().endOf("month")
                break
            case "Last Month":
                startDate = dayjs().subtract(1, "month").startOf("month")
                endDate = dayjs().subtract(1, "month").endOf("month")
                break
            default:
                return
        }

        setDateRange([startDate, endDate])
    }

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null, _dateStrings: [string, string]) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange([dates[0], dates[1]])
        } else {
            setDateRange([dayjs().subtract(6, "days"), dayjs()])
        }
    }

    const { data: operatorData, isLoading: isOperatorLoading } = useGetOperatorListQuery({
        page: 1,
        per_page: 500,
        search: "",
    })

    const operators = useMemo(() => {
        return (
            operatorData?.data?.map((item: any) => ({
                id: item.id,
                name: `${item.name ?? ""} ${item.last_name ?? ""}`.trim(),
                avatar: item.avatar,
                operator_id: item.operator_id,
            })) ?? []
        )
    }, [operatorData])

    const handleChange = (checkedValues: number[]) => {
        setSelectedIds(checkedValues)
    }

    const handleSelectAll = () => {
        const allIds = operators.map((op) => op.id)
        setSelectedIds(allIds)
    }

    const handleClear = () => {
        setSelectedIds([])
        setOperatorIdsForQuery(undefined)
    }

    useEffect(() => {
        if (selectedIds?.length > 0) {
            const selectedOperatorIds = operators
                .filter((op) => selectedIds.includes(op.id))
                .map((op) => op.operator_id.toString())
            setOperatorIdsForQuery(selectedOperatorIds.join(","))
        } else {
            setOperatorIdsForQuery(undefined)
        }
    }, [selectedIds, operators, setOperatorIdsForQuery])

    // 📌 Statistikani yuklash query params o'zgarganda
    useEffect(() => {
        getStatistics({
            start_date: queryParams.start_date,
            end_date: queryParams.end_date,
            operators: queryParams.operators,
        })
    }, [queryParams.start_date, queryParams.end_date, queryParams.operators, getStatistics])

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
            }
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
        }
    }

    // Dynamic styles based on theme
    const containerStyle = {
        minHeight: "100vh",
        paddingtop: "24px",
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
    }

    const headerStyle = {
        backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
        color: theme === "dark" ? "#f3f4f6" : "#111827",
        borderBottom: theme === "dark" ? "1px solid #4b5563" : "1px solid #e5e7eb",
    }

    const textStyle = {
        color: theme === "dark" ? "#fff" : "#000",
    }



    const dropdownContent = (
        <div
            style={{
                padding: "8px",
                width: "256px",
                backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                border: theme === "dark" ? "1px solid #4b5563" : "1px solid #d1d5db",
                borderRadius: "6px",
                boxShadow: theme === "dark" ? "0 10px 15px -3px rgba(0, 0, 0, 0.3)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 500, fontSize: "14px", marginBottom: "8px" }}>
                <button
                    onClick={handleSelectAll}
                    style={{
                        color: "#4338ca",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                    }}
                    onMouseOver={(e) => ((e.target as HTMLElement).style.color = "#3730a3")}
                    onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#4338ca")}
                >
                    {t("Select All")}
                </button>
                <button
                    onClick={handleClear}
                    style={{
                        color: theme === "dark" ? "#d1d5db" : "#374151",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                    }}
                    onMouseOver={(e) => ((e.target as HTMLElement).style.color = theme === "dark" ? "#f3f4f6" : "#111827")}
                    onMouseOut={(e) => ((e.target as HTMLElement).style.color = theme === "dark" ? "#d1d5db" : "#374151")}
                >
                    {t("Clear")}
                </button>
            </div>
            {isOperatorLoading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
                    <Spin />
                </div>
            ) : (
                <Checkbox.Group
                    style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                    value={selectedIds}
                    onChange={handleChange}
                >
                    {operators.map((op) => (
                        <label
                            key={op.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "4px 4px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                backgroundColor: "transparent",
                            }}
                            onMouseOver={(e) => ((e.target as HTMLElement).style.backgroundColor = theme === "dark" ? "#4b5563" : "#f3f4f6")}
                            onMouseOut={(e) => ((e.target as HTMLElement).style.backgroundColor = "transparent")}
                        >
                            <Checkbox value={op.id} />
                            {op.avatar ? <Avatar src={op.avatar} size={32} /> : <Avatar size={32} icon={<UserOutlined />} />}
                            <span style={{
                                fontSize: "14px",
                                maxWidth: "160px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                color: theme === "dark" ? "#f3f4f6" : "#111827"
                            }}>
                                {op.name}
                            </span>
                        </label>
                    ))}
                </Checkbox.Group>
            )}
        </div>
    )

    if (statisticsError) {
        return (
            <div style={{
                minHeight: "100vh",
                backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#dc2626",
                        marginBottom: "0.5rem",
                    }}>
                        Error Loading Dashboard
                    </h2>
                    <p style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}>
                        Please try refreshing the page
                    </p>
                </div>
            </div>
        )
    }

    return (
        <ConfigProvider theme={getThemeConfig()}>
            <div style={containerStyle} className="pb-7">
                <div style={{ margin: "0 auto" }}>
                    {/* Header */}
                    <div style={{
                        position: "sticky",
                        padding: "20px 32px",
                        top: 0,
                        zIndex: 30,
                        paddingTop: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                        ...headerStyle,
                        marginBottom: "16px",
                        gap: "16px",
                    }}>
                        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", ...textStyle, margin: 0 }}>
                            {t("SDR Performance Dashboard")}
                        </h1>

                        <div style={{ display: "flex", gap: "16px", width: "100%", justifyContent: "space-between" }} >
                            <div className="">
                                <RangePicker
                                    style={{ width: "100%", maxWidth: "320px", marginBottom: "2px" }}
                                    format="MMM D, YYYY"
                                    onChange={handleDateChange}
                                    suffixIcon={<CalendarOutlined />}
                                    value={dateRange}
                                />
                                <div style={{ marginBottom: "16px", display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
                                    <Button
                                        style={{ height: "28px" }}
                                        onClick={() => handleRangeSelect("Last 7 Days")}
                                    >
                                        {t("Last 7 Days")}
                                    </Button>
                                    <Button
                                        style={{ height: "28px" }}
                                        onClick={() => handleRangeSelect("Last 30 Days")}
                                    >
                                        {t("Last 30 Days")}
                                    </Button>
                                    <Button
                                        style={{ height: "28px" }}
                                        onClick={() => handleRangeSelect("This Month")}
                                    >
                                        {t("This Month")}
                                    </Button>
                                    <Button
                                        style={{ height: "28px" }}
                                        onClick={() => handleRangeSelect("Last Month")}
                                    >
                                        {t("Last Month")}
                                    </Button>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "8px" }}>
                                <Language />
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    maxHeight: "40px",
                                    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                                    padding: "4px 8px",
                                    height: "32px",
                                }}>
                                    <Users size={24} style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }} />
                                    <Dropdown dropdownRender={() => dropdownContent} trigger={["click"]}>
                                        <Button style={{ height: "32px" }}>
                                            {selectedIds?.length > 0
                                                ? `${selectedIds?.length} ${t("SDRs selected")}`
                                                : t("Select SDRs")}
                                        </Button>
                                    </Dropdown>
                                </div>

                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "#4338ca",
                                        borderColor: "#4338ca",
                                        height: "32px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    onClick={() => setIsLeaderboardOpen(true)}
                                >
                                    <TrophyOutlined style={{ fontSize: "20px" }} />
                                    <span style={{ marginLeft: "4px" }}>{t("Leaderboard")}</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Download PDF button */}
                    <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 16px", marginBottom: "16px" }}>
                        <Button
                            type="primary"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#4338ca",
                                borderColor: "#4338ca",
                                height: "32px",
                            }}
                            onClick={handleSendJsonToServer}
                            loading={isSendingJson}
                            disabled={!data || isStatisticsLoading}
                        >
                            <Printer style={{ height: "20px", width: "20px", marginRight: "8px" }} />
                            <span>{isSendingJson ? t("Generating PDF...") : t("Download PDF")}</span>
                        </Button>
                    </div>

                    {/* Loading State */}
                    {isStatisticsLoading && (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "48px 0" }}>
                            <Spin size="large" />
                        </div>
                    )}

                    {/* Performance Metrics */}
                    {!isStatisticsLoading && data && (
                        <div style={{ padding: "20px 32px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", ...textStyle, margin: 0 }}>
                                    {t("Performance Metrics")}
                                </h2>
                                <SettingsButton
                                    onClick={() => setIsMetricsModalOpen(true)}
                                    icon={<SettingOutlined style={{ fontSize: '16px' }} />}
                                />
                            </div>

                            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "12px", ...textStyle }}>
                                {t("Speed & Connection")}
                            </h3>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "16px",
                                marginBottom: "24px",
                            }}>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="First Contact Speed"
                                        value={data?.speed_connection?.first_contact_speed?.display || "0h"}
                                        comparison={data?.speed_connection?.first_contact_speed?.comparison || ""}
                                        comparisonColor={
                                            data?.speed_connection?.first_contact_speed?.comparison_color as "positive" | "negative" | "neutral"
                                        }
                                        peerMedian={data?.speed_connection?.first_contact_speed?.median || 0}
                                    />
                                </div>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="First Success Speed"
                                        value={data?.speed_connection?.first_success_speed?.display || "0h"}
                                        comparison={data?.speed_connection?.first_success_speed?.comparison || ""}
                                        comparisonColor={
                                            data?.speed_connection?.first_success_speed?.comparison_color as "positive" | "negative" | "neutral"
                                        }
                                        peerMedian={data?.speed_connection?.first_success_speed?.median || 0}
                                    />
                                </div>
                            </div>

                            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "12px", ...textStyle }}>
                                {t("Connection Metrics")}
                            </h3>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "16px",
                                marginBottom: "24px",
                            }}>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="First Call Connection Ratio"
                                        value={data?.speed_connection?.first_call_connection_ratio?.display || "0%"}
                                        comparison={data?.speed_connection?.first_call_connection_ratio?.comparison || ""}
                                        comparisonColor={
                                            data?.speed_connection?.first_call_connection_ratio?.comparison_color as
                                            | "positive"
                                            | "negative"
                                            | "neutral"
                                        }
                                        peerMedian={data?.speed_connection?.first_call_connection_ratio?.median || 0}
                                    />
                                </div>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="No Connection Rate"
                                        value={data?.speed_connection?.no_connection_rate?.display || "0%"}
                                        comparison={data?.speed_connection?.no_connection_rate?.comparison || ""}
                                        comparisonColor={
                                            data?.speed_connection?.no_connection_rate?.comparison_color as "positive" | "negative" | "neutral"
                                        }
                                        peerMedian={data?.speed_connection?.no_connection_rate?.median || 0}
                                    />
                                </div>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="Pickup Rate"
                                        value={data?.speed_connection?.pickup_rate?.display || "0%"}
                                        comparison={data?.speed_connection?.pickup_rate?.comparison || ""}
                                        comparisonColor={
                                            data?.speed_connection?.pickup_rate?.comparison_color as "positive" | "negative" | "neutral"
                                        }
                                        peerMedian={data?.speed_connection?.pickup_rate?.median || 0}
                                    />
                                </div>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="Avg Attempts to Connect"
                                        value={data?.speed_connection?.avg_attempts_to_connect?.display || "0"}
                                        comparison={data?.speed_connection?.avg_attempts_to_connect?.comparison || ""}
                                        comparisonColor={
                                            data?.speed_connection?.avg_attempts_to_connect?.comparison_color as
                                            | "positive"
                                            | "negative"
                                            | "neutral"
                                        }
                                        peerMedian={data?.speed_connection?.avg_attempts_to_connect?.median || 0}
                                    />
                                </div>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="Avg Ring Count"
                                        value={data?.speed_connection?.avg_ring_count?.display || "0"}
                                        comparison={data?.speed_connection?.avg_ring_count?.comparison || ""}
                                        comparisonColor={
                                            data?.speed_connection?.avg_ring_count?.comparison_color as "positive" | "negative" | "neutral"
                                        }
                                        peerMedian={data?.speed_connection?.avg_ring_count?.median || 0}
                                    />
                                </div>
                            </div>

                            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "12px", ...textStyle }}>
                                {t("Communication Quality")}
                            </h3>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "16px",
                                marginBottom: "24px",
                            }}>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="Silence Rate"
                                        value={data?.communication_quality?.silence_rate?.display || "0%"}
                                        comparison={data?.communication_quality?.silence_rate?.comparison || ""}
                                        comparisonColor={
                                            data?.communication_quality?.silence_rate?.comparison_color as "positive" | "negative" | "neutral"
                                        }
                                        peerMedian={data?.communication_quality?.silence_rate?.median || 0}
                                    />
                                </div>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="Listening Rate"
                                        value={data?.communication_quality?.listening_rate?.display || "0%"}
                                        comparison={data?.communication_quality?.listening_rate?.comparison || ""}
                                        comparisonColor={
                                            data?.communication_quality?.listening_rate?.comparison_color as "positive" | "negative" | "neutral"
                                        }
                                        peerMedian={data?.communication_quality?.listening_rate?.median || 0}
                                    />
                                </div>
                                <div style={{ minHeight: "140px" }}>
                                    <PerformanceCard
                                        title="Avg Talk Time"
                                        value={data?.communication_quality?.avg_talk_time?.display || "0m"}
                                        comparison={data?.communication_quality?.avg_talk_time?.comparison || ""}
                                        comparisonColor={
                                            data?.communication_quality?.avg_talk_time?.comparison_color as "positive" | "negative" | "neutral"
                                        }
                                        peerMedian={data?.communication_quality?.avg_talk_time?.median || 0}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Analytics */}
                    {!isStatisticsLoading && data && (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                            gap: "24px",
                            padding: "0 16px",
                            marginBottom: "24px",
                        }}>
                            <AnalyticsCard
                                icon={<Headset height={36} width={36} style={{ color: "#4338ca" }} />}
                                title="Total of audio minutes"
                                value={
                                    typeof data?.summary?.total_talk_time === "number"
                                        ? `${Math.floor(data.summary.total_talk_time / 60)} min`
                                        : "0 min"
                                }
                                description="Total audio minutes analyzed during the selected period"
                                borderColor="border-indigo-500"
                            />

                            <AnalyticsCard
                                icon={<UsersRound height={36} width={36} style={{ color: "#4338ca" }} />}
                                title="Total number of leads"
                                value={data?.summary?.total_leads?.toString() || "0"}
                                description="Total number of leads analyzed during the selected period"
                                borderColor="border-indigo-500"
                            />
                        </div>
                    )}

                    <div style={{ marginTop: "auto", padding: "0 16px" }}>
                        <SimpleAIChat context="sdr" />
                    </div>
                </div>

                {/* Leaderboard Modal */}
                <LeaderboardDrawer isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />

                {/* Metrics Selection Modal */}
                <MetricsSelectionModal
                    isOpen={isMetricsModalOpen}
                    onClose={() => setIsMetricsModalOpen(false)}
                />
            </div>
        </ConfigProvider>
    )
}