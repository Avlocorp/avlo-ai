import type React from "react"

import { useState } from "react"
import { X, Search, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Checkbox from "antd/es/checkbox/Checkbox"
import { useTranslation } from "react-i18next"


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
    icon?: React.ReactNode
}

const defaultMetrics: MetricCategory[] = [
    {
        title: "Speed & Connection",
        items: [
            {
                id: "first_contact_speed",
                label: "First Contact Speed",
                description: "Average time to first contact attempt from lead creation",
                checked: true,
            },
            {
                id: "first_success_speed",
                label: "First Success Speed",
                description: "Average time to first successful connection from lead creation",
                checked: true,
            },
        ],
    },
    {
        title: "Connection Metrics",
        items: [
            {
                id: "first_call_connection_ratio",
                label: "First Call Connection Ratio",
                description: "Percentage of first calls that result in a connection",
                checked: true,
            },
            {
                id: "no_connection_rate",
                label: "No Connection Rate",
                description: "Percentage of leads never connected with",
                checked: true,
            },
            {
                id: "pickup_rate",
                label: "Pickup Rate",
                description: "Rate of inbound calls answered",
                checked: true,
            },
            {
                id: "avg_attempts_to_connect",
                label: "Avg Attempts to Connect",
                description: "Average number of attempts needed to connect with a lead",
                checked: true,
            },
            {
                id: "avg_ring_count",
                label: "Avg Ring Count",
                description: "Average number of rings before connection",
                checked: true,
            },
        ],
    },
    {
        title: "Communication Quality",
        items: [
            {
                id: "silence_rate",
                label: "Silence Rate",
                description: "Percentage of call time spent in silence",
                checked: true,
            },
            {
                id: "listening_rate",
                label: "Listening Rate",
                description: "Percentage of call time where lead is talking",
                checked: true,
            },
            {
                id: "avg_talk_time",
                label: "Avg Talk Time",
                description: "Average duration of calls in seconds",
                checked: true,
            },
        ],
    },
]

export default function MetricsSelectionModal({ isOpen, onClose }: MetricsSelectionModalProps) {
    const [metrics, setMetrics] = useState<MetricCategory[]>(defaultMetrics)
    const [searchTerm, setSearchTerm] = useState("")

    const handleToggleMetric = (categoryIndex: number, itemIndex: number) => {
        const newMetrics = [...metrics]
        newMetrics[categoryIndex].items[itemIndex].checked = !newMetrics[categoryIndex].items[itemIndex].checked
        setMetrics(newMetrics)
    }

    const handleSelectAll = () => {
        const newMetrics = metrics.map((category) => ({
            ...category,
            items: category.items.map((item) => ({ ...item, checked: true })),
        }))
        setMetrics(newMetrics)
    }

    const handleSelectNone = () => {
        const newMetrics = metrics.map((category) => ({
            ...category,
            items: category.items.map((item) => ({ ...item, checked: false })),
        }))
        setMetrics(newMetrics)
    }

    const handleResetToDefault = () => {
        setMetrics(defaultMetrics)
    }

    const handleSave = () => {
        // const selectedMetrics = metrics.flatMap((category) =>
        //     category.items.filter((item) => item.checked).map((item) => item.id),
        // )
        // onSave(selectedMetrics)
        onClose()
    }

    const filteredMetrics = metrics
        .map((category) => ({
            ...category,
            items: category.items.filter(
                (item) =>
                    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        }))
        .filter((category) => category.items.length > 0)
    const { t } = useTranslation()
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">{t("SDR Dashboard Metrics")}</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="p-6 border-b">
                            <div className="relative ">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search metrics..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>


                        {/* Select All/None Buttons */}
                        <div className="px-6 py-3 border-b bg-gray-50 h-10">
                            <div className="flex gap-4 ">
                                <button onClick={handleSelectAll} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                    {t(" Select All")}
                                </button>
                                <button onClick={handleSelectNone} className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                                    {t("Select None")}
                                </button>
                            </div>
                        </div>

                        {/* Metrics Content */}
                        <div className="p-6 max-h-96 overflow-y-auto ">
                            {filteredMetrics.map((category, categoryIndex) => (
                                <div key={category.title} className="mb-6 last:mb-0">
                                    <h3 className="font-semibold text-gray-900 mb-3">{category.title}</h3>
                                    <div className=" grid grid-cols-2 gap-6">
                                        {category.items.map((item, itemIndex) => (
                                            <label
                                                key={item.id}
                                                className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                                            >
                                                <Checkbox
                                                    checked={item.checked}
                                                    onChange={() => handleToggleMetric(categoryIndex, itemIndex)}
                                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                {/* <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={() => handleToggleMetric(categoryIndex, itemIndex)}
                                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                /> */}
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                                                    <div className="text-gray-500 text-xs mt-1">{item.description}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
                            <button
                                onClick={handleResetToDefault}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium text-sm"
                            >
                                <RotateCcw className="w-4 h-4" />
                                {t(" Reset to Default")}
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className=" h-[38px] px-3 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    {t("Cancel")}
                                </button>
                                <button
                                    onClick={handleSave}
                                    className=" h-[38px] px-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                                >
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
