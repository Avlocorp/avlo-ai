import { Card } from "antd"

interface AnalyticsCardProps {
    icon: React.ReactNode
    title: string
    value: string
    description: string
    borderColor: string
}

export function AnalyticsCard({ icon, title, value, description, borderColor }: AnalyticsCardProps) {
    return (
        <Card className={`shadow-sm hover:shadow-md transition-shadow border-l-4 ${borderColor} rounded-lg`}>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-50 rounded-full">{icon}</div>
                <div>
                    <div className="text-gray-600 mb-1 text-sm">{title}</div>
                    <div className="text-3xl font-bold mb-1">{value}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                </div>
            </div>
        </Card>
    )
}
