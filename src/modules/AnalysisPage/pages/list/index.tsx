import AgentRivojIcon from 'assets/icons/agentRivoj';
import CommunicationIcon from 'assets/icons/CommunicationIcon';
import CustomerManagementIcon from 'assets/icons/CustomerManagementIcon';
import LightIcon from 'assets/icons/lightIcon';
import NotableTechniquesIcon from 'assets/icons/NotableTechniques';
import Pieicon from 'assets/icons/pieicon';
import PinIcon from 'assets/icons/PinIcon';
import ProblemHandlingIcon from 'assets/icons/ProblemHandlingIcon';
import ProcessImprovementIcon from 'assets/icons/ProcessImprovementsuggestion';
import ReportIcon from 'assets/icons/ReportIcon';
import ResolutionQualityIcon from 'assets/icons/ResolutionQuality';
import ResourceRecommendationIcon from 'assets/icons/ResourceOrToolRecommendations';
import SuccessfulInteractionStrategiesIcon from 'assets/icons/SuccessfulInteraction';
import TrainingIcon from 'assets/icons/TrainingIcon';
import VoiseIcon from 'assets/icons/VoiseIcon';
import Xulosaicon from 'assets/icons/Xulosaicon';
import { RadarChartComponent } from 'modules/AnalysisPage/components/Chart/RadarChart';
import CardChart from 'modules/AnalysisPage/components/cardCharts';
import CardContent from 'modules/AnalysisPage/components/cardContent';
import HeadLine from 'modules/AnalysisPage/components/headline';
import { AIResponse } from './type';


interface ChatMainProps {
    data: AIResponse;
}

export default function ChatMain({ data }: ChatMainProps) {


    const pieData1 = [
        { name: 'Score', value: data.overall_performance_score },
        { name: 'Remaining', value: 100 - data.overall_performance_score },
    ];
    const pieData2 = [
        { name: 'Score', value: data.problem_handling_score },
        { name: 'Remaining', value: 100 - data.problem_handling_score },
    ];
    const pieData3 = [
        { name: 'Score', value: data.communication_skills_score },
        { name: 'Remaining', value: 100 - data.communication_skills_score },
    ];
    const pieData4 = [
        { name: 'Score', value: data.customer_management_score },
        { name: 'Remaining', value: 100 - data.customer_management_score },
    ];
    const pieData5 = [
        { name: 'Score', value: data.problem_handling_score },
        { name: 'Remaining', value: 100 - data.problem_handling_score },
    ];


    const dataRadar = [
        { metric: "Overall Score", series1: data?.overall_performance_score },
        { metric: "Communication", series1: data?.communication_skills_score },
        { metric: "Customer Management", series1: data?.customer_management_score },
        { metric: "Problem Handling", series1: data?.problem_handling_score },
        { metric: "Protocol Adherence", series1: data?.protocol_adherence_score },
    ];

    return (
        <div className="bg-[#1A1A1D] w-full h-full flex flex-col overflow-y-auto  ">
            <div className='grid grid-cols-2 gap-4 mx-8 mt-8'>
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
            <div className="m-8">
                <RadarChartComponent title={"Performance Metrics"} dataRadar={dataRadar} />
            </div>
            <div className="mx-8 mt-4  flex gap-4">
                <HeadLine title='Resolved-Agent' />
            </div>

            <div className="mx-8 my-4  flex gap-4">
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

            <div className="mx-8 mt-4  flex gap-4">
                <HeadLine title="Caller emotion:" data={data.caller_emotion} />
                <HeadLine title="Resolution Status:" data={data.resolution_status} />
            </div>
            <div className='grid grid-cols-2 gap-4 mx-8 mt-4'>
                <CardContent title="Trening uchun misollar" content={data.examples_for_training} Icon={TrainingIcon} />
                <CardContent title="Resolution quality" content={[data.resolution_quality]} Icon={ResolutionQualityIcon} />
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
                <CardContent title="Notable techniques" content={data.notable_techniques} Icon={NotableTechniquesIcon} />
                <CardContent
                    title="Successful interaction strategies"
                    content={data.successful_interaction_strategies}
                    Icon={SuccessfulInteractionStrategiesIcon}
                />
            </div>
            <div className="mx-8 mt-8  flex gap-4">
                <HeadLine title='Summary of the text' />
            </div>

            <div className='grid grid-cols-2 gap-4 mx-8 mt-4 mb-8 '>
                <CardContent title="Suhbat mavzusi" content={[data?.conversation_title]} Icon={VoiseIcon} />
                <CardContent title="Asosiy g'oyalar" content={[data?.main_contents]} Icon={LightIcon} />
                <CardContent title="Muhim nuqtalar" content={data?.essential_points} Icon={PinIcon} />
                <CardContent title="Xulosa" content={[data?.conclusion]} Icon={Xulosaicon} />
            </div>

        </div >
    );
}

