"use client"

import { Button, ConfigProvider, DatePicker } from "antd"
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

const { RangePicker } = DatePicker

export default function BusinessDashboard() {
    const { t } = useTranslation()
    const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false)
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().startOf("month"), dayjs().endOf("month")])
    const baseUrl = import.meta.env.VITE_ROOT_API || ""
    const formatDateForApi = (date: Dayjs | null): string => (date ? date.format("YYYY-MM-DD") : "")

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
                end: data.summary?.date_range?.end || ""
            },
            metrics: [
                {
                    title: "Month-over-Month Growth",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral"
                },
                {
                    title: "Quarter-over-Quarter Growth",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral"
                },
                {
                    title: "Funnel Potential",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral"
                },
                {
                    title: "Lead to Sale",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral"
                },
                {
                    title: "Average Deal Size",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral"
                },
                {
                    title: "Average Sales Cycle",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral"
                },
                {
                    title: "New Customers",
                    display_value: "0%",
                    value: "0",
                    change_text: "no change",
                    change_type: "neutral"
                },
            ],
            info_cards: [
                {
                    title: "Number of minutes analyzed",
                    display_value: `${Math.floor(totalTalk.total_duration / 60)} min`,
                    value: Math.floor(totalTalk.total_duration / 60),
                    description: "Total audio minutes analyzed during the selected period",
                    icon: "🎧",
                    icon_class: "purple"
                },
                {
                    title: "Number of audios analyzed",
                    display_value: totalTalk.anaylsed_data?.toString() || "0",
                    value: totalTalk.anaylsed_data || 0,
                    description: "Total number of audios analyzed during the selected period",
                    icon: "👥",
                    icon_class: "blue"
                },
                {
                    title: "Total of audio minutes",
                    display_value: `${Math.floor((data.summary?.total_talk_time || 0) / 60)} min`,
                    value: Math.floor((data.summary?.total_talk_time || 0) / 60),
                    description: "Total audio minutes analyzed during the selected period",
                    icon: "🎧",
                    icon_class: "purple"
                },
                {
                    title: "Total number of leads",
                    display_value: data.summary?.total_leads?.toString() || "0",
                    value: data.summary?.total_leads || 0,
                    description: "Total number of leads analyzed during the selected period",
                    icon: "👥",
                    icon_class: "blue"
                }
            ]
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
                method: "POST", // BU MUHIM
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storage.get(ACCESS_TOKEN_KEY) || ""}`
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) throw new Error(`Server error ${response.status}`)

            // Agar PDF blob qaytarsa:
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

    if (statisticsError || totalTalkError) {
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
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#4338ca",
                    borderRadius: 8,
                },
            }}
        >
            <main className="px-8 py-5 flex flex-col min-h-[calc(100vh-64px)]">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">{t("Business Overview")}</h1>
                    <div className="flex gap-3 items-center">
                        <Language />
                        <Button type="primary" onClick={handleSendToServer} className="flex items-center bg-[#4338CA] hover:bg-[#3730A3] h-8">
                            <Printer className="h-5 w-5 mr-2" />
                            <span>{t("Download PDF")}</span>
                        </Button>
                        <SettingsButton onClick={() => setIsMetricsModalOpen(true)} icon={<SettingOutlined />} />
                    </div>
                </div>

                {/* Date Range Picker */}
                <div className="mb-4">
                    <RangePicker
                        className="w-full md:w-80 border rounded-md mb-2"
                        format="MMM D, YYYY"
                        onChange={handleDateChange}
                        value={dateRange}
                        placeholder={["Start Date", "End Date"]}
                    />
                </div>

                {/* Filter Tabs */}
                <div className="mb-6 flex flex-wrap gap-3">
                    {["Last 7 Days", "Last 30 Days", "This Month", "Last Month"].map((range) => (
                        <Button
                            key={range}
                            className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7"
                            onClick={() => handleRangeSelect(range)}
                        >
                            {t(range)}
                        </Button>
                    ))}
                </div>



                {/* Loading State */}
                {(isStatisticsLoading || isTotalTalkLoading) && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                )}

                {/* Stat Cards Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <AnalyticsCard
                            icon={<Headset height={36} width={36} className="text-4xl text-indigo-500" />}
                            title={t("Number of minutes analyzed")}
                            value={totalTalk ? `${Math.floor(totalTalk?.total_duration / 60)} min` : "0 min"}
                            description={t("Total audio minutes analyzed during the selected period")}
                            borderColor="border-indigo-500"
                        />

                        <AnalyticsCard
                            icon={<UsersRound height={36} width={36} className="text-4xl text-indigo-500" />}
                            title={t("Number of audios analyzed")}
                            value={totalTalk?.anaylsed_data?.toString() || "0"}
                            description={t("Total number of audios analyzed during the selected period")}
                            borderColor="border-indigo-500"
                        />

                        <AnalyticsCard
                            icon={<Headset height={36} width={36} className="text-4xl text-indigo-500" />}
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
                            icon={<UsersRound height={36} width={36} className="text-4xl text-indigo-500" />}
                            title={t("Total number of leads")}
                            value={data?.summary?.total_leads?.toString() || "0"}
                            description={t("Total number of leads analyzed during the selected period")}
                            borderColor="border-indigo-500"
                        />
                    </div>
                )}

                <div className="mt-auto mb-4">
                    <SimpleAIChat context="sdr" />
                </div>
            </main>

            <MetricsSelectionModal
                isOpen={isMetricsModalOpen}
                onClose={() => setIsMetricsModalOpen(false)}
                icon={<SettingOutlined />}
            />
        </ConfigProvider>
    )
}
