
import type React from "react"
import { useState } from "react"
import { Select, Table, Card, Avatar, Badge } from "antd"
import { Medal } from "lucide-react"
import { motion } from "framer-motion"
import SimpleAIChat from "components/simpleAIchat"

// Mock data and utilities
const metrics = [
  {
    id: "win_rate",
    name: "Win Rate",
    higherIsBetter: true,
    formatter: (value: number) => `${(value * 100).toFixed(1)}%`,
  },
  {
    id: "conversion_rate",
    name: "Conversion Rate",
    higherIsBetter: true,
    formatter: (value: number) => `${(value * 100).toFixed(1)}%`,
  },
  {
    id: "avg_deal_size",
    name: "Avg Deal Size",
    higherIsBetter: true,
    formatter: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    id: "response_time",
    name: "Response Time",
    higherIsBetter: false,
    formatter: (value: number) => `${value.toFixed(1)} hrs`,
  },
]

const mockSdrs = [
  { id: "1", name: "John Smith", photo: null, initials: "JS" },
  { id: "2", name: "Sarah Johnson", photo: null, initials: "SJ" },
  { id: "3", name: "Michael Brown", photo: null, initials: "MB" },
  { id: "4", name: "Emily Davis", photo: null, initials: "ED" },
  { id: "5", name: "David Wilson", photo: null, initials: "DW" },
  { id: "6", name: "Jessica Martinez", photo: null, initials: "JM" },
  { id: "7", name: "Robert Taylor", photo: null, initials: "RT" },
  { id: "8", name: "Jennifer Anderson", photo: null, initials: "JA" },
]

const mockMetricValues = [
  { sdrId: "1", metricId: "win_rate", value: 0.78 },
  { sdrId: "2", metricId: "win_rate", value: 0.82 },
  { sdrId: "3", metricId: "win_rate", value: 0.65 },
  { sdrId: "4", metricId: "win_rate", value: 0.71 },
  { sdrId: "5", metricId: "win_rate", value: 0.59 },
  { sdrId: "6", metricId: "win_rate", value: 0.68 },
  { sdrId: "7", metricId: "win_rate", value: 0.55 },
  { sdrId: "8", metricId: "win_rate", value: 0.63 },
  { sdrId: "1", metricId: "conversion_rate", value: 0.45 },
  { sdrId: "2", metricId: "conversion_rate", value: 0.52 },
  { sdrId: "3", metricId: "conversion_rate", value: 0.38 },
  { sdrId: "4", metricId: "conversion_rate", value: 0.41 },
  { sdrId: "5", metricId: "conversion_rate", value: 0.33 },
  { sdrId: "6", metricId: "conversion_rate", value: 0.39 },
  { sdrId: "7", metricId: "conversion_rate", value: 0.31 },
  { sdrId: "8", metricId: "conversion_rate", value: 0.36 },
  { sdrId: "1", metricId: "avg_deal_size", value: 12500 },
  { sdrId: "2", metricId: "avg_deal_size", value: 15000 },
  { sdrId: "3", metricId: "avg_deal_size", value: 9800 },
  { sdrId: "4", metricId: "avg_deal_size", value: 11200 },
  { sdrId: "5", metricId: "avg_deal_size", value: 8500 },
  { sdrId: "6", metricId: "avg_deal_size", value: 10300 },
  { sdrId: "7", metricId: "avg_deal_size", value: 7900 },
  { sdrId: "8", metricId: "avg_deal_size", value: 9100 },
  { sdrId: "1", metricId: "response_time", value: 3.2 },
  { sdrId: "2", metricId: "response_time", value: 2.8 },
  { sdrId: "3", metricId: "response_time", value: 4.5 },
  { sdrId: "4", metricId: "response_time", value: 3.7 },
  { sdrId: "5", metricId: "response_time", value: 5.1 },
  { sdrId: "6", metricId: "response_time", value: 3.9 },
  { sdrId: "7", metricId: "response_time", value: 5.8 },
  { sdrId: "8", metricId: "response_time", value: 4.2 },
]

// Function to generate color based on name (for consistent avatar colors)
const stringToColor = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Use primary color variants
  const hue = 230 // Approximate hue for primary blue
  const saturation = 25 + (Math.abs(hash) % 70) // 25-95%
  const lightness = 45 + (Math.abs(hash) % 30) // 45-75%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

// Mock translation function
const t = (text: string) => text

// Leaderboard Drawer Component




