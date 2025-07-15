
import { useState } from "react"
import { X, Search, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Checkbox from "antd/es/checkbox/Checkbox"
import { useTranslation } from "react-i18next"
import { useTheme } from "services/contexts/ThemeContext"

interface MetricItem {
    id: string
    label: string
    description: string
    checked: boolean
}

interface MetricCategory {
    title: string
    items: MetricItem[]
}

interface MetricsSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSave?: (selectedMetrics: string[]) => void
}

const defaultMetrics: MetricCategory[] = [
    {
        title: "Speed & Connection",
        items: [
            { id: "first_contact_speed", label: "First Contact Speed", description: "Average time to first contact attempt from lead creation", checked: true },
            { id: "first_success_speed", label: "First Success Speed", description: "Average time to first successful connection from lead creation", checked: true },
        ],
    },
    {
        title: "Connection Metrics",
        items: [
            { id: "first_call_connection_ratio", label: "First Call Connection Ratio", description: "Percentage of first calls that result in a connection", checked: true },
            { id: "no_connection_rate", label: "No Connection Rate", description: "Percentage of leads never connected with", checked: true },
            { id: "pickup_rate", label: "Pickup Rate", description: "Rate of inbound calls answered", checked: true },
            { id: "avg_attempts_to_connect", label: "Avg Attempts to Connect", description: "Average number of attempts needed to connect with a lead", checked: true },
            { id: "avg_ring_count", label: "Avg Ring Count", description: "Average number of rings before connection", checked: true },
        ],
    },
    {
        title: "Communication Quality",
        items: [
            { id: "silence_rate", label: "Silence Rate", description: "Percentage of call time spent in silence", checked: true },
            { id: "listening_rate", label: "Listening Rate", description: "Percentage of call time where lead is talking", checked: true },
            { id: "avg_talk_time", label: "Avg Talk Time", description: "Average duration of calls in seconds", checked: true },
        ],
    },
]

export default function MetricsSelectionModal({ isOpen, onClose, onSave }: MetricsSelectionModalProps) {
    const [metrics, setMetrics] = useState<MetricCategory[]>(defaultMetrics)
    const [searchTerm, setSearchTerm] = useState("")
    const { t } = useTranslation()
    const { theme } = useTheme()

    const handleToggleMetric = (catIdx: number, itemIdx: number) => {
        const newMetrics = [...metrics]
        newMetrics[catIdx].items[itemIdx].checked = !newMetrics[catIdx].items[itemIdx].checked
        setMetrics(newMetrics)
    }

    const handleSelectAll = () => {
        setMetrics(metrics.map(category => ({
            ...category,
            items: category.items.map(item => ({ ...item, checked: true }))
        })))
    }

    const handleSelectNone = () => {
        setMetrics(metrics.map(category => ({
            ...category,
            items: category.items.map(item => ({ ...item, checked: false }))
        })))
    }

    const handleResetToDefault = () => setMetrics(defaultMetrics)

    const handleSave = () => {
        if (onSave) {
            const selected = metrics.flatMap(cat => cat.items.filter(i => i.checked).map(i => i.id))
            onSave(selected)
        }
        onClose()
    }

    const filteredMetrics = metrics
        .map(category => ({
            ...category,
            items: category.items.filter(item =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }))
        .filter(category => category.items?.length > 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className={`rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden 
                        ${theme === "dark" ? "bg-[#1f2937] border border-[#374151]" : "bg-white border border-gray-200"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className={`flex justify-between items-center p-6 border-b 
                        ${theme === "dark" ? "border-[#374151]" : "border-gray-200"}`}>
                            <h2 className={`text-xl font-semibold 
                            ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
                                {t("SDR Dashboard Metrics")}
                            </h2>
                            <button onClick={onClose}
                                className={`${theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"} transition-colors`}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Search */}
                        <div className={`p-6 border-b ${theme === "dark" ? "border-[#374151]" : "border-gray-200"}`}>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                    style={{ color: theme === "dark" ? "#9ca3af" : "#9ca3af" }} />
                                <input
                                    type="text"
                                    placeholder={t("Search metrics...")}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2 rounded-md outline-none transition 
                                    ${theme === "dark" ? "bg-[#374151] border-[#4b5563] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                                            : "bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"}`}
                                />
                            </div>
                        </div>

                        {/* Select all/none */}
                        <div className={`px-6 py-3 border-b h-10 
                        ${theme === "dark" ? "bg-[#111827] border-[#374151]" : "bg-gray-50 border-gray-200"}`}>
                            <div className="flex gap-4">
                                <button onClick={handleSelectAll}
                                    className={`font-medium text-sm ${theme === "dark" ? "text-indigo-400 hover:text-indigo-300" : "text-blue-600 hover:text-blue-700"}`}>
                                    {t("Select All")}
                                </button>
                                <button onClick={handleSelectNone}
                                    className={`font-medium text-sm ${theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-700"}`}>
                                    {t("Select None")}
                                </button>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="p-6 max-h-96 overflow-y-auto">
                            {filteredMetrics.map((category, catIdx) => (
                                <div key={category.title} className="mb-6 last:mb-0">
                                    <h3 className={`font-semibold mb-3 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>{category.title}</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        {category.items.map((item, itemIdx) => (
                                            <label key={item.id}
                                                className={`flex items-start gap-3 cursor-pointer p-2 rounded-md transition-colors 
                                                ${theme === "dark" ? "hover:bg-[#374151]" : "hover:bg-gray-50"}`}>
                                                <Checkbox
                                                    checked={item.checked}
                                                    onChange={() => handleToggleMetric(catIdx, itemIdx)}
                                                    className="mt-1"
                                                />
                                                <div className="flex-1">
                                                    <div className={`font-medium text-sm ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
                                                        {item.label}
                                                    </div>
                                                    <div className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        {item.description}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className={`flex justify-between items-center p-6 border-t 
                        ${theme === "dark" ? "bg-[#111827] border-[#374151]" : "bg-gray-50 border-gray-200"}`}>
                            <button onClick={handleResetToDefault}
                                className={`flex items-center gap-2 font-medium text-sm 
                                ${theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-700"}`}>
                                <RotateCcw className="w-4 h-4" />
                                {t("Reset to Default")}
                            </button>
                            <div className="flex gap-3">
                                <button onClick={onClose}
                                    className={`h-[38px] px-3 rounded-md transition-colors
                                    ${theme === "dark" ? "bg-[#374151] text-gray-100 border border-[#4b5563] hover:bg-[#4b5563]"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}>
                                    {t("Cancel")}
                                </button>
                                <button onClick={handleSave}
                                    className="h-[38px] px-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                                    {t("Save")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
