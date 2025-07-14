import type React from "react"
import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { SettingOutlined } from "@ant-design/icons"
import ChecklistTab from "./components/chech-list"
import OffensiveWordsTab from "./components/offensive-word"
import SimpleAIChat from "components/simpleAIchat"
import { useTheme } from "services/contexts/ThemeContext"
import SettingsButton from "modules/Statistics/components/setting-btn"
import MetricsSelectionModal from "modules/Statistics/components/MetricsSelectionModal"
import { useTranslation } from "react-i18next"

export default function SalesDashboard() {
    const [activeTab, setActiveTab] = useState("checklist")
    const { theme } = useTheme()
    const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false)
    const { t } = useTranslation()
    const getStyles = () => {
        const isDark = theme === "dark"
        return {
            container: {
                backgroundColor: isDark ? "#1f2937" : "#f9fafb",
                color: isDark ? "#f3f4f6" : "#111827",
                minHeight: "calc(100vh )",
            },
            contentCard: {
                backgroundColor: isDark ? "#374151" : "#ffffff",
                borderColor: isDark ? "#4b5563" : "#e5e7eb",
                boxShadow: isDark
                    ? "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            },
            select: {
                backgroundColor: isDark ? "#4b5563" : "#ffffff",
                borderColor: isDark ? "#6b7280" : "#d1d5db",
                color: isDark ? "#f3f4f6" : "#111827",
            },
            settingsButton: {
                backgroundColor: "transparent",
                color: isDark ? "#9ca3af" : "#6b7280",
                hoverBackgroundColor: isDark ? "#4b5563" : "#f3f4f6",
            },
        }
    }

    const styles = getStyles()

    return (
        <div
            className=" p-6 flex flex-col"
            style={styles.container}
        >
            <div className="flex mb-6 gap-4">
                <TabButton
                    isActive={activeTab === "checklist"}
                    onClick={() => setActiveTab("checklist")}
                    theme={theme}
                >
                    {t("Checklist")}
                </TabButton>
                <TabButton
                    isActive={activeTab === "offensive-words"}
                    onClick={() => setActiveTab("offensive-words")}
                    theme={theme}
                >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {t("Offensive-Words Finder")}
                </TabButton>
                <div className="ml-auto flex  items-center">
                    <select
                        className="border rounded px-2 outline-none h-8 w-[160px] cursor-pointer py-1 text-sm mr-2"
                        style={styles.select}
                    >
                        <option>All SDRs</option>
                        <option>Team 1</option>
                        <option>Team 2</option>
                        <option>Team 3</option>
                        <option>Team 4</option>
                    </select>
                    <SettingsButton
                        onClick={() => setIsMetricsModalOpen(true)}
                        icon={<SettingOutlined style={{ fontSize: '16px' }} />}
                    />
                </div>
            </div>

            <div
                className="rounded-lg border"
                style={styles.contentCard}
            >
                {activeTab === "checklist" && <ChecklistTab />}
                {activeTab === "offensive-words" && <OffensiveWordsTab />}
            </div>

            <div className="mt-auto mb-4">
                <SimpleAIChat context="sdr" />
            </div>
            <MetricsSelectionModal
                isOpen={isMetricsModalOpen}
                onClose={() => setIsMetricsModalOpen(false)}
            />
        </div>
    )
}

function TabButton({
    children,
    isActive,
    onClick,
    theme,
}: {
    children: React.ReactNode
    isActive: boolean
    onClick: () => void
    theme: string
}) {
    const getTabStyles = () => {
        const isDark = theme === "dark"

        if (isActive) {
            return {
                backgroundColor: "#4F46E4",
                color: "#ffffff",
                borderColor: "#4338ca",
            }
        }

        return {
            backgroundColor: isDark ? "#4b5563" : "#E4E7EB",
            color: isDark ? "#d1d5db" : "#374251",
            hoverColor: isDark ? "#f3f4f6" : "#1f2937",
        }
    }

    const tabStyles = getTabStyles()

    return (
        <button
            className="flex items-center px-4 py-3 rounded-xl h-10 font-medium text-sm transition-all duration-200 hover:scale-105"
            style={{
                backgroundColor: tabStyles.backgroundColor,
                color: tabStyles.color,
                border: isActive ? `2px solid ${tabStyles.borderColor}` : "1px solid transparent",
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                if (!isActive && tabStyles.hoverColor) {
                    e.currentTarget.style.color = tabStyles.hoverColor
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.color = tabStyles.color
                }
            }}
        >
            {children}
        </button>
    )
}