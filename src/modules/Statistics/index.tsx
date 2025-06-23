
import { useEffect, useMemo, useState } from "react"
import { Avatar, Button, Checkbox, DatePicker, Spin } from "antd"
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

const { RangePicker } = DatePicker

export default function Dashboard() {
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
    const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false)
    const { t } = useTranslation()

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
        if (selectedIds.length > 0) {
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

    const dropdownContent = (
        <div className="p-2 w-64 bg-white border rounded shadow-lg">
            <div className="flex justify-between font-medium text-sm mb-2">
                <button onClick={handleSelectAll} className="text-indigo-600 hover:text-indigo-800">
                    Select All
                </button>
                <button onClick={handleClear} className="text-gray-700 hover:text-gray-900">
                    Clear
                </button>
            </div>
            {isOperatorLoading ? (
                <div className="flex justify-center py-4">
                    <Spin />
                </div>
            ) : (
                <Checkbox.Group className="flex flex-col gap-2" value={selectedIds} onChange={handleChange}>
                    {operators.map((op) => (
                        <label key={op.id} className="flex items-center gap-3 px-1 py-1 rounded hover:bg-gray-100 cursor-pointer">
                            <Checkbox value={op.id} />
                            {op.avatar ? <Avatar src={op.avatar} size={32} /> : <Avatar size={32} icon={<UserOutlined />} />}
                            <span className="text-sm max-w-40 truncate">{op.name}</span>
                        </label>
                    ))}
                </Checkbox.Group>
            )}
        </div>
    )

    if (statisticsError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Dashboard</h2>
                    <p className="text-gray-600">Please try refreshing the page</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto">
                {/* Header */}
                <div className="sticky px-8 py-5 top-0 z-30 pt-4 flex flex-col w-full shadow-sm bg-white md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">{t("SDR Performance Dashboard")}</h1>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="flex-grow md:flex-grow-0">
                            <RangePicker
                                className="w-full h-8"
                                format="MMM D, YYYY"
                                onChange={handleDateChange}
                                suffixIcon={<CalendarOutlined />}
                                value={dateRange}
                            />
                            <div className="mb-4 flex flex-wrap gap-3 mt-2">
                                <Button
                                    className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7"
                                    onClick={() => handleRangeSelect("Last 7 Days")}
                                >
                                    {t("Last 7 Days")}
                                </Button>
                                <Button
                                    className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7"
                                    onClick={() => handleRangeSelect("Last 30 Days")}
                                >
                                    {t("Last 30 Days")}
                                </Button>
                                <Button
                                    className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7"
                                    onClick={() => handleRangeSelect("This Month")}
                                >
                                    {t("This Month")}
                                </Button>
                                <Button
                                    className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7"
                                    onClick={() => handleRangeSelect("Last Month")}
                                >
                                    {t("Last Month")}
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Language />
                            <div className="flex items-center gap-1 max-h-10 bg-white px-2 py-1 h-8">
                                <Users size={24} className="text-gray-600" />
                                <Dropdown dropdownRender={() => dropdownContent} trigger={["click"]} className="h-8">
                                    <Button className="h-10 border border-gray-300 hover:border-gray-400">
                                        {selectedIds.length > 0 ? `${selectedIds.length} SDRs selected` : "Select SDRs"}
                                    </Button>
                                </Dropdown>
                            </div>

                            <Button
                                type="primary"
                                className="bg-indigo-600 hover:bg-indigo-700 h-8 flex items-center"
                                onClick={() => setIsLeaderboardOpen(true)}
                            >
                                <TrophyOutlined style={{ fontSize: "20px" }} />
                                <span className="ml-1">{t("Leaderboard")}</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Download PDF button */}
                <div className="flex justify-end px-4 mb-4">
                    <Button
                        type="primary"
                        className="flex items-center bg-indigo-600 hover:bg-indigo-700 h-8"
                        onClick={handleSendJsonToServer}
                        loading={isSendingJson}
                        disabled={!data || isStatisticsLoading}
                    >
                        <Printer className="h-5 w-5 mr-2" />
                        <span>{isSendingJson ? t("Generating PDF...") : t("Download PDF")}</span>
                    </Button>
                </div>

                {/* Loading State */}
                {isStatisticsLoading && (
                    <div className="flex justify-center items-center py-12">
                        <Spin size="large" />
                    </div>
                )}

                {/* Performance Metrics */}
                {!isStatisticsLoading && data && (
                    <div className="px-8 py-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">{t("Performance Metrics")}</h2>
                            <SettingsButton onClick={() => setIsMetricsModalOpen(true)} icon={<SettingOutlined />} />
                        </div>

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">{t("Speed & Connection")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <PerformanceCard
                                title="First Contact Speed"
                                value={data?.speed_connection?.first_contact_speed?.display || "0h"}
                                comparison={data?.speed_connection?.first_contact_speed?.comparison || ""}
                                comparisonColor={
                                    data?.speed_connection?.first_contact_speed?.comparison_color as "positive" | "negative" | "neutral"
                                }
                                peerMedian={data?.speed_connection?.first_contact_speed?.median || 0}
                            />
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

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">{t("Connection Metrics")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
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
                            <PerformanceCard
                                title="No Connection Rate"
                                value={data?.speed_connection?.no_connection_rate?.display || "0%"}
                                comparison={data?.speed_connection?.no_connection_rate?.comparison || ""}
                                comparisonColor={
                                    data?.speed_connection?.no_connection_rate?.comparison_color as "positive" | "negative" | "neutral"
                                }
                                peerMedian={data?.speed_connection?.no_connection_rate?.median || 0}
                            />
                            <PerformanceCard
                                title="Pickup Rate"
                                value={data?.speed_connection?.pickup_rate?.display || "0%"}
                                comparison={data?.speed_connection?.pickup_rate?.comparison || ""}
                                comparisonColor={
                                    data?.speed_connection?.pickup_rate?.comparison_color as "positive" | "negative" | "neutral"
                                }
                                peerMedian={data?.speed_connection?.pickup_rate?.median || 0}
                            />
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

                        <h3 className="text-lg font-semibold mb-3 text-gray-800">{t("Communication Quality")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <PerformanceCard
                                title="Silence Rate"
                                value={data?.communication_quality?.silence_rate?.display || "0%"}
                                comparison={data?.communication_quality?.silence_rate?.comparison || ""}
                                comparisonColor={
                                    data?.communication_quality?.silence_rate?.comparison_color as "positive" | "negative" | "neutral"
                                }
                                peerMedian={data?.communication_quality?.silence_rate?.median || 0}
                            />
                            <PerformanceCard
                                title="Listening Rate"
                                value={data?.communication_quality?.listening_rate?.display || "0%"}
                                comparison={data?.communication_quality?.listening_rate?.comparison || ""}
                                comparisonColor={
                                    data?.communication_quality?.listening_rate?.comparison_color as "positive" | "negative" | "neutral"
                                }
                                peerMedian={data?.communication_quality?.listening_rate?.median || 0}
                            />
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
                )}

                {/* Analytics */}
                {!isStatisticsLoading && data && (
                    <div className="grid grid-cols-1 px-4 lg:grid-cols-2 gap-6 mb-6">
                        <AnalyticsCard
                            icon={<Headset height={36} width={36} className="text-4xl text-indigo-500" />}
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
                            icon={<UsersRound height={36} width={36} className="text-4xl text-indigo-500" />}
                            title="Total number of leads"
                            value={data?.summary?.total_leads?.toString() || "0"}
                            description="Total number of leads analyzed during the selected period"
                            borderColor="border-indigo-500"
                        />
                    </div>
                )}

                <div className="mt-auto mb-4 px-4">
                    <SimpleAIChat context="sdr" />
                </div>
            </div>

            {/* Leaderboard Modal */}
            <LeaderboardDrawer isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />

            {/* Metrics Selection Modal */}
            <MetricsSelectionModal
                isOpen={isMetricsModalOpen}
                onClose={() => setIsMetricsModalOpen(false)}
                icon={<SettingOutlined />}
            />
        </div>
    )
}
