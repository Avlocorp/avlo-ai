import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface StatCardProps {
    title: string
    value: string
    change: number
    changeText: string
    status: "positive" | "negative" | "neutral"
}

export function StatCard({ title, value, change, changeText, status }: StatCardProps) {
    const { t } = useTranslation()

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
            colorClass = "text-gray-400"
            borderClass = "bg-gray-400"
            rotate = 0
            break
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex rounded-xl shadow-sm overflow-hidden max-h-[140px]"
        >
            <div className={`w-1 ${borderClass}`} />
            <div className="w-full bg-white">
                <div className="shadow-sm p-4 hover:shadow-md transition-shadow rounded-lg border border-gray-100">
                    <div className="mb-1 text-gray-600 text-sm">{t(title)}</div>

                    <div className="text-3xl font-bold mb-2">{value}</div>

                    <div className={`flex items-center ${colorClass}`}>
                        {Icon &&
                            <Icon
                                className={`w-5 h-5 mr-1 ${colorClass}`}
                                style={{ transform: `rotate(${rotate}deg)` }}
                            />}
                        <span>
                            {change.toFixed(1)}% {t(changeText)}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
