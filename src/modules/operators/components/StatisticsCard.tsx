import { ReactNode } from "react"
import { formatNumber } from "components/lib/utils"
import { useTranslation } from "react-i18next"

interface StatisticsCardProps {
    title: string
    value: string | number
    icon: ReactNode
    iconBgColor: string
    iconColor: string
    suffix?: string
}

export const StatisticsCard = ({ title, value, icon, iconBgColor, iconColor, suffix }: StatisticsCardProps) => {
    const { t } = useTranslation()

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-base font-medium text-gray-600 h-10 flex items-center">{t(title)}</p>
                    <p className="text-lg font-bold text-gray-900 h-8 flex items-center">
                        {typeof value === 'number' ? formatNumber(value) : value}
                        {suffix && ` ${t(suffix)}`}
                    </p>
                </div>
                <div className={`p-3 ${iconBgColor} rounded-full`}>
                    <div className={`h-6 w-6 ${iconColor}`}>
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    )
}