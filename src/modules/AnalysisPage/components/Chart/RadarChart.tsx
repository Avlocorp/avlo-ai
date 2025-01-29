import {
    RadarChart,
    PolarAngleAxis,
    PolarGrid,
    Radar,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface RadarChartProps {
    title?: string;
    dataRadar?: any[];
}
export const RadarChartComponent = ({ title, dataRadar }: RadarChartProps) => {
    return (
        <div className="w-full h-[400px] bg-[#2A2A2D] p-4 rounded-lg text-gray-100">
            <div className="text-[16px] px-2">{title}</div>

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={dataRadar}>
                    <PolarGrid stroke="#4a4a4d" />
                    <PolarAngleAxis dataKey="metric" stroke="#ccc" />
                    <Tooltip
                        content={({ payload }: any) =>
                            payload && payload.length ? (
                                <div className="p-2 bg-gray-800 rounded-lg text-sm">
                                    <p className="font-bold">{payload[0].payload.metric}</p>
                                    {payload.map((entry: any, index: number) => (
                                        <div
                                            key={index}
                                            className="flex justify-between"
                                            style={{ color: entry.color }}
                                        >
                                            <span>{entry.name}</span>
                                            <span>{entry.value}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                    />
                    <Radar
                        name="Series"
                        dataKey="series"
                        stroke="hsl(217, 91%, 60%)"
                        fill="hsl(217, 91%, 60%)"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name="Series 2"
                        dataKey="series2"
                        stroke="hsl(322, 100%, 66%)"
                        fill="hsl(322, 100%, 66%)"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name="Series 3"
                        dataKey="series3"
                        stroke="hsl(267, 84%, 81%)"
                        fill="hsl(267, 84%, 81%)"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};



