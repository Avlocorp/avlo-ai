import { DatePicker } from 'antd';
import CalendarIcon from 'assets/icons/calendar';
import { RadarChartComponent } from 'modules/AnalysisPage/components/Chart/RadarChart';
import "./styles.css";
export default function RadarChartForDashboard() {
    const dataRadar = [
        { metric: "Overall Score", series: 77 },
        { metric: "Communication", series: 80 },
        { metric: "Customer Management", series: 70 },
        { metric: "Problem Handling", series: 90 },
        { metric: "Protocol Adherence", series: 85 },
    ];
    return (
        <div className=" w-full bg-[#2A2A2D] p-4 rounded-lg text-gray-100">
            <div className="flex justify-between items-center">
                <p className="text-2xl">
                    Performance metrics
                </p>
                <DatePicker
                    placeholder="All time"
                    className="bg-[#48484e] text-white custom-datepicker hover:bg-[#48484e]"
                    variant='outlined'
                    onChange={() => { }}
                    suffixIcon={<CalendarIcon />}
                />                </div>
            <RadarChartComponent
                dataRadar={dataRadar}
            />
        </div>
    )
}
