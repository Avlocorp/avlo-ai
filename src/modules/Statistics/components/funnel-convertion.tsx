import { useState, useRef } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
    Tooltip
} from "recharts"
import { Maximize2, Minimize2 } from 'lucide-react'

export default function FunnelConversion() {
    const [activeBar, setActiveBar] = useState<string | null>(null)
    console.log(activeBar)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const stages = [
        { name: "Prospecting", percentage: 80, count: 100 },
        { name: "Qualifying", percentage: 60, count: 75 },
        { name: "Demo", percentage: 45, count: 40 },
        { name: "Proposal", percentage: 30, count: 25 },
        { name: "Negotiation", percentage: 20, count: 15 },
        { name: "Closed", percentage: 10, count: 10 },
    ]

    const data = stages.map((stage) => ({
        name: stage.name,
        value: stage.percentage,
        count: stage.count,
    }))

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length && payload[0].payload.value > 0) {
            const data = payload[0].payload
            return (
                <div className="bg-white p-4 border border-gray-200 shadow-md" style={{ minWidth: "150px" }}>
                    <p className="text-gray-900 font-medium">{data.name}</p>
                    <p className="text-blue-500">Count: {data.count}</p>
                </div>
            )
        }
        return null
    }

    const handleMouseEnter = (data: any) => {
        setActiveBar(data.name)
    }

    const handleMouseLeave = () => {
        setActiveBar(null)
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            if (containerRef.current?.requestFullscreen) {
                containerRef.current.requestFullscreen()
                    .then(() => setIsFullscreen(true))
                    .catch(err => console.error(`Error entering fullscreen: ${err.message}`))
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                    .then(() => setIsFullscreen(false))
                    .catch(err => console.error(`Error exiting fullscreen: ${err.message}`))
            }
        }
    }

    // Custom label to always show lead count
    const renderCustomLabel = ({ x, y, width, height, index }: any) => {
        const stage = data[index]
        return (
            <text
                x={x + width + 10}
                y={y + height / 2 + 5}
                fill="#4B5563"
                fontSize="14"
            >
                {stage.count} leads
            </text>
        )
    }

    if (typeof document !== 'undefined') {
        document.addEventListener('fullscreenchange', () => {
            setIsFullscreen(!!document.fullscreenElement)
        })
    }

    return (
        <div
            ref={containerRef}
            className={`bg-white rounded-lg shadow-sm p-6 relative ${isFullscreen ? 'w-full h-full flex flex-col' : ''}`}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Funnel Conversion</h2>
                <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                    {isFullscreen ? (
                        <Minimize2 className="w-5 h-5 text-gray-600" />
                    ) : (
                        <Maximize2 className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>

            <div className={`${isFullscreen ? 'flex-grow' : 'h-[400px]'} w-full`}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 30, bottom: 25 }}
                        barSize={isFullscreen ? 30 : 20}
                        onMouseLeave={handleMouseLeave}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            tickCount={5}
                            ticks={[0, 25, 50, 75, 100]}
                            tickFormatter={(value) => `${value}%`}
                            stroke="#9ca3af"
                            fontSize={isFullscreen ? 16 : 14}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={100}
                            tick={{ fill: "#4B5563", fontSize: isFullscreen ? 18 : 16 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar
                            dataKey="value"
                            background={{ fill: "#e5e7eb" }}
                            radius={0}
                            onMouseEnter={handleMouseEnter}
                            label={renderCustomLabel}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value > 0 ? "#6366F1" : "#e5e7eb"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
