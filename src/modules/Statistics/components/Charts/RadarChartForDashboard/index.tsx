import { RadarChartComponent } from "modules/AnalysisPage/components/Chart/RadarChart";
import "./styles.css";
import { DashboardStatistics } from "services/api/home/home.type";
import { useTranslation } from "react-i18next";
export default function RadarChartForDashboard({
  overall_performance_score,
  communication_skills_score,
  customer_management_score,
  problem_handling_score,
  protocol_adherence_score,
}: Partial<DashboardStatistics>) {
  const { t } = useTranslation();

  const dataRadar = [
    { metric: t("Overall Score"), series: overall_performance_score },
    { metric: t("Communication"), series: communication_skills_score },
    { metric: t("Customer Management"), series: customer_management_score },
    { metric: t("Problem Handling"), series: problem_handling_score },
    { metric: t("Protocol Adherence"), series: protocol_adherence_score },
  ];
  return (
    <div className=" w-full  rounded-lg ">
      <div className="flex justify-between items-center">
        <p className="text-2xl">{t("Performance metrics")}</p>
      </div>
      <RadarChartComponent dataRadar={dataRadar} />
    </div>
  );
}
