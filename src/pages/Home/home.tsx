
import { Button, ConfigProvider, DatePicker, theme as antdTheme } from "antd"
import { SettingOutlined } from "@ant-design/icons"
import { Headset, Printer, UsersRound } from "lucide-react"
import SimpleAIChat from "components/simpleAIchat"
import { AnalyticsCard } from "modules/Statistics/components/analitics-card"
import SettingsButton from "modules/Statistics/components/setting-btn"
import { useState, useEffect } from "react"
import MetricsSelectionModal from "modules/Statistics/components/MetricsSelectionModal"
import Language from "components/language"
import { useTranslation } from "react-i18next"
import { StatCard } from "./components/stat-card"
import dayjs, { type Dayjs } from "dayjs"
import { useGetTotalTalkTimeQuery } from "services/api/home"
import { useGetStatisticsResponseMutation } from "services/api/statistics/statistics.api"
import { ACCESS_TOKEN_KEY } from "config"
import { storage } from "services"
import { useTheme } from "services/contexts/ThemeContext"

const { RangePicker } = DatePicker

export default function BusinessDashboard() {
    const { t } = useTranslation()
    const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false)
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().startOf("month"), dayjs().endOf("month")])
    const baseUrl = import.meta.env.VITE_ROOT_API || ""

    const formatDateForApi = (date: Dayjs | null): string => (date ? date.format("YYYY-MM-DD") : "")

    const { theme } = useTheme()

    const formData = {
        start_date: formatDateForApi(dateRange[0]),
        end_date: formatDateForApi(dateRange[1]),
    }

    const [getStatistics, { data, isLoading: isStatisticsLoading, error: statisticsError }] =
        useGetStatisticsResponseMutation()

    const { data: totalTalk, isLoading: isTotalTalkLoading, error: totalTalkError } = useGetTotalTalkTimeQuery(formData)

    useEffect(() => {
        getStatistics(formData)
    }, [dateRange, getStatistics])

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

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange([dates[0], dates[1]])
        } else {
            setDateRange([dayjs().subtract(6, "days"), dayjs()])
        }
    }

    const buildPayload = () => {
        if (!data || !totalTalk) return null

        return {
            date_range: {
                start: data.summary?.date_range?.start || "",
                end: data.summary?.date_range?.end || "",
            },
            metrics: [
                {
                    title: "Month-over-Month Growth",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral",
                },
                {
                    title: "Quarter-over-Quarter Growth",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral",
                },
                {
                    title: "Funnel Potential",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral",
                },
                {
                    title: "Lead to Sale",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral",
                },
                {
                    title: "Average Deal Size",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral",
                },
                {
                    title: "Average Sales Cycle",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral",
                },
                {
                    title: "New Customers",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral",
                },
            ],
            info_cards: [
                {
                    title: "Number of minutes analyzed",
                    display_value: `${Math.floor(totalTalk.total_duration / 60)} min`,
                    value: Math.floor(totalTalk.total_duration / 60),
                    description: "Total audio minutes analyzed during the selected period",
                    icon: "🎧",
                    icon_class: "purple",
                },
                {
                    title: "Number of audios analyzed",
                    display_value: totalTalk.anaylsed_data?.toString() || "0",
                    value: totalTalk.anaylsed_data || 0,
                    description: "Total number of audios analyzed during the selected period",
                    icon: "👥",
                    icon_class: "blue",
                },
                {
                    title: "Total of audio minutes",
                    display_value: `${Math.floor((data.summary?.total_talk_time || 0) / 60)} min`,
                    value: Math.floor((data.summary?.total_talk_time || 0) / 60),
                    description: "Total audio minutes analyzed during the selected period",
                    icon: "🎧",
                    icon_class: "purple",
                },
                {
                    title: "Total number of leads",
                    display_value: data.summary?.total_leads?.toString() || "0",
                    value: data.summary?.total_leads || 0,
                    description: "Total number of leads analyzed during the selected period",
                    icon: "👥",
                    icon_class: "blue",
                },
            ],
        }
    }

    const handleSendToServer = async () => {
        const payload = buildPayload()
        if (!payload) {
            alert("Ma'lumot to'liq emas, serverga yuborilmadi")
            return
        }

        try {
            const response = await fetch(`${baseUrl}/api/stats/pdf/overall/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storage.get(ACCESS_TOKEN_KEY) || ""}`,
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error(`Server error ${response.status}`)

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `overall-stats-${Date.now()}.pdf`
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.error("Serverga yuborishda xatolik:", err)
            alert("Serverga yuborishda xatolik yuz berdi")
        }
    }

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

    // Main container styles
    const containerStyle = {
        minHeight: "calc(100vh)",
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
        color: theme === "dark" ? "#f3f4f6" : "#111827",
    }

    const headerTextStyle = {
        color: theme === "dark" ? "#f3f4f6" : "#111827",
    }

    if (statisticsError || totalTalkError) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <h2
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            color: "#dc2626",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Error Loading Dashboard
                    </h2>
                    <p style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}>Please try refreshing the page</p>
                </div>
            </div>
        )
    }

    return (
        <ConfigProvider theme={getThemeConfig()}>
            <main style={{ ...containerStyle, padding: "20px 32px" }}>
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        // flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "24px",
                        gap: "16px",
                    }}
                    className="md:flex-row md:items-center"
                >
                    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", ...headerTextStyle, margin: 0 }}>
                        {t("Business Overview")}
                    </h1>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <Language />
                        <Button
                            type="primary"
                            onClick={handleSendToServer}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#4338CA",
                                borderColor: "#4338CA",
                                height: "32px",
                            }}
                        >
                            <Printer style={{ height: "20px", width: "20px", marginRight: "8px" }} />
                            <span>{t("Download PDF")}</span>
                        </Button>
                        <SettingsButton
                            onClick={() => setIsMetricsModalOpen(true)}
                            icon={<SettingOutlined style={{ fontSize: '16px' }} />}
                        />
                    </div>
                </div>

                {/* Date Range Picker */}
                <div style={{ marginBottom: "6px" }}>
                    <RangePicker
                        style={{ width: "100%", maxWidth: "320px", marginBottom: "2px" }}
                        format="MMM D, YYYY"
                        onChange={handleDateChange}
                        value={dateRange}
                        placeholder={["Start Date", "End Date"]}
                    />
                </div>

                {/* Filter Tabs */}
                <div style={{ marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    {["Last 7 Days", "Last 30 Days", "This Month", "Last Month"].map((range) => (
                        <Button key={range} style={{ height: "28px" }} onClick={() => handleRangeSelect(range)}>
                            {t(range)}
                        </Button>
                    ))}
                </div>

                {/* Loading State */}
                {(isStatisticsLoading || isTotalTalkLoading) && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "48px 0",
                        }}
                    >
                        <div
                            style={{
                                width: "32px",
                                height: "32px",
                                border: "2px solid transparent",
                                borderTop: "2px solid #4338ca",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                    </div>
                )}

                {/* Stat Cards Row 1 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "24px",
                        marginBottom: "24px",
                    }}
                >
                    <StatCard
                        title={t("Month-over-Month Growth")}
                        value="0%"
                        change={0}
                        status="neutral"
                        changeText={t("no change")}
                    />
                    <StatCard
                        title={t("Quarter-over-Quarter Growth")}
                        value="0%"
                        change={0}
                        status="neutral"
                        changeText={t("no change")}
                    />
                    <StatCard title={t("Funnel Potential")} value="$0" change={0} status="neutral" changeText={t("no change")} />
                    <StatCard title={t("Lead to Sale")} value="0%" change={0} status="neutral" changeText={t("no change")} />
                </div>

                {/* Stat Cards Row 2 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "24px",
                        marginBottom: "24px",
                    }}
                >
                    <StatCard title={t("Average Deal Size")} value="$0" change={0} status="neutral" changeText={t("no change")} />
                    <StatCard
                        title={t("Average Sales Cycle")}
                        value="0"
                        change={0}
                        status="neutral"
                        changeText={t("no change")}
                    />
                    <StatCard title={t("New Customers")} value="0" change={0} status="neutral" changeText={t("no change")} />
                </div>

                {/* Analytics Cards */}
                {!isStatisticsLoading && !isTotalTalkLoading && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))",
                            gap: "24px",
                            marginBottom: "24px",
                        }}
                    >
                        <AnalyticsCard
                            icon={<Headset height={36} width={36} style={{ color: "#4338ca" }} />}
                            title={t("Number of minutes analyzed")}
                            value={totalTalk ? `${Math.floor(totalTalk?.total_duration / 60)} min` : "0 min"}
                            description={t("Total audio minutes analyzed during the selected period")}
                            borderColor="border-indigo-500"
                        />
                        <AnalyticsCard
                            icon={<UsersRound height={36} width={36} style={{ color: "#4338ca" }} />}
                            title={t("Number of audios analyzed")}
                            value={totalTalk?.anaylsed_data?.toString() || "0"}
                            description={t("Total number of audios analyzed during the selected period")}
                            borderColor="border-indigo-500"
                        />
                        <AnalyticsCard
                            icon={<Headset height={36} width={36} style={{ color: "#4338ca" }} />}
                            title={t("Total of audio minutes")}
                            value={
                                typeof data?.summary?.total_talk_time === "number"
                                    ? `${Math.floor(data.summary.total_talk_time / 60)} min`
                                    : "0 min"
                            }
                            description={t("Total audio minutes analyzed during the selected period")}
                            borderColor="border-indigo-500"
                        />
                        <AnalyticsCard
                            icon={<UsersRound height={36} width={36} style={{ color: "#4338ca" }} />}
                            title={t("Total number of leads")}
                            value={data?.summary?.total_leads?.toString() || "0"}
                            description={t("Total number of leads analyzed during the selected period")}
                            borderColor="border-indigo-500"
                        />
                    </div>
                )}

                <div style={{ marginTop: "auto", marginBottom: "16px" }}>
                    <SimpleAIChat context="sdr" />
                </div>
            </main>

            <MetricsSelectionModal
                isOpen={isMetricsModalOpen}
                onClose={() => setIsMetricsModalOpen(false)}
            />


        </ConfigProvider>
    )
}
//notification hide