import { Operator, TableData } from "../types/operators.types"
import { OperatorTableRow } from "./OperatorTableRow"
import { useTranslation } from "react-i18next"
import { useTheme } from "services/contexts/ThemeContext"

interface OperatorsTableProps {
    operators: Operator[]
    selectedOperator: number | null
    onOperatorSelect: (operatorId: number | null) => void
    getTableData?: (operator: Operator) => TableData
    isLoading: boolean
}

export const OperatorsTable = ({
    operators,
    selectedOperator,
    onOperatorSelect,
    isLoading
}: OperatorsTableProps) => {
    const { t } = useTranslation()
    const { theme } = useTheme()

    const handleOperatorClick = (operatorId: number) => {
        if (selectedOperator === operatorId) {
            onOperatorSelect(null)
        } else {
            onOperatorSelect(operatorId)
        }
    }

    if (isLoading) {
        return (
            <div
                className="p-8 text-center rounded-xl shadow-sm border"
                style={{
                    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                    borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb"
                }}
            >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p
                    className="mt-2"
                    style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
                >
                    {t("Loading operators...")}
                </p>
            </div>
        )
    }

    return (
        <div
            className="rounded-xl shadow-sm overflow-hidden border"
            style={{
                backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb"
            }}
        >
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead
                        className="border-b"
                        style={{
                            backgroundColor: theme === "dark" ? "#4b5563" : "#f9fafb",
                            borderColor: theme === "dark" ? "#6b7280" : "#e5e7eb"
                        }}
                    >
                        <tr>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold tracking-wider"
                                style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
                            >
                                {t("№")}
                            </th>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold tracking-wider"
                                style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
                            >
                                {t("Operator")}
                            </th>

                            <th
                                className="px-6 py-4 text-left text-sm font-semibold tracking-wider"
                                style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
                            >
                                {t("All Calls Count")}
                            </th>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold tracking-wider"
                                style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
                            >
                                {t("Analysed Calls Count")}
                            </th>

                        </tr>
                    </thead>
                    <tbody
                        className="divide-y"
                        style={{
                            backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                            color: theme === "dark" ? "#d1d5db" : "#000000"
                        }}
                    >
                        {operators.map((operator, index) => (
                            <OperatorTableRow
                                index={index}
                                key={operator.id}
                                operator={operator}
                                // tableData={getTableData(operator)}
                                isSelected={selectedOperator === operator.id}
                                onSelect={handleOperatorClick}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

