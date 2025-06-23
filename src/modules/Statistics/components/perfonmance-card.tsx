import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowDownIcon, ArrowUpIcon, X, Download, CircleEllipsis } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface PerformanceCardProps {
    title: string
    value: string
    comparison: string
    comparisonColor: "positive" | "negative" | "neutral"
    currentValue?: string
    peerMedian?: number
    description?: string
    chartData?: Array<{ date: string; value: number }>
}

// Sample chart data
const sampleChartData = [
    { date: "May 18", value: 2.1 },
    { date: "May 21", value: 1.8 },
    { date: "May 24", value: 2.3 },
    { date: "May 27", value: 1.9 },
    { date: "May 30", value: 2.0 },
    { date: "Jun 02", value: 1.7 },
    { date: "Jun 05", value: 1.6 },
    { date: "Jun 08", value: 1.8 },
    { date: "Jun 11", value: 1.5 },
    { date: "Jun 14", value: 1.4 },
    { date: "Jun 17", value: 1.3 },
]

export default function PerformanceCard({
    title,
    value,
    peerMedian,
    comparison,
    comparisonColor,
    description,
    chartData = sampleChartData,
}: PerformanceCardProps) {
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const colorMap = {
        positive: {
            border: "border-l-green-500",
            text: "text-green-500",
            rotate: 45,
            Icon: ArrowUpIcon,
        },
        negative: {
            border: "border-l-red-500",
            text: "text-red-500",
            rotate: -45,
            Icon: ArrowDownIcon,
        },
        neutral: {
            border: "border-l-gray-400",
            text: "text-gray-500",
            rotate: 0,
            Icon: () => null,
        },
    } as const;

    const { border, text, Icon, rotate } = colorMap[comparisonColor] || colorMap["neutral"]

    const handleExportCSV = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "Date,Value\n" +
            chartData.map((row) => `${row.date},${row.value}`).join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute(
            "download",
            `${title.toLowerCase().replace(/\s+/g, "-")}-data.csv`
        )
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleExportPNG = () => {
        alert(t("PNG export functionality would be implemented here"))
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${border} flex flex-col cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-600">{t(title)}</h4>
                    <button>
                        <CircleEllipsis className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="text-3xl font-bold mb-2">{value}</div>
                <div className={`flex items-center ${text} text-sm`}>
                    {Icon && (
                        <Icon
                            className={`w-5 h-5 mr-1 ${text}`}
                            style={{ transform: `rotate(${rotate}deg)` }}
                        />
                    )}
                    <span>{t(comparison)}</span>
                </div>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">{t(title)}</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                {/* Metrics Row */}
                                <div className="flex justify-start gap-6 mb-6">
                                    <div className="">
                                        <div className="text-sm text-gray-500 mb-1">{t("Current Value")}</div>
                                        <div className="text-3xl font-bold text-gray-900">{value}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-gray-500 mb-1">{t("Peer Median")}</div>
                                        <div className="text-3xl font-bold text-gray-600">{peerMedian}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-gray-500 mb-1">{t("Performance")}</div>
                                        <div className={`text-[18px] font-bold ${text} flex items-center justify-center`}>
                                            {Icon && (
                                                <Icon
                                                    className={`w-5 h-5 mr-1 ${text}`}
                                                    style={{ transform: `rotate(${rotate}deg)` }}
                                                />
                                            )}
                                            {t(comparison)}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 text-start text-sm">{t(description || "")}</p>

                                {/* Chart */}
                                <div className="mb-6">
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="#3b82f6"
                                                    strokeWidth={2}
                                                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                                                    activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Export Buttons */}
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={handleExportCSV}
                                        className="flex items-center gap-2 px-3 py-1 h-[38px] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        {t("Export CSV")}
                                    </button>
                                    <button
                                        onClick={handleExportPNG}
                                        className="flex items-center gap-2 px-3 py-1 h-[38px] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        {t("Export PNG")}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
