import { RadarChartComponent } from "modules/AnalysisPage/components/Chart/RadarChart";
import "./styles.css";
import { DashboardStatistics } from "services/api/home/home.type";
export default function RadarChartForDashboard({
  overall_performance_score,
  communication_skills_score,
  customer_management_score,
  problem_handling_score,
  protocol_adherence_score,
}: Partial<DashboardStatistics>) {
  const dataRadar = [
    { metric: "Overall Score", series: overall_performance_score },
    { metric: "Communication", series: communication_skills_score },
    { metric: "Customer Management", series: customer_management_score },
    { metric: "Problem Handling", series: problem_handling_score },
    { metric: "Protocol Adherence", series: protocol_adherence_score },
  ];
  return (
    <div className=" w-full bg-[#2A2A2D] p-4 rounded-lg text-gray-100">
      <div className="flex justify-between items-center">
        <p className="text-2xl">Performance metrics</p>
        {/* <DatePicker
          placeholder="All time"
          className="bg-[#48484e] text-white custom-datepicker hover:bg-[#48484e]"
          variant="outlined"
          onChange={() => {}}
          suffixIcon={<CalendarIcon />}
        /> */}
      </div>
      <RadarChartComponent dataRadar={dataRadar} />
    </div>
  );
}
