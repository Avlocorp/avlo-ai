import {
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./style.scss";

interface RadarChartProps {
  title?: string;
  dataRadar?: Array<{
    metric: string;
    series: number;
  }>;
  theme?: "light" | "dark";
}

export const RadarChartComponent = ({ title, dataRadar, theme = "light" }: RadarChartProps) => {
  // Theme-based colors
  const colors = {
    light: {
      grid: "#e5e7eb",
      text: "#374151",
      radar: "#4338ca",
      radarFill: "rgba(67, 56, 202, 0.1)",
      tooltipBg: "#ffffff",
      tooltipBorder: "#d1d5db",
      tooltipText: "#111827",
    },
    dark: {
      grid: "#4b5563",
      text: "#d1d5db",
      radar: "#6366f1",
      radarFill: "rgba(99, 102, 241, 0.1)",
      tooltipBg: "#374151",
      tooltipBorder: "#6b7280",
      tooltipText: "#f9fafb",
    }
  };

  const currentColors = colors[theme];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload?.length) {
      return (
        <div
          style={{
            backgroundColor: currentColors.tooltipBg,
            border: `1px solid ${currentColors.tooltipBorder}`,
            borderRadius: "6px",
            padding: "8px 12px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              color: currentColors.tooltipText,
              fontWeight: "600",
              marginBottom: "4px",
            }}
          >
            {payload[0].payload.metric}
          </div>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              style={{
                color: currentColors.tooltipText,
                fontSize: "14px",
              }}
            >
              Score: {entry.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!dataRadar || dataRadar?.length === 0) {
    return (
      <div
        className="radar-chart-container"
        style={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: currentColors.text,
        }}
      >
        No data available
      </div>
    );
  }

  return (
    <div className="radar-chart-container" style={{ width: "100%", height: "300px" }}>
      {title && (
        <div
          style={{
            color: currentColors.text,
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {title}
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={dataRadar}>
          <PolarGrid
            stroke={currentColors.grid}
            strokeWidth={1}
          />
          <PolarAngleAxis
            dataKey="metric"
            tick={{
              fill: currentColors.text,
              fontSize: 12,
              fontWeight: "500"
            }}
          />
          <Radar
            name="Performance"
            dataKey="series"
            stroke={currentColors.radar}
            fill={currentColors.radarFill}
            strokeWidth={2}
            dot={{
              fill: currentColors.radar,
              strokeWidth: 0,
              r: 4,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};