import { Avatar, Drawer, Select, Spin } from "antd"
import { TrophyOutlined, UserOutlined } from "@ant-design/icons"
import { useGetOperatorListQuery } from "services/api/settings"
import type { SelectProps } from "antd"
import type { Operator } from "services/api/settings/settings.types"
import { useState } from "react"
import { useTranslation } from "react-i18next"

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
        win_rate: op.avarege_score?.overall_performance_score ?? 0, // yoki real win_rate bo'lsa uni yozing
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

    return (
        <Drawer
            title={
                <div className="flex items-center gap-2">
                    <TrophyOutlined className="text-yellow-500" style={{ fontSize: "25px" }} />
                    <span>{t("Leaderboard")}</span>
                </div>
            }
            placement="right"
            open={isOpen}
            onClose={onClose}
            width={400}
            style={{ transition: "all 0.8s ease-in-out" }}
            styles={{
                mask: { transition: "all 0.8s ease-in-out" },
                content: { transition: "all 0.8s ease-in-out" },
                wrapper: { transition: "all 0.8s ease-in-out" },
            }}
        >
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Sort by")}</label>
                <Select
                    value={sortBy}
                    onChange={(value: SortOption) => setSortBy(value)}
                    className="w-full"
                    options={sortOptions}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <Spin />
                </div>
            ) : (
                <div className="space-y-2">
                    {rankedOperators.map((operator) => (
                        <div
                            key={operator.id}
                            className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${operator.rank <= 3
                                ? "border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-md"
                                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                                }`}
                        >
                            <div className="w-10 h-10 flex items-center justify-center font-bold text-lg">
                                {getRankIcon(operator.rank) || (
                                    <span className="text-gray-500">{operator.rank}</span>
                                )}
                            </div>

                            <Avatar size={40} src={operator.photo} icon={<UserOutlined />} className="ml-2" />

                            <div className="ml-3 flex-grow">
                                <div className={`font-medium ${operator.rank <= 3 ? "text-gray-800" : "text-gray-700"}`}>
                                    {operator.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {getSortLabel()}: {getScoreValue(operator)}
                                </div>
                                {operator.rank <= 3 && (
                                    <div className="text-xs text-yellow-600 font-medium">{t("Top Performer")}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Drawer>
    )
}
