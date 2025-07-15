import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { useTheme } from "services/contexts/ThemeContext"

interface StatCardProps {
    title: string
    value: string
    change: number
    changeText: string
    status: "positive" | "negative" | "neutral"
}

export function StatCard({ title, value, change, changeText, status }: StatCardProps) {
    const { t } = useTranslation()
    const { theme } = useTheme()

    // Theme-aware styles
    const isDark = theme === "dark"

    const cardStyles = {
        backgroundColor: isDark ? "#374151" : "#ffffff",
        color: isDark ? "#f3f4f6" : "#111827",
        borderColor: isDark ? "#4b5563" : "#e5e7eb",
    }

    const titleStyles = {
        color: isDark ? "#9ca3af" : "#6b7280",
    }

    const shadowClass = isDark
        ? "shadow-lg shadow-gray-900/20"
        : "shadow-sm hover:shadow-md"

    let Icon
    let colorClass
    let borderClass
    let rotate

    switch (status) {
        case "positive":
            Icon = ArrowUpIcon
            colorClass = "text-green-500"
            borderClass = "bg-green-500"
            rotate = 45
            break
        case "negative":
            Icon = ArrowDownIcon
            colorClass = "text-red-500"
            borderClass = "bg-red-500"
            rotate = -45
            break
        case "neutral":
        default:
            Icon = null
            colorClass = isDark ? "text-gray-400" : "text-gray-500"
            borderClass = isDark ? "bg-gray-600" : "bg-gray-400"
            rotate = 0
            break
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex rounded-xl overflow-hidden max-h-[140px]"
            style={{
                boxShadow: isDark
                    ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
            }}
        >
            {/* Left accent border */}
            <div className={`w-1 ${borderClass}`} />

            {/* Card content */}
            <div
                className="w-full transition-all duration-200"
                style={cardStyles}
            >
                <div
                    className={`p-4 rounded-r-xl border-r border-t border-b transition-shadow duration-200 ${shadowClass}`}
                    style={{
                        borderColor: cardStyles.borderColor,
                        backgroundColor: cardStyles.backgroundColor
                    }}
                    onMouseEnter={(e) => {
                        if (!isDark) {
                            e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isDark) {
                            e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                        }
                    }}
                >
                    {/* Title */}
                    <div
                        className="mb-1 text-sm font-medium"
                        style={titleStyles}
                    >
                        {t(title)}
                    </div>

                    {/* Value */}
                    <div
                        className="text-3xl font-bold mb-2"
                        style={{ color: cardStyles.color }}
                    >
                        {value}
                    </div>

                    {/* Change indicator */}
                    <div className={`flex items-center ${colorClass}`}>
                        {Icon && (
                            <Icon
                                className={`w-5 h-5 mr-1 ${colorClass}`}
                                style={{ transform: `rotate(${rotate}deg)` }}
                            />
                        )}
                        <span className="text-sm font-medium">
                            {change !== 0 ? `${change.toFixed(1)}% ` : ""}{t(changeText)}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
