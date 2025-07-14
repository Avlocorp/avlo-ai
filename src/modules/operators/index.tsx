import { useState, useEffect, useMemo } from "react"
import { useGetOperatorDashboardStaticsQuery } from "services/api/operators/operators.api"
import { useTranslation } from "react-i18next"
import { useGetOperatorListQuery } from "services/api/settings"
import { StatisticsCards } from "./components/StatisticsCards"
import { OperatorsTable } from "./components/OperatorsTable"
import { OperatorDetails } from "./components/OperatorDetails"
import { useOperatorDashboard } from "./hooks/useOperatorDashboard"
import { Operator, TableData } from "./types/operators.types"
import Language from "components/language"

const OperatorsDashboard = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedOperator, setSelectedOperator] = useState<number | null>(null)
    const { t } = useTranslation()
    console.log(setSearchTerm)
    // Get all operators for the table
    const {
        data: operatorsResponse,
        isLoading: operatorsLoading,
    } = useGetOperatorListQuery({
        per_page: 500,
        search: searchTerm,
    })

    const { data: baseData } = useGetOperatorDashboardStaticsQuery()
    const operators: Operator[] = operatorsResponse?.data || []

    // Use custom hook for dashboard data
    const { getDashboardDataById } = useOperatorDashboard(operators)

    // Auto-select first operator when operators are loaded
    useEffect(() => {
        if (operators?.length > 0 && !selectedOperator) {
            setSelectedOperator(operators[0].id)
        }
    }, [operators, selectedOperator])

    // Filter operators based on search term
    const filteredOperators = useMemo(() => {
        return operators.filter(
            (operator) =>
                operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                operator.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [operators, searchTerm])

    // Get selected operator details
    const selectedOperatorData = useMemo(() => {
        return operators.find((op) => op.id === selectedOperator)
    }, [operators, selectedOperator])

    const getTableData = (operator: Operator): TableData => {
        const dashboardItem = getDashboardDataById(operator.id)

        // If there's an error, show default values
        if (dashboardItem?.error) {
            return {
                totalLeads: 0,
                agreedPrice: 0,
                remainingPrice: 0,
                totalPrice: 0,
                isLoading: false,
                hasError: true,
            }
        }

        // Show loading state
        if (dashboardItem?.isLoading) {
            return {
                totalLeads: 0,
                agreedPrice: 0,
                remainingPrice: 0,
                totalPrice: 0,
                isLoading: true,
                hasError: false,
            }
        }

        // If no data available, show default values
        if (!dashboardItem?.data?.data1) {
            return {
                totalLeads: 0,
                agreedPrice: 0,
                remainingPrice: 0,
                totalPrice: 0,
                isLoading: false,
                hasError: false,
            }
        }

        // Normal data display
        const data1 = dashboardItem.data.data1
        return {
            totalLeads: data1.total_leads || 0,
            agreedPrice: data1.total_prices?.kelishuv_value || 0,
            remainingPrice: data1.total_prices?.qolgan_qarz || 0,
            totalPrice: data1.total_prices?.price || 0,
            isLoading: false,
            hasError: false,
        }
    }

    // Get selected operator's dashboard data for details
    const selectedDashboardData = selectedOperator ? getDashboardDataById(selectedOperator) : null

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">{t("Operator statistics")}</h1>
                        <p className="mt-2 text-sm text-gray-600">{t("Performance and financial performance monitoring")}</p>
                    </div>
                    <Language />
                </div>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Cards */}
                <StatisticsCards baseData={baseData} />

                {/* Operators Table */}
                <OperatorsTable
                    operators={filteredOperators}
                    selectedOperator={selectedOperator}
                    onOperatorSelect={setSelectedOperator}
                    getTableData={getTableData}
                    isLoading={operatorsLoading}
                />

                {/* Operator Details */}
                <OperatorDetails
                    selectedOperator={selectedOperator}
                    selectedOperatorData={selectedOperatorData}
                    selectedDashboardData={selectedDashboardData}
                />
            </div>
        </div>
    )
}

export default OperatorsDashboard
