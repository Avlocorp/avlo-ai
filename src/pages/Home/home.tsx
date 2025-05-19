import { Button, Card, ConfigProvider, DatePicker } from "antd"
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    SettingOutlined,
} from "@ant-design/icons"
import { Headset, Printer, UsersRound } from "lucide-react"
import SimpleAIChat from "components/simpleAIchat"
import { AnalyticsCard } from "modules/Statistics/components/analitics-card"

const { RangePicker } = DatePicker

export default function BusinessDashboard() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#4338ca",
                    borderRadius: 8,
                },
            }}
        >
            <main className="container mx-auto p-4 flex flex-col min-h-[calc(100vh-64px)]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Business Overview</h1>
                    <div className="flex gap-3 items-center">
                        <Button
                            type="primary"
                            className="flex items-center bg-[#4338CA] h-10"
                        >
                            <Printer className="" />
                            <p>Download PDF</p>
                        </Button>
                        <Button
                            icon={<SettingOutlined />}
                            className="flex items-center"
                            shape="circle"
                        />
                    </div>
                </div>

                {/* Date Range Picker */}
                <div className="mb-2">
                    <RangePicker
                        format="MMM D, YYYY"
                        className="w-full md:w-80 border rounded-md mb-2"
                        placeholder={["Start Date", "End Date"]}
                    />
                </div>

                {/* Filter Tabs */}
                <div className="mb-6 flex flex-wrap gap-3">
                    <Button className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7">Last 7 Days</Button>
                    <Button className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7">Last 30 Days</Button>
                    <Button className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7">This Month</Button>
                    <Button className="bg-gray-100 hover:bg-gray-200 border-gray-200 cursor-pointer h-7">Last Month</Button>
                </div>

                {/* Stat Cards Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Month-over-Month Growth" value="23.5%" change={15.0} isPositive={true} changeText="increase" />
                    <StatCard title="Quarter-over-Quarter Growth" value="45.2%" change={28.0} isPositive={true} changeText="increase" />
                    <StatCard title="Funnel Potential" value="$1,208.333" change={12.0} isPositive={true} changeText="increase" />
                    <StatCard title="Lead to Sale" value="32.8%" change={5.0} isPositive={false} changeText="decrease" />
                </div>

                {/* Stat Cards Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Average Deal Size" value="$45,000" change={8.0} isPositive={true} changeText="increase" />
                    <StatCard title="Average Sales Cycle" value="35" change={10.0} isPositive={false} changeText="decrease" />
                    <StatCard title="New Customers" value="23.2" change={20.0} isPositive={true} changeText="increase" />
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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

                <div className="mt-auto mb-4">
                    <SimpleAIChat context="sdr" />
                </div>
            </main>
        </ConfigProvider>
    )
}

interface StatCardProps {
    title: string
    value: string
    change: number
    isPositive: boolean
    changeText: string
}

function StatCard({ title, value, change, isPositive, changeText }: StatCardProps) {
    return (
        <div className="flex rounded-xl shadow-sm overflow-hidden max-h-[140px]">
            <div className={`w-1 ${isPositive ? "bg-green-500" : "bg-red-500"}`} />
            <div className="w-full bg-white">
                <Card className="shadow-sm hover:shadow-md transition-shadow rounded-lg border border-gray-100">
                    <div className="mb-1 text-gray-600 text-sm">{title}</div>
                    <div className="text-3xl font-bold mb-2">{value}</div>
                    <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        <span className="ml-1">{change.toFixed(1)}% {changeText}</span>
                    </div>
                </Card>
            </div>
        </div>
    )
}

