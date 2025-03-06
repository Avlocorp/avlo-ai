import CommunicationIcon from "assets/icons/CommunicationIcon";
import CustomerManagementIcon from "assets/icons/CustomerManagementIcon";
import Pieicon from "assets/icons/pieicon";
import ProblemHandlingIcon from "assets/icons/ProblemHandlingIcon";
import ReportIcon from "assets/icons/ReportIcon";
import { RadarChartComponent } from "modules/AnalysisPage/components/Chart/RadarChart";

import CardChart from "modules/AnalysisPage/components/cardCharts";
import { AverageScore } from "services/api/operators/operators.types";

const Analyze = ({ data }: { data: AverageScore | undefined }) => {
  if (!data) return <h2>No data</h2>;

  const pieData1 = [
    { name: "Score", value: data.overall_performance_score },
    { name: "Remaining", value: 100 - data.overall_performance_score },
  ];
  const pieData2 = [
    { name: "Score", value: data.problem_handling_score },
    { name: "Remaining", value: 100 - data.problem_handling_score },
  ];
  const pieData3 = [
    { name: "Score", value: data.communication_skills_score },
    { name: "Remaining", value: 100 - data.communication_skills_score },
  ];
  const pieData4 = [
    { name: "Score", value: data.customer_management_score },
    { name: "Remaining", value: 100 - data.customer_management_score },
  ];
  const pieData5 = [
    { name: "Score", value: data.problem_handling_score },
    { name: "Remaining", value: 100 - data.problem_handling_score },
  ];
  const dataRadar = [
    { metric: "Overall Score", series: data?.overall_performance_score },
    { metric: "Communication", series: data?.communication_skills_score },
    { metric: "Customer Management", series: data?.customer_management_score },
    { metric: "Problem Handling", series: data?.problem_handling_score },
    { metric: "Protocol Adherence", series: data?.protocol_adherence_score },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <CardChart
          data={pieData1}
          colorEmpty="#87888C"
          colorFilled="#0B72FC"
          title="Overall Score"
          Icon={Pieicon}
        />
        <CardChart
          data={pieData2}
          colorEmpty="#87888C"
          colorFilled="#E04BC5"
          title="Problem Handling"
          Icon={ProblemHandlingIcon}
        />
        <CardChart
          data={pieData3}
          colorEmpty="#87888C"
          colorFilled="#4B54D1"
          title="Communication"
          Icon={CommunicationIcon}
        />
        <CardChart
          data={pieData4}
          colorEmpty="#87888C"
          colorFilled="#8B7DDF"
          title="Customer Management"
          Icon={CustomerManagementIcon}
        />
      </div>
      <div className="max-w-[50%] mt-6 mx-auto">
        <CardChart
          data={pieData5}
          colorEmpty="#87888C"
          colorFilled="#0BA5EC"
          title="Protocol Adherence"
          Icon={ReportIcon}
        />
      </div>
      <div className="my-8">
        <RadarChartComponent
          title={"Performance Metrics"}
          dataRadar={dataRadar}
        />
      </div>
    </div>
  );
};

export default Analyze;
