import phoneImg from "assets/images/phoneImg.png";
import TalkBetweenMan from "assets/images/TalkBetweenMan.png";
import ParameterCard from "../../components/ParameterCards";
import CardChart from "modules/AnalysisPage/components/cardCharts";
import SuccessfulCallsPieChart from "../../components/Charts/ChartSuccessfulCalls";
import RadarChartForDashboard from "modules/Statistics/components/Charts/RadarChartForDashboard";
import PieChartEmoji from "modules/Statistics/components/Charts/PieChartEmoji";
import { useGetStatisticsQuery } from "services/api/home";
import AudiosAndOperators from "modules/Statistics/components/audios-and-operators";
import { useTranslation } from "react-i18next";

export default function StatisticsPages() {
  const { t } = useTranslation();
  const { data } = useGetStatisticsQuery();

  const pieData1 = [
    { name: t("Score"), value: data?.communication_skills_score },
    {
      name: t("Remaining"),
      value: 100 - Number(data?.communication_skills_score),
    },
  ];

  return (
    <div className="mx-8 pb-6">
      <div className="flex gap-6 mb-6 justify-between w-full">
        <ParameterCard
          Img={phoneImg}
          anmount={data?.total_calls ? data.total_calls.toString() : "0"}
          title={t("Total calls")}
          percentage="15%"
        />
        <ParameterCard
          Img={TalkBetweenMan}
          anmount={data?.members ? data?.members.toString() : "0"}
          title={t("Total team members")}
          percentage="-14%"
        />
      </div>
      <div className="flex justify-between w-full gap-6 mb-6">
        <PieChartEmoji />

        <CardChart
          title={t("Overall communication score")}
          data={pieData1}
          colorEmpty="#87888C"
          colorFilled="#0B72FC"
        />
      </div>
      <div className="mb-6 flex justify-between gap-6 text-white">
        <SuccessfulCallsPieChart
          failed={data?.unsuccessfully_calls || 0}
          successfull={data?.successfully_calls || 0}
        />
        <RadarChartForDashboard
          communication_skills_score={data?.communication_skills_score || 0}
          customer_management_score={data?.customer_management_score || 0}
          overall_performance_score={data?.overall_performance_score || 0}
          problem_handling_score={data?.problem_handling_score || 0}
          protocol_adherence_score={data?.protocol_adherence_score || 0}
        />
      </div>

      <div>
        <AudiosAndOperators />
      </div>
    </div>
  );
}
