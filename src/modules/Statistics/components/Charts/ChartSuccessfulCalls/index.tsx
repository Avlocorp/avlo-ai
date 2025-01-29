import { DatePicker } from "antd";
import CalendarIcon from "assets/icons/calendar";
import Dot from "assets/icons/Dot";
import { Cell, Pie, PieChart } from "recharts";

export default function SuccessfulCallsPieChart() {
    const data1 = [
        { name: 'Segment 1', value: 400 },
    ];

    const data2 = [
        { name: 'Segment 3', value: 200 },
    ];

    return (
        <div className="w-full bg-[#2A2A2D] p-4 rounded-lg flex flex-col justify-between">
            <div className="flex justify-between items-center">
                <p className="text-2xl text-white">
                    Successful calls
                </p>
                <DatePicker
                    placeholder="All time"
                    className="bg-[#48484e] text-white custom-datepicker hover:bg-[#48484e]"
                    variant="outlined"
                    onChange={() => { }}
                    suffixIcon={<CalendarIcon />}
                />
            </div>
            <div className="flex justify-center items-center">
                <PieChart
                    width={210}
                    height={220}>
                    <Pie
                        data={data1} // First set of data
                        cx="50%"
                        cy="50%"
                        startAngle={-89}
                        endAngle={89}
                        innerRadius={50}
                        outerRadius={105}
                        paddingAngle={0}
                        dataKey="value"
                    >
                        <Cell fill="#34C759" stroke="none" />
                    </Pie>
                    <Pie
                        data={data2} // Second set of data
                        cx="50%"
                        cy="50%"
                        startAngle={91}
                        endAngle={269}
                        innerRadius={50}
                        outerRadius={105}
                        paddingAngle={0}
                        dataKey="value"
                    >
                        <Cell fill="#FFA900" stroke="none" />
                    </Pie>
                </PieChart>
            </div>
            <div className="flex  justify-between">
                <div className="flex flex-col gap-6 justify-between items-start ">
                    <button className="flex items-center gap-2 py-[2px] px-2 bg-[rgba(52,199,89,0.1)] rounded-lg">
                        <Dot fill="#34C759" />
                        <p className="text-[#34C759] text-[12px]">Successful</p>
                    </button>
                    <button className="flex items-center gap-2 py-[2px] px-2 bg-[rgba(255,149,0,0.1)] rounded-lg">
                        <Dot fill="#FF9500" />
                        <p className="text-[#FF9500] text-[12px]">Failed</p>
                    </button>
                </div>
                <div className="flex flex-col gap-6 justify-between items-start ">

                    <p className="text-[14px]">10000</p>
                    <p className="text-[14px]">10000</p>
                </div>
                <div className="flex flex-col gap-6 justify-between items-start ">
                    <p className="text-[14px]">50%</p>

                    <p className="text-[14px]">50%</p>
                </div>
            </div>
        </div>
    )
}
