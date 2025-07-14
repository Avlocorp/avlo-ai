import type React from "react"
import { motion } from "framer-motion"
import { Card } from "antd"
import { useTranslation } from "react-i18next"
import { useTheme } from "services/contexts/ThemeContext"

interface AnalyticsCardProps {
    icon: React.ReactNode
    title: string
    value: string | number
    description: string
    borderColor: string
}

export function AnalyticsCard({ icon, title, value, description, borderColor }: AnalyticsCardProps) {
    const { t } = useTranslation()
    const { theme } = useTheme()

    // Extract color from borderColor prop (assuming it's like "border-indigo-500")
    const getBorderColorValue = (borderColorClass: string) => {
        if (borderColorClass.includes("indigo")) return "#4338ca"
        if (borderColorClass.includes("blue")) return "#3b82f6"
        if (borderColorClass.includes("green")) return "#22c55e"
        if (borderColorClass.includes("red")) return "#ef4444"
        if (borderColorClass.includes("purple")) return "#8b5cf6"
        return "#4338ca" // default indigo
    }

    const borderColorValue = getBorderColorValue(borderColor)

    const cardStyle = {
        backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
        border: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
        borderLeft: `4px solid ${borderColorValue}`,
        borderRadius: "8px",
        boxShadow: theme === "dark" ? "0 1px 3px 0 rgba(0, 0, 0, 0.3)" : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.2s ease-in-out",
    }

    const iconContainerStyle = {
        padding: "12px",
        backgroundColor: theme === "dark" ? "#4338ca20" : "#eef2ff", // indigo with opacity
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    const titleStyle = {
        color: theme === "dark" ? "#9ca3af" : "#6b7280",
        marginBottom: "4px",
        fontSize: "14px",
    }

    const valueStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "4px",
        color: theme === "dark" ? "#f3f4f6" : "#111827",
    }

    const descriptionStyle = {
        fontSize: "14px",
        color: theme === "dark" ? "#9ca3af" : "#6b7280",
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <Card
                style={cardStyle}
                styles={{
                    body: { padding: "16px" },
                }}
                hoverable
            >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={iconContainerStyle}>{icon}</div>
                    <div style={{ flex: 1 }}>
                        <div style={titleStyle}>{t(title)}</div>
                        <div style={valueStyle}>{value}</div>
                        <div style={descriptionStyle}>{t(description)}</div>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}