// Main Leaderboard Page Component
const LeaderboardPage: React.FC = () => {
  const [sortMetric, setSortMetric] = useState("win_rate")

  const getSortedSdrs = () => {
    return mockSdrs
      .map((sdr) => {
        const metricValue = mockMetricValues.find((m) => m.metricId === sortMetric && m.sdrId === sdr.id)

        return {
          id: sdr.id,
          name: sdr.name,
          photo: sdr.photo,
          initials:
            sdr.initials ||
            sdr.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .toUpperCase(),
          value: metricValue?.value || 0,
        }
      })
      .sort((a, b) => {
        const metric = metrics.find((m) => m.id === sortMetric)
        // If higher is better, sort descending, otherwise sort ascending
        return metric?.higherIsBetter ? b.value - a.value : a.value - b.value
      })
      .map((sdr, index) => ({
        ...sdr,
        rank: index + 1,
      }))
  }

  const sortedSdrs = getSortedSdrs()
  const currentMetric = metrics.find((m) => m.id === sortMetric)

  const getStatusTag = (rank: number) => {
    if (rank === 1) return { text: t("Top Performer"), color: "gold" }
    if (rank <= 3) return { text: t("High Performer"), color: "green" }
    if (rank <= 6) return { text: t("Average Performer"), color: "blue" }
    return { text: t("Needs Improvement"), color: "default" }
  }

  const columns = [
    {
      title: t("Rank"),
      dataIndex: "rank",
      key: "rank",
      render: (rank: number) => (
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                      ${rank === 1
              ? "bg-yellow-500 text-white"
              : rank === 2
                ? "bg-gray-300 text-gray-800"
                : rank === 3
                  ? "bg-amber-700 text-white"
                  : "bg-gray-200 text-gray-600"
            }`}
        >
          {rank}
        </div>
      ),
    },
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => (
        <div className="flex items-center">
          {record.photo ? (
            <Avatar src={record.photo} alt={record.name} className="mr-3" />
          ) : (
            <Avatar className="mr-3" style={{ backgroundColor: stringToColor(record.name) }}>
              {record.initials}
            </Avatar>
          )}
          <span className="font-medium">{record.name}</span>
        </div>
      ),
    },
    {
      title: t(currentMetric?.name || ""),
      dataIndex: "value",
      key: "value",
      render: (value: number) => currentMetric?.formatter(value),
    },
    {
      title: t("Status"),
      key: "status",
      render: (_: any, record: any) => {
        const status = getStatusTag(record.rank)
        return <Badge status={status.color as any} text={status.text} />
      },
    },
  ]

  return (
    <div className="p-6 flex flex-col min-h-[calc(100vh-64px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
          <Medal className="w-7 h-7 text-yellow-500 mr-3" />
          {t("Leaderboard")}
        </h1>
        <p className="text-gray-600 mt-2">{t("Performance ranking of all SDRs based on key metrics")}</p>
      </div>

      <div className="mb-6 max-w-md">
        <label htmlFor="sortMetric" className="block text-sm font-medium text-gray-700 mb-2">
          {t("Sort by Metric")}
        </label>
        <Select
          id="sortMetric"
          value={sortMetric}
          onChange={(value) => setSortMetric(value)}
          className="w-full"
          size="large"
          options={metrics.map((metric) => ({
            value: metric.id,
            label: t(metric.name),
          }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {sortedSdrs.slice(0, 3).map((sdr) => (
          <motion.div key={sdr.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card
              className={`shadow-md ${sdr.rank === 1
                ? "border-2 border-yellow-500"
                : sdr.rank === 2
                  ? "border border-gray-300"
                  : "border border-amber-700"
                }`}
              bodyStyle={{ padding: "1.5rem" }}
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl font-bold
                              ${sdr.rank === 1
                      ? "bg-yellow-500 text-white"
                      : sdr.rank === 2
                        ? "bg-gray-300 text-gray-800"
                        : "bg-amber-700 text-white"
                    }`}
                >
                  {sdr.rank}
                </div>

                <div className="flex items-center flex-1 min-w-0">
                  {sdr.photo ? (
                    <Avatar src={sdr.photo} alt={sdr.name} size={56} className="mr-3" />
                  ) : (
                    <Avatar size={56} className="mr-3" style={{ backgroundColor: stringToColor(sdr.name) }}>
                      {sdr.initials}
                    </Avatar>
                  )}

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{sdr.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 mr-2">{t(currentMetric?.name || "")}:</span>
                      <span className="text-lg font-medium text-gray-900">{currentMetric?.formatter(sdr.value)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="shadow-md mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-800">{t("Full Ranking")}</h2>
        </div>

        <Table
          dataSource={sortedSdrs}
          columns={columns}
          rowKey="id"
          pagination={false}
          rowClassName={(record) => (record.rank <= 3 ? "bg-yellow-50" : "")}
        />
      </Card>



      <div className="mt-auto mb-4 ">
        <SimpleAIChat context="sdr" />
      </div>
    </div>
  )
}

export default LeaderboardPage
