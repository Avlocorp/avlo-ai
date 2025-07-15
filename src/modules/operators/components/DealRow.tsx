import { ArrowUpRight } from "lucide-react"
import { Button } from "antd"
import { formatNumber } from "components/lib/utils"

interface Deal {
    id: number
    name: string
    kurs_turi: string
    pipline: string
    kelishuv_value: number
    price: number
    qolgan_qarz: number
}

interface DealRowProps {
    deal: Deal
}

export const DealRow = ({ deal }: DealRowProps) => {

    const getPipelineStatus = (pipline: string) => {
        type PipelineKey = "Online" | "Offline" | "default";
        const statusMap: Record<PipelineKey, { bg: string; text: string; width: string }> = {
            Online: { bg: "bg-green-100", text: "text-green-700", width: "w-[70px]" },
            Offline: { bg: "bg-blue-100", text: "text-blue-700", width: "w-[73px]" },
            default: { bg: "bg-gray-100", text: "text-gray-700", width: "w-[80px]" }
        };

        const status =
            pipline === "Online" || pipline === "Offline"
                ? statusMap[pipline]
                : statusMap.default;

        return (
            <p className={`${status.bg} ${status.text} ${status.width} text-center px-3 py-1 rounded-full text-sm font-medium`}>
                {pipline}
            </p>
        )
    }

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-2 py-3 text-sm text-gray-900">{deal.id}</td>
            <td className="px-2 py-3 text-sm text-gray-900 font-medium max-w-[200px] break-words">
                {deal.name}
            </td>
            <td className="px-2 py-3 text-sm text-gray-500">{deal.kurs_turi}</td>
            <td className="px-2 py-3 text-sm text-gray-500">
                {getPipelineStatus(deal.pipline)}
            </td>
            <td className="px-2 py-3 text-sm font-semibold text-indigo-600">
                {formatNumber(deal.kelishuv_value)}
            </td>
            <td className="px-2 py-3 text-sm text-green-600">
                {formatNumber(deal.price)}
            </td>
            <td className="px-2 py-3 text-sm font-semibold text-orange-600">
                {formatNumber(deal.qolgan_qarz)}
            </td>
            <td className="px-2 py-3 text-sm text-gray-500">
                <Button
                    className="p-2"
                    onClick={() => {
                        window.open(`https://najotnur01.amocrm.ru/leads/detail/${deal.id}`, "_blank")
                    }}
                >
                    <ArrowUpRight className="h-5 w-5" />
                </Button>
            </td>
        </tr>
    )
}