import { InfoCircleOutlined } from "@ant-design/icons"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { motion } from "framer-motion"

interface PerformanceCardProps {
    title: string
    value: string
    change: number
    isPositive: boolean
    color: "green" | "red"
}

export default function PerformanceCard({ title, value, change, isPositive, color }: PerformanceCardProps) {
    const borderColor = color === "green" ? "border-l-green-500" : "border-l-red-500"
    const textColor = isPositive ? "text-green-500" : "text-red-500"
    const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${borderColor} flex flex-col`}
        >
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-600">{title}</h4>
                <InfoCircleOutlined className="text-gray-400" />
            </div>

            <div className="text-3xl font-bold mb-2">{value}</div>

            <div className={`flex items-center ${textColor} text-sm`}>
                <Icon className="w-4 h-4 mr-1" />
                <span>
                    {change.toFixed(1)}% {isPositive ? "better" : "worse"} than median
                </span>
            </div>
        </motion.div>
    )
}
