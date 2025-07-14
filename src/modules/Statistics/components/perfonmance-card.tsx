import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowDownIcon, ArrowUpIcon, X, Download, CircleEllipsis } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useTheme } from "services/contexts/ThemeContext"

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
    const { theme } = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const colorMap = {
        positive: {
            borderColor: "#22c55e", // green-500
            textColor: theme === "dark" ? "#4ade80" : "#22c55e", // green-400 for dark, green-500 for light
            rotate: 45,
            Icon: ArrowUpIcon,
        },
        negative: {
            borderColor: "#ef4444", // red-500
            textColor: theme === "dark" ? "#f87171" : "#ef4444", // red-400 for dark, red-500 for light
            rotate: -45,
            Icon: ArrowDownIcon,
        },
        neutral: {
            borderColor: theme === "dark" ? "#6b7280" : "#9ca3af", // gray-500/gray-400
            textColor: theme === "dark" ? "#9ca3af" : "#6b7280", // gray-400/gray-500
            rotate: 0,
            Icon: () => null,
        },
    } as const;

    const { borderColor, textColor, Icon, rotate } = colorMap[comparisonColor] || colorMap["neutral"]

    // Theme-aware styles
    const cardStyle = {
        backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
        borderLeft: `4px solid ${borderColor}`,
        border: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
        color: theme === "dark" ? "#f3f4f6" : "#111827",
        boxShadow: theme === "dark" ? "0 1px 3px 0 rgba(0, 0, 0, 0.3)" : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    }

    const modalStyle = {
        backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
        color: theme === "dark" ? "#f3f4f6" : "#111827",
        border: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
    }

    const titleColor = theme === "dark" ? "#9ca3af" : "#6b7280"
    const borderBottomColor = theme === "dark" ? "#4b5563" : "#e5e7eb"
    const buttonBorderColor = theme === "dark" ? "#4b5563" : "#d1d5db"
    const buttonHoverBg = theme === "dark" ? "#4b5563" : "#f9fafb"

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
                className="rounded-lg p-4 flex flex-col cursor-pointer hover:shadow-md transition-shadow"
                style={cardStyle}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium" style={{ color: titleColor }}>
                        {t(title)}
                    </h4>
                    <button>
                        <CircleEllipsis
                            className="w-4 h-4"
                            style={{ color: titleColor }}
                        />
                    </button>
                </div>
                <div className="text-3xl font-bold mb-2">{value}</div>
                <div className="flex items-center text-sm" style={{ color: textColor }}>
                    {Icon && (
                        <Icon
                            className="w-5 h-5 mr-1"
                            style={{
                                color: textColor,
                                transform: `rotate(${rotate}deg)`
                            }}
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
                            className="rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            style={modalStyle}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div
                                className="flex justify-between items-center p-4"
                                style={{ borderBottom: `1px solid ${borderBottomColor}` }}
                            >
                                <h2 className="text-xl font-semibold">{t(title)}</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="hover:opacity-70 transition-opacity"
                                    style={{ color: titleColor }}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                {/* Metrics Row */}
                                <div className="flex justify-start gap-6 mb-6">
                                    <div>
                                        <div className="text-sm mb-1" style={{ color: titleColor }}>
                                            {t("Current Value")}
                                        </div>
                                        <div className="text-3xl font-bold">{value}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm mb-1" style={{ color: titleColor }}>
                                            {t("Peer Median")}
                                        </div>
                                        <div className="text-3xl font-bold" style={{ color: titleColor }}>
                                            {peerMedian}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm mb-1" style={{ color: titleColor }}>
                                            {t("Performance")}
                                        </div>
                                        <div
                                            className="text-[18px] font-bold flex items-center justify-center"
                                            style={{ color: textColor }}
                                        >
                                            {Icon && (
                                                <Icon
                                                    className="w-5 h-5 mr-1"
                                                    style={{
                                                        color: textColor,
                                                        transform: `rotate(${rotate}deg)`
                                                    }}
                                                />
                                            )}
                                            {t(comparison)}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mb-6 text-start text-sm" style={{ color: titleColor }}>
                                    {t(description || "")}
                                </p>

                                {/* Chart */}
                                <div className="mb-6">
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={chartData}>
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    stroke={theme === "dark" ? "#4b5563" : "#f0f0f0"}
                                                />
                                                <XAxis
                                                    dataKey="date"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{
                                                        fontSize: 12,
                                                        fill: theme === "dark" ? "#9ca3af" : "#666"
                                                    }}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{
                                                        fontSize: 12,
                                                        fill: theme === "dark" ? "#9ca3af" : "#666"
                                                    }}
                                                />
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
                                        className="flex items-center gap-2 px-3 py-1 h-[38px] rounded-md transition-colors"
                                        style={{
                                            border: `1px solid ${buttonBorderColor}`,
                                            backgroundColor: 'transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = buttonHoverBg
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }}
                                    >
                                        <Download className="w-4 h-4" />
                                        {t("Export CSV")}
                                    </button>
                                    <button
                                        onClick={handleExportPNG}
                                        className="flex items-center gap-2 px-3 py-1 h-[38px] rounded-md transition-colors"
                                        style={{
                                            border: `1px solid ${buttonBorderColor}`,
                                            backgroundColor: 'transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = buttonHoverBg
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }}
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