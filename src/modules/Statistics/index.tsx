
import { useState } from "react"
import { Button, DatePicker, Select } from "antd"
import { CalendarOutlined, SettingOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons"
import { RangePickerProps } from "antd/es/date-picker"
import PerformanceCard from "./components/perfonmance-card"
import PipelineSnapshot from "./components/pipeline-snapshot"
import FunnelConversion from "./components/funnel-convertion"

import LeaderboardModal from "./components/liaderboard-modal"
import SimpleAIChat from "components/simpleAIchat"
import { Headset, Printer, UsersRound } from "lucide-react"
import { AnalyticsCard } from "./components/analitics-card"

const { RangePicker } = DatePicker

export default function Dashboard() {
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
    const [dateRange, setDateRange] = useState<[string, string]>(["Apr 16, 2025", "May 16, 2025"])
    console.log(dateRange)
    const handleDateChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
        if (dates) {
            setDateRange([dateStrings[0], dateStrings[1]])
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className=" mx-auto  ">
                {/* Header */}
                <div className="sticky top-0 z-30 px-4 pt-4 flex flex-col w-full shadow-sm bg-white md:flex-row justify-between items-start md:items-center mb-4 gap-4">

                    <h1 className="text-2xl font-bold">SDR Performance Dashboard</h1>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="flex-grow md:flex-grow-0">
                            <RangePicker
                                className="w-full h-10"
                                format="MMM D, YYYY"
                                onChange={handleDateChange}
                                suffixIcon={<CalendarOutlined />}
                            />
                            <div className="mb-4 flex flex-wrap gap-3 mt-2
                            ">
                                <Button className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7">Last 7 Days</Button>
                                <Button className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7">Last 30 Days</Button>
                                <Button className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7">This Month</Button>
                                <Button className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7">Last Month</Button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex items-center gap-1 max-h-10 bg-white border rounded px-2 py-1">
                                <TeamOutlined />
                                <Select
                                    defaultValue="All SDRs"
                                    className="min-w-[120px] h-10"
                                    options={[
                                        { value: "all", label: "All SDRs" },
                                        { value: "team1", label: "Team 1" },
                                        { value: "team2", label: "Team 2" },
                                    ]}
                                    variant="borderless"
                                />
                            </div>

                            <Button
                                type="primary"

                                className="bg-indigo-600 hover:bg-indigo-700 h-10 flex items-center"
                                onClick={() => setIsLeaderboardOpen(true)}
                            >
                                <TrophyOutlined style={{ fontSize: "20px" }} />
                                <p>


                                    Leaderboard
                                </p>
                            </Button>

                        </div>
                    </div>
                </div>

                {/* Time period filters */}


                {/* Download PDF button */}
                <div className="flex justify-end mb-6 px-4">
                    <Button
                        type="primary"
                        className="flex items-center bg-[#4338CA] h-10"
                    >
                        <Printer className="" />
                        <p>Download PDF</p>
                    </Button>
                </div>

                {/* Performance Metrics */}
                <div className="mb-8 px-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Performance Metrics</h2>
                        <Button icon={<SettingOutlined />} className="border-gray-200" />
                    </div>

                    <h3 className="text-lg font-semibold mb-3">Speed & Connection</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <PerformanceCard title="First Contact Speed" value="41h" change={11.3} isPositive={true} color="green" />
                        <PerformanceCard title="First Success Speed" value="77h" change={7.4} isPositive={false} color="red" />
                    </div>

                    <h3 className="text-lg font-semibold mb-3">Connection Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                        <PerformanceCard
                            title="First Call Connection Ratio"
                            value="60.0%"
                            change={5.0}
                            isPositive={true}
                            color="green"
                        />
                        <PerformanceCard title="No Connection Rate" value="25.0%" change={50.0} isPositive={false} color="red" />
                        <PerformanceCard title="Pickup Rate" value="6.3%" change={60.9} isPositive={false} color="red" />
                        <PerformanceCard title="Avg Attempts to Connect" value="1.6" change={0.0} isPositive={true} color="green" />
                        <PerformanceCard title="Avg Ring Count" value="7.4" change={18.4} isPositive={false} color="red" />
                    </div>

                    <h3 className="text-lg font-semibold mb-3">Communication Quality</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <PerformanceCard title="Silence Rate" value="100.0%" change={0.0} isPositive={true} color="green" />
                        <PerformanceCard title="Listening Rate" value="100.0%" change={0.0} isPositive={false} color="red" />
                        <PerformanceCard title="Avg Talk Time" value="491s" change={5.7} isPositive={true} color="green" />
                    </div>

                    <h3 className="text-lg font-semibold mb-3">Conversion & Value</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                        <PerformanceCard title="Win Rate" value="25.0%" change={150.0} isPositive={true} color="green" />
                        <PerformanceCard title="SQL Rate" value="41.7%" change={0.0} isPositive={false} color="red" />
                        <PerformanceCard title="Potential Value" value="$82,230" change={130.5} isPositive={true} color="green" />
                        <PerformanceCard title="Reach Out Rate" value="35.74" change={26.7} isPositive={false} color="red" />
                        <PerformanceCard title="CAC Per Lead" value="$3,777" change={29.3} isPositive={true} color="green" />
                    </div>
                </div>

                {/* Pipeline and Funnel */}
                <div className="grid grid-cols-1 px-4 lg:grid-cols-2 gap-6 mb-8">
                    <PipelineSnapshot />
                    <FunnelConversion />
                </div>

                <div className="grid grid-cols-1 px-4 lg:grid-cols-2 gap-6 mb-6">
                    <AnalyticsCard
                        icon={<Headset height={36} width={36} className="text-4xl text-indigo-500" />}
                        title="Analyzed Audio (in minutes)"
                        value="1,582 min"
                        description="Total audio minutes analyzed during the selected period"
                        borderColor="border-indigo-500"
                    />
                    <AnalyticsCard
                        icon={<UsersRound height={36} width={36} className="text-4xl text-indigo-500" />}
                        title="Analyzed Leads"
                        value="198"
                        description="Total number of leads analyzed during the selected period"
                        borderColor="border-indigo-500"
                    />
                </div>

                {/* Analytics */}


                <div className="mt-auto mb-4 ">
                    <SimpleAIChat context="sdr" />
                </div>
            </div>

            {/* Leaderboard Modal */}
            <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
        </div>
    )
}
