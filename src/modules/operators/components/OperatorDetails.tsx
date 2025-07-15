import { DealRow } from "./DealRow"
import { useTranslation } from "react-i18next"
import { Operator } from "../types/operators.types"

interface OperatorDetailsProps {
    selectedOperator: number | null
    selectedOperatorData: Operator | undefined
    selectedDashboardData: any
}

export const OperatorDetails = ({
    selectedOperator,
    selectedOperatorData,
    selectedDashboardData
}: OperatorDetailsProps) => {
    const { t } = useTranslation()

    if (!selectedOperator || !selectedDashboardData?.data) {
        return null
    }

    const hasDeals = selectedDashboardData.data?.data2 && selectedDashboardData.data.data2?.length > 0

    return (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    {t("Operator Details")}: {selectedOperatorData?.name} {selectedOperatorData?.last_name}
                </h3>
                <p className="text-sm text-gray-600">
                    {t("ID")}: {selectedOperator}
                </p>
            </div>

            {hasDeals ? (
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-500">{t("ID")}</th>
                                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-500">{t("Name")}</th>
                                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-500">{t("Course type")}</th>
                                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-500">{t("Pipline")}</th>
                                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-500">{t("Agreed")}</th>
                                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-500">{t("Price")}</th>
                                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-500">{t("Remaining")}</th>
                                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-500">{t("Actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {selectedDashboardData.data.data2.map((deal: any) => (
                                    <DealRow key={deal.id} deal={deal} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="p-8 text-center text-gray-500">
                    <p>{t("No data to display")}</p>
                </div>
            )}
        </div>
    )
}