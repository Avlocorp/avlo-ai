import { AIResponse } from "services/api/home/home.type";
import { ChartDataProps, PieChartData, RadarChartData } from "./chart";

function createPieData(score: number): PieChartData[] {
  return [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];
}

function createRadarData(data: AIResponse): RadarChartData[] {
  return [
    { metric: "Overall Score", series1: data.overall_performance_score },
    { metric: "Communication", series1: data.communication_skills_score },
    { metric: "Customer Management", series1: data.customer_management_score },
    { metric: "Problem Handling", series1: data.problem_handling_score },
    { metric: "Protocol Adherence", series1: data.protocol_adherence_score },
  ];
}

export function generateChartData(data: AIResponse): ChartDataProps {
  return {
    pieData1: createPieData(data.overall_performance_score),
    pieData2: createPieData(data.problem_handling_score),
    pieData3: createPieData(data.communication_skills_score),
    pieData4: createPieData(data.customer_management_score),
    pieData5: createPieData(data.protocol_adherence_score),
    dataRadar: createRadarData(data),
  };
}
