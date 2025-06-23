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
    <div className="w-full h-[400px]  p-4 rounded-lg ">
      <div className="text-[16px] px-2">{title}</div>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={dataRadar}>
          <PolarGrid stroke="#4a4a4d" />
          <PolarAngleAxis dataKey="metric" stroke="#000" />
          <Tooltip
            content={({ payload }: any) =>
              payload && payload.length ? (
                <div className="p-2 bg-white border rounded-lg text-sm">
                  <p className="font-bold">{payload[0].payload.metric}</p>
                  {payload.map((entry: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-1"
                      style={{ color: entry.color }}
                    >
                      <span>{entry.name}:</span>
                      <span>{entry.value}</span>
                    </div>
                  ))}
                </div>
              ) : null
            }
          />
          <Radar
            //  name: {entry.name}
            name="Score"
            dataKey="series"
            stroke="hsl(217, 91%, 60%)"
            fill="hsl(217, 91%, 60%)"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
