import { RadarChartComponent } from "modules/AnalysisPage/components/Chart/RadarChart";
import "./styles.css";
import { DashboardStatistics } from "services/api/home/home.type";
import { useTranslation } from "react-i18next";
import { useTheme } from "services/contexts/ThemeContext";

export default function RadarChartForDashboard({
  overall_performance_score,
  communication_skills_score,
  customer_management_score,
  problem_handling_score,
  protocol_adherence_score,
}: Partial<DashboardStatistics>) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const dataRadar = [
    { metric: t("Overall Score"), series: overall_performance_score || 0 },
    { metric: t("Communication"), series: communication_skills_score || 0 },
    { metric: t("Customer Management"), series: customer_management_score || 0 },
    { metric: t("Problem Handling"), series: problem_handling_score || 0 },
    { metric: t("Protocol Adherence"), series: protocol_adherence_score || 0 },
  ];

  const isDark = theme === "dark";

  return (
    <div
      style={{
        backgroundColor: isDark ? "#374151" : "#ffffff",
        borderRadius: "8px",
        padding: "16px",
        border: isDark ? "1px solid #4b5563" : "1px solid #d1d5db",
      }}
      className="radar-chart-container"
    >
      <div
        style={{
          color: isDark ? "#f3f4f6" : "#111827",
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        {t("Performance metrics")}
      </div>
      <RadarChartComponent
        dataRadar={dataRadar}
        theme={theme}
      />
    </div>
  );
}
