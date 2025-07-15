import { Operator, TableData } from "../types/operators.types"
import { OperatorTableRow } from "./OperatorTableRow"
import { useTranslation } from "react-i18next"

interface OperatorsTableProps {
    operators: Operator[]
    selectedOperator: number | null
    onOperatorSelect: (operatorId: number | null) => void
    getTableData: (operator: Operator) => TableData
    isLoading: boolean
}

export const OperatorsTable = ({
    operators,
    selectedOperator,
    onOperatorSelect,
    getTableData,
    isLoading
}: OperatorsTableProps) => {
    const { t } = useTranslation()

    const handleOperatorClick = (operatorId: number) => {
        if (selectedOperator === operatorId) {
            onOperatorSelect(null)
        } else {
            onOperatorSelect(operatorId)
        }
    }

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">{t("Loading operators...")}</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500  tracking-wider">
                                {t("ID")}
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500  tracking-wider">
                                {t("Operator")}
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500  tracking-wider">
                                {t("Total Leads")}
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500  tracking-wider">
                                {t("Agreed Price")}
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500  tracking-wider">
                                {t("Paid Price")}
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500  tracking-wider">
                                {t("Remaining Price")}
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500  tracking-wider">
                                {t("Progress")}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {operators.map((operator) => (
                            <OperatorTableRow
                                key={operator.id}
                                operator={operator}
                                tableData={getTableData(operator)}
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