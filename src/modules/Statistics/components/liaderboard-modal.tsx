import { Avatar, Drawer, Select, Spin } from "antd"
import { TrophyOutlined, UserOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"
import { useGetOperatorListQuery } from "services/api/settings"
import type { SelectProps } from "antd"
import type { Operator } from "services/api/settings/settings.types"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "services/contexts/ThemeContext"

interface LeaderboardDrawerProps {
    isOpen: boolean
    onClose: () => void
}

type SortOption = "overall-score" | "win-rate" | "communication-skills" | "all-calls"

interface RankedOperator extends Operator {
    rank: number
    win_rate: number
    won_calls?: number
}

export default function LeaderboardDrawer({ isOpen, onClose }: LeaderboardDrawerProps) {
    const [sortBy, setSortBy] = useState<SortOption>("overall-score")
    const { t } = useTranslation()
    const { theme } = useTheme()

    const { data: operatorData, isLoading } = useGetOperatorListQuery({
        page: 1,
        per_page: 500,
        search: "",
    })

    const operators: Operator[] = operatorData?.data || []

    // Barcha operatorlarga rank beramiz
    const rankedOperators: RankedOperator[] = operators.map((op, index) => ({
        ...op,
        rank: index + 1,
        win_rate: op.avarege_score?.overall_performance_score ?? 0,
    }))

    const sortOptions: SelectProps["options"] = [
        { value: "overall-score", label: t("Overall Performance Score") },
        { value: "win-rate", label: t("Win Rate") },
        { value: "communication-skills", label: t("Communication Skills") },
        { value: "all-calls", label: t("Total Calls") },
    ]

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return "🥇"
            case 2: return "🥈"
            case 3: return "🥉"
            default: return null
        }
    }

    const getScoreValue = (operator: RankedOperator) => {
        switch (sortBy) {
            case "overall-score":
                return operator.avarege_score?.overall_performance_score ?? "0"
            case "win-rate":
                return `${(operator.win_rate ?? 0).toFixed(1)}%`
            case "communication-skills":
                return operator.avarege_score?.communication_skills_score ?? "0"
            case "all-calls":
                return `${operator.all_calls ?? 0} calls`
            default:
                return operator.avarege_score?.overall_performance_score ?? "0"
        }
    }

    const getSortLabel = () => {
        const option = sortOptions.find(opt => opt.value === sortBy)
        return option?.label || t("Overall Performance Score")
    }

    const getRankBorderColor = (rank: number) => {
        switch (rank) {
            case 1: return "#ffd700" // gold
            case 2: return "#c0c0c0" // silver
            case 3: return "#cd7f32" // bronze
            default: return theme === "dark" ? "#4b5563" : "#e5e7eb"
        }
    }

    const getCardStyle = (operator: RankedOperator) => ({
        backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
        border: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
        borderLeft: `4px solid ${getRankBorderColor(operator.rank)}`,
        borderRadius: "8px",
        boxShadow: operator.rank <= 3
            ? theme === "dark" ? "0 4px 6px -1px rgba(0, 0, 0, 0.4)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            : theme === "dark" ? "0 1px 3px 0 rgba(0, 0, 0, 0.3)" : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease-in-out",
    })

    const rankNumberStyle = (rank: number) => ({
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "16px",
        borderRadius: "50%",
        backgroundColor: rank <= 3
            ? theme === "dark" ? "#4338ca20" : "#eef2ff"
            : theme === "dark" ? "#374151" : "#f9fafb",
        color: theme === "dark" ? "#f3f4f6" : "#374151",
    })

    const nameStyle = {
        fontWeight: "600",
        fontSize: "16px",
        marginBottom: "4px",
        color: theme === "dark" ? "#f3f4f6" : "#111827",
    }

    const scoreStyle = {
        fontSize: "14px",
        color: theme === "dark" ? "#9ca3af" : "#6b7280",
        marginBottom: "4px",
    }

    const topPerformerStyle = {
        fontSize: "12px",
        fontWeight: "600",
        color: "#fbbf24",
    }

    const drawerStyles = {
        mask: {
            transition: "all 0.3s ease-in-out",
            backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.45)"
        },
        content: {
            transition: "all 0.3s ease-in-out",
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff"
        },
        wrapper: { transition: "all 0.3s ease-in-out" },
        header: {
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            borderBottom: `1px solid ${theme === "dark" ? "#374151" : "#f0f0f0"}`,
            color: theme === "dark" ? "#f3f4f6" : "#000000"
        },
        body: {
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            padding: "24px"
        }
    }


    return (
        <Drawer
            title={
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <TrophyOutlined
                        style={{
                            fontSize: "24px",
                            color: "#fbbf24"
                        }}
                    />
                    <span style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}>
                        {t("Leaderboard")}
                    </span>
                </div>
            }
            placement="right"
            open={isOpen}
            onClose={onClose}
            width={420}
            styles={drawerStyles}
        >
            <div style={{ marginBottom: "24px" }}>
                <label
                    style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#d1d5db" : "#374151",
                        marginBottom: "8px"
                    }}
                >
                    {t("Sort by")}
                </label>
                <Select
                    value={sortBy}
                    onChange={(value: SortOption) => setSortBy(value)}
                    style={{ width: "100%" }}
                    options={sortOptions}
                    size="large"
                />
            </div>

            {isLoading ? (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px"
                }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {rankedOperators.map((operator, index) => (
                        <motion.div
                            key={operator.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div style={{
                                ...getCardStyle(operator),
                                display: "flex",
                                alignItems: "center",
                                padding: "16px",
                                cursor: "pointer"
                            }}>
                                <div style={rankNumberStyle(operator.rank)}>
                                    {getRankIcon(operator.rank) || (
                                        <span>{operator.rank}</span>
                                    )}
                                </div>

                                <Avatar
                                    size={48}
                                    src={operator.photo}
                                    icon={<UserOutlined />}
                                    style={{
                                        marginLeft: "16px",
                                        border: `2px solid ${getRankBorderColor(operator.rank)}`
                                    }}
                                />

                                <div style={{ marginLeft: "16px", flex: 1 }}>
                                    <div style={nameStyle}>
                                        {operator.name}
                                    </div>
                                    <div style={scoreStyle}>
                                        {getSortLabel()}: {getScoreValue(operator)}
                                    </div>
                                    {operator.rank <= 3 && (
                                        <div style={topPerformerStyle}>
                                            {t("Top Performer")}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </Drawer>
    )
}