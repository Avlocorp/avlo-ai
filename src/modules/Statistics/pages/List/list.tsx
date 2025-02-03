import Hourglass from "assets/images/Hourglass.png";
import phoneImg from "assets/images/phoneImg.png";
import TalkBetweenMan from "assets/images/TalkBetweenMan.png";
import ParameterCard from "../../components/ParameterCards";
import CardChart from "modules/AnalysisPage/components/cardCharts";
import SuccessfulCallsPieChart from "../../components/Charts/ChartSuccessfulCalls";
import RadarChartForDashboard from "modules/Statistics/components/Charts/RadarChartForDashboard";
import PieChartEmoji from "modules/Statistics/components/Charts/PieChartEmoji";
import AudiosTable from "modules/Statistics/components/audios-table";
export default function StatisticsPages() {
  const pieData1 = [
    { name: "Score", value: 77 },
    { name: "Remaining", value: 100 - 77 },
  ];

  return (
    <div className="mx-8 pb-6">
      <div className="flex gap-6 mb-6 justify-between w-full">
        <ParameterCard
          anmount="24"
          Img={Hourglass}
          title="Total hours"
          percentage="15%"
        />
        <ParameterCard
          Img={phoneImg}
          anmount="1000"
          title="Total calls"
          percentage="15%"
        />
        <ParameterCard
          Img={TalkBetweenMan}
          anmount="29"
          title="Total team members"
          percentage="-14%"
        />
      </div>
      <div className="flex justify-between w-full gap-6 mb-6">
        <PieChartEmoji />

        <CardChart
          title="Overall communication score"
          data={pieData1}
          colorEmpty="#87888C"
          colorFilled="#0B72FC"
        />
      </div>
      <div className="mb-6 flex justify-between gap-6 text-white">
        <SuccessfulCallsPieChart />
        <RadarChartForDashboard />
      </div>

      <AudiosTable />
    </div>
  );
}
