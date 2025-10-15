import { useNavigate } from "react-router-dom"
import { Operator, TableData } from "../types/operators.types"
import { useTheme } from "services/contexts/ThemeContext"

interface OperatorTableRowProps {
    operator: Operator
    tableData?: TableData
    isSelected: boolean
    onSelect: (operatorId: number) => void
    index: number
}
export const OperatorTableRow = ({
    operator,
    isSelected,
    index,
}: OperatorTableRowProps) => {
    const { theme } = useTheme()
    const navigate = useNavigate()

    return (
        <tr
            className="cursor-pointer transition-colors duration-150 hover:bg-opacity-50"
            style={{
                backgroundColor: isSelected
                    ? (theme === "dark" ? "#4b5563" : "#f3f4f6")
                    : "transparent"
            }}
            // onMouseEnter={(e) => {
            //     if (!isSelected) {
            //         e.currentTarget.style.backgroundColor = theme === "dark" ? "#4b556330" : "#f9fafb"
            //     }
            // }}
            // onMouseLeave={(e) => {
            //     if (!isSelected) {
            //         e.currentTarget.style.backgroundColor = "transparent"
            //     }
            // }}
            onClick={() => {
                navigate(`/pm/agents/${operator.id}`)
            }}
        >
            <td
                className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
            >
                {index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                        style={{ backgroundColor: `hsl(${operator.id * 137.5 % 360}, 50%, 45%)` }}
                    >
                        {operator.name.charAt(0)}{operator.last_name?.charAt(0) || ''}
                    </div>
                    <div className="ml-4">
                        <div
                            className="text-sm font-medium"
                            style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
                        >
                            {operator.name} {operator.last_name}
                        </div>
                    </div>
                </div>
            </td>

            <td
                className="px-6 py-4 whitespace-nowrap text-sm"
                style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            >
                {operator?.all_calls_count ?? 0}
            </td>
            <td
                className="px-6 py-4 whitespace-nowrap text-sm"
                style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
            >
                {operator?.analysed_calls_count ?? 0}
            </td>

        </tr>
    )
}
