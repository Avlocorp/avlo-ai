import CustomPieChart from "modules/AnalysisPage/components/Chart/PieChar"
import type React from "react"

interface CardChartProps {
    data?: any // Replace 'any' with the actual type of your pie chart data
    colorEmpty?: string
    colorFilled?: string
    title?: string
    Icon?: React.ComponentType
}

export default function CardChart({ data, colorEmpty = "#FFFFFF", colorFilled = "#000000", title, Icon }: CardChartProps) {
    return (
        <div className="p-4 w-full bg-[#2A2A2D] rounded-xl flex flex-col items-center gap-10">
            <div className="flex items-start justify-between w-full">
                <span className="text-white text-[22px]">{title}</span>
                {Icon && <Icon />}
            </div>
            <CustomPieChart data={data} colorEmpty={colorEmpty} colorFilled={colorFilled} />
        </div>
    )
}

