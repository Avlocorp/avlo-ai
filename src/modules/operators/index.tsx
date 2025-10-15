// Updated OperatorsDashboard.tsx
import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useGetOperatorListQuery } from "services/api/settings"
import { OperatorsTable } from "./components/OperatorsTable"
import { Operator } from "./types/operators.types"
import Language from "components/language"
import { useTheme } from "services/contexts/ThemeContext"

const OperatorsDashboard = () => {
    const [searchTerm] = useState("")
    const [selectedOperator, setSelectedOperator] = useState<number | null>(null)
    const { t } = useTranslation()
    const { theme } = useTheme()
    const {
        data: operatorsResponse,
        isLoading: operatorsLoading,
    } = useGetOperatorListQuery({
        per_page: 500,
        search: searchTerm,
    })

    const operators: Operator[] = operatorsResponse?.data || []



    const filteredOperators = useMemo(() => {
        return operators.filter(
            (operator) =>
                operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                operator.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [operators, searchTerm])

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb" }}
        >
            <div
                className="shadow-sm border-b"
                style={{
                    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                    borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb"
                }}
            >
                <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1
                            className="text-3xl font-bold"
                            style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
                        >
                            {t("Operator statistics")}
                        </h1>
                        <p
                            className=" text-sm"
                            style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
                        >
                            {t("Performance and financial performance monitoring")}
                        </p>
                    </div>
                    <Language />
                </div>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <OperatorsTable
                    operators={filteredOperators}
                    selectedOperator={selectedOperator}
                    onOperatorSelect={setSelectedOperator}
                    isLoading={operatorsLoading}
                />
            </div>
        </div>
    )
}

export default OperatorsDashboard