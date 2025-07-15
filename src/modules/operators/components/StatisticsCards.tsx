import { TrendingUp, TrendingDown, DollarSign, Users, Target } from "lucide-react"
import { StatisticsCard } from "./StatisticsCard"
import { useTranslation } from "react-i18next"

interface StatisticsCardsProps {
    baseData: any
}

export const StatisticsCards = ({ baseData }: StatisticsCardsProps) => {
    if (!baseData?.data1) return null
    const { t } = useTranslation()
    const data = baseData.data1
    const conversionRate = ((data.total_prices?.kelishuv_value / data.total_prices?.price) * 100) || 0

    const cardData = [
        {
            title: "Total Earned",
            value: data.total_prices?.price || 0,
            icon: <TrendingUp />,
            iconBgColor: "bg-green-100",
            iconColor: "text-green-600",
            suffix: "so'm"
        },
        {
            title: "Expected Additional Payments",
            value: data.total_prices?.qolgan_qarz || 0,
            icon: <TrendingDown />,
            iconBgColor: "bg-orange-100",
            iconColor: "text-orange-600",
            suffix: "so'm"
        },
        {
            title: "Total Agreed",
            value: data.total_prices?.kelishuv_value || 0,
            icon: <Target />,
            iconBgColor: "bg-indigo-100",
            iconColor: "text-indigo-600",
            suffix: "so'm"
        },
        {
            title: "Total Leads",
            value: data.total_leads + " " + t("ta") || 0,
            icon: <Users />,
            iconBgColor: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            title: "Average Conversion",
            value: `${conversionRate.toFixed(1)}%`,
            icon: <DollarSign />,
            iconBgColor: "bg-purple-100",
            iconColor: "text-purple-600"
        }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {cardData.map((card, index) => (
                <StatisticsCard key={index} {...card} />
            ))}
        </div>
    )
}