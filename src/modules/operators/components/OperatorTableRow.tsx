import { Operator, TableData } from "../types/operators.types"
import { formatNumber } from "components/lib/utils"
import { useTranslation } from "react-i18next"

interface OperatorTableRowProps {
    operator: Operator
    tableData: TableData
    isSelected: boolean
    onSelect: (operatorId: number) => void
}

export const OperatorTableRow = ({ operator, tableData, isSelected, onSelect }: OperatorTableRowProps) => {
    const { t } = useTranslation()

    const percentage = (tableData.agreedPrice === "-" || tableData.totalPrice === "-")
        ? 0
        : isFinite((Number(tableData.totalPrice) / Number(tableData.agreedPrice)) * 100)
            ? (Number(tableData.totalPrice) / Number(tableData.agreedPrice)) * 100
            : 0

    const LoadingCell = () => (
        <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-8 rounded"></div>
        </div>
    )

    return (
        <tr
            className={`hover:bg-gray-50 transition-colors cursor-pointer ${isSelected ? "bg-blue-50 border-l-4 border-blue-500" : ""
                }`}
            onClick={() => onSelect(operator.id)}
        >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {operator.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="">
                        <div className="text-sm font-medium text-gray-900">
                            {operator.name} {operator.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{operator.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {tableData.isLoading ? <LoadingCell /> : tableData.totalLeads}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                {tableData.isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
                ) : (
                    `${formatNumber(tableData.agreedPrice)} ${t("so'm")}`
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                {tableData.isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
                ) : (
                    `${formatNumber(tableData.totalPrice)} ${t("so'm")}`
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">
                {tableData.isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
                ) : (
                    `${formatNumber(tableData.remainingPrice)} ${t("so'm")}`
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">
                {tableData.isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
                ) : (
                    `${percentage.toFixed(1)}%`
                )}
            </td>
        </tr>
    )
}
