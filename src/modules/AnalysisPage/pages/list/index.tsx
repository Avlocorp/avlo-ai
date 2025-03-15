import AgentRivojIcon from "assets/icons/agentRivoj";
import CommunicationIcon from "assets/icons/CommunicationIcon";
import CustomerManagementIcon from "assets/icons/CustomerManagementIcon";
import LightIcon from "assets/icons/lightIcon";
import NotableTechniquesIcon from "assets/icons/NotableTechniques";
import Pieicon from "assets/icons/pieicon";
import PinIcon from "assets/icons/PinIcon";
import ProblemHandlingIcon from "assets/icons/ProblemHandlingIcon";
import ProcessImprovementIcon from "assets/icons/ProcessImprovementsuggestion";
import ReportIcon from "assets/icons/ReportIcon";
import ResolutionQualityIcon from "assets/icons/ResolutionQuality";
import ResourceRecommendationIcon from "assets/icons/ResourceOrToolRecommendations";
import SuccessfulInteractionStrategiesIcon from "assets/icons/SuccessfulInteraction";
import TrainingIcon from "assets/icons/TrainingIcon";
import VoiseIcon from "assets/icons/VoiseIcon";
import Xulosaicon from "assets/icons/Xulosaicon";
import { RadarChartComponent } from "modules/AnalysisPage/components/Chart/RadarChart";
import CardChart from "modules/AnalysisPage/components/cardCharts";
import CardContent from "modules/AnalysisPage/components/cardContent";
import HeadLine from "modules/AnalysisPage/components/headline";
import { ChevronRight, DownloadIcon } from "lucide-react";
import AudioFile from "assets/icons/mp3-icon.png";
import config, { ACCESS_TOKEN_KEY } from "config";
import { useState } from "react";
import { storage } from "services";
import HomeIcon from "assets/icons/HomeIcon";
import { useNavigate } from "react-router-dom";
import { TranscriptionView } from "./transcription";
import { AIResponse } from "services/api/home/home.type";

interface ChatMainProps {
  data: AIResponse;
  id?: number;
}

export default function ChatMain({ data, id }: ChatMainProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const baseUrl = config.API_ROOT;
  const access = storage.get(ACCESS_TOKEN_KEY);
  const handleDownload = () => {
    if (!id) return;

    setIsDownloading(true);

    fetch(`${baseUrl}api/company/audios/pdf/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `audio-${id}.pdf`);

        // Append to the document, click it, and clean up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Release the blob URL
        window.URL.revokeObjectURL(url);
        setIsDownloading(false);
      })
      .catch((error) => {
        console.error("Download failed:", error);
        setIsDownloading(false);
      });
  };

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
  const navigate = useNavigate();
  return (
    <div className="bg-[#1A1A1D] w-full h-full flex flex-col overflow-y-auto  ">
      <div className="mb-6 flex mt-4 px-12 items-center gap-2">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <HomeIcon isActive />
        </div>
        <ChevronRight />
        <span
          className="font-medium cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Call centre
        </span>
        <ChevronRight />
        <span
          className="font-medium cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Audios
        </span>
      </div>
      {/* <div className="mb-6 flex items-center gap-4"> */}
      {/* <h4 className="text-white text-3xl font-semibold">{data?.operator}</h4> */}
      {/* </div> */}
      <div className="mb-6 px-12 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={AudioFile || "/placeholder.svg"}
            alt="Audio file icon"
            width={40}
            height={40}
          />
          <h4 className="text-white text-3xl font-semibold">
            {data?.conversation_title}
          </h4>
        </div>

        {id && (
          <div className="flex items-center text-center">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-[#5b9bec] shadow-none border-0 text-sm h-10 flex items-center justify-center p-2 px-3 rounded-md gap-2"
            >
              <DownloadIcon
                width={24}
                height={24}
                className="[&_svg]:w-[32px] [&_svg]:h-[32px]"
              />
              {isDownloading ? "Downloading..." : "Download"}
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6 mx-12 mt-4">
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
        <CardChart
          data={pieData5}
          colorEmpty="#87888C"
          colorFilled="#0BA5EC"
          title="Protocol Adherence"
          Icon={ReportIcon}
        />
      </div>
      <div className="my-8 mx-12">
        <RadarChartComponent
          title={"Performance Metrics"}
          dataRadar={dataRadar}
        />
      </div>
      <div className="mx-12 mt-4  flex gap-6">
        <HeadLine title="Resolved-Agent" />
      </div>

      <div className="mx-12 my-6  flex gap-6">
        <CardContent
          title="Agentni Rivojlantirish Imkoniyatlari"
          content={data?.agent_development_opportunities}
          Icon={AgentRivojIcon}
        />
        <CardContent
          title="Trening uchun misollar"
          content={data?.examples_for_training}
          Icon={TrainingIcon}
        />
      </div>

      <div className="mx-12 mt-4  flex gap-6">
        <HeadLine title="Caller emotion:" data={data.caller_emotion} />
        <HeadLine title="Resolution Status:" data={data.resolution_status} />
      </div>
      <div className="grid grid-cols-2 gap-6 mx-12 mt-6">
        <CardContent
          title="Trening uchun misollar"
          content={data.examples_for_training}
          Icon={TrainingIcon}
        />
        <CardContent
          title="Resolution quality"
          content={[data.resolution_quality]}
          Icon={ResolutionQualityIcon}
        />
        <CardContent
          title="Process improvement suggestions"
          content={data.process_improvement_suggestions}
          Icon={ProcessImprovementIcon}
        />
        <CardContent
          title="Resource or tool recommendations"
          content={data.resource_or_tool_recommendations}
          Icon={ResourceRecommendationIcon}
        />
        <CardContent
          title="Notable techniques"
          content={data.notable_techniques}
          Icon={NotableTechniquesIcon}
        />
        <CardContent
          title="Successful interaction strategies"
          content={data.successful_interaction_strategies}
          Icon={SuccessfulInteractionStrategiesIcon}
        />
      </div>
      <div className="mx-12 mt-8  flex gap-6">
        <HeadLine title="Summary of the text" />
      </div>

      <div className="grid grid-cols-2 gap-6 mx-12 mt-6 mb-8 ">
        <CardContent
          title="Suhbat mavzusi"
          content={[data?.conversation_title]}
          Icon={VoiseIcon}
        />
        <CardContent
          title="Asosiy g'oyalar"
          content={[data?.main_contents]}
          Icon={LightIcon}
        />
        <CardContent
          title="Muhim nuqtalar"
          content={data?.essential_points}
          Icon={PinIcon}
        />
        <CardContent
          title="Xulosa"
          content={[data?.conclusion]}
          Icon={Xulosaicon}
        />
      </div>

      <TranscriptionView transcription={data.transcription} />
    </div>
  );
}
