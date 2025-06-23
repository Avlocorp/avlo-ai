import type React from "react"
import { useState } from "react"
import { Table, Card, Avatar, Select, Modal } from "antd"
import { Eye, Medal } from "lucide-react"
import { motion } from "framer-motion"
import Language from "components/language"
import SimpleAIChat from "components/simpleAIchat"
import { useGetOperatorListQuery } from "services/api/settings"
import RadarChartForDashboard from "modules/Statistics/components/Charts/RadarChartForDashboard"

const t = (text: string) => text

const stringToColor = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = 230
  const saturation = 25 + (Math.abs(hash) % 70)
  const lightness = 45 + (Math.abs(hash) % 30)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const sortMetricOptions = [
  { value: "first_success_speed", label: "First Success Speed" },
  { value: "first_call_connection_ratio", label: "First Call Connection Ratio" },
  { value: "no_connection_rate", label: "No Connection Rate" },
  { value: "pickup_rate", label: "Pickup Rate" },
  { value: "avg_attempts_to_connect", label: "Avg Attempts to Connect" },
  { value: "avg_ring_count", label: "Avg Ring Count" },
  { value: "silence_rate", label: "Silence Rate" },
  { value: "listening_rate", label: "Listening Rate" },
  { value: "avg_talk_time", label: "Avg Talk Time" },
  { value: "sales_score", label: "Sales Score" },
]



const LeaderboardPage: React.FC = () => {
  const { data: operatorData } = useGetOperatorListQuery({ per_page: 500, search: "" })
  const [selectedOperator, setSelectedOperator] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const top3Sdrs = operatorData?.data?.slice(0, 3) || []

  const columns = [
    {
      title: t("No."),
      key: "index",
      render: (_: any, __: any, index: number) => (
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${index === 0
            ? "bg-yellow-500 text-white"
            : index === 1
              ? "bg-gray-300 text-gray-800"
              : index === 2
                ? "bg-amber-700 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
        >
          {index + 1}
        </div>
      ),
    },

    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => {
        const safeName = record?.name || "N"
        return (
          <div className="flex items-center">
            {record?.photo ? (
              <Avatar src={record.photo} className="mr-3" />
            ) : (
              <Avatar className="mr-3" style={{ backgroundColor: stringToColor(safeName) }}>
                {safeName.substring(0, 2).toUpperCase()}
              </Avatar>
            )}
            <span className="font-medium">{safeName}</span>
          </div>
        )
      },
    },

    {
      title: t("All calls"),
      dataIndex: "all_calls",
      key: "all_calls",
      render: (calls: number) => <span className="text-zinc-500">{calls || 0}</span>,
    },
    {
      title: t("Overall performance score"),
      dataIndex: "avarege_score",
      key: "avarege_score",
      render: (_: any, record: any) => <span>{record.avarege_score?.overall_performance_score || "0"}</span>,
    },

    {
      title: t("Actions"),
      key: "actions",
      render: (_: any, record: any) => (
        <button
          className="flex space-x-2"
          onClick={() => {
            setSelectedOperator(record)
            setIsModalOpen(true)
          }}
        >
          <Eye className="w-5 h-5 text-blue-500" />
        </button>
      ),
    },
  ]
  console.log("Selected operator", selectedOperator?.avarege_score.successfully_calls)


  return (
    <div className="p-6 flex flex-col min-h-[calc(100vh-64px)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Medal className="w-7 h-7 text-yellow-500 mr-3" />
            {t("Leaderboard")}
          </h1>
          <p className="text-gray-600 mt-2">{t("Performance ranking of all SDRs based on overall score")}</p>
        </div>
        <Language />
      </div>

      <div className="mb-6 max-w-md">
        <label htmlFor="sortMetric" className="block text-base font-medium text-gray-700 mb-2">
          {t("Sort by Metric")}
        </label>
        <Select
          id="sortMetric"
          placeholder={t("Sort by Metric")}
          className="w-full"
          size="large"
          options={sortMetricOptions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {top3Sdrs.map((sdr, index) => (
          <motion.div key={sdr.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className={`shadow-md rounded-xl px-3 ${index === 0
                ? "border-2 border-yellow-500 bg-yellow-50"
                : index === 1
                  ? "border border-gray-300 bg-[#F3F4F6]"
                  : "border border-amber-700 bg-[#FFFBEB]"
                }`}
            >
              <div className="flex items-center h-[95px]">
                <div
                  className={`w-10 h-10 text-white rounded-full flex items-center justify-center mr-4 text-xl font-bold ${index === 0
                    ? "bg-[#F59E0B]"
                    : index === 1
                      ? "bg-[#D1D5DB] text-black"
                      : "bg-amber-700"
                    }`}
                >
                  {index + 1}
                </div>

                <div className="flex items-center flex-1 min-w-0">
                  {sdr.photo ? (
                    <Avatar src={sdr.photo} alt={sdr.name} size={48} className="mr-3" />
                  ) : (
                    <Avatar size={48} className="mr-3" style={{ backgroundColor: stringToColor(sdr.name) }}>
                      {(sdr.name || "N").substring(0, 2).toUpperCase()}
                    </Avatar>
                  )}
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{sdr.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 mr-2">{t("Overall performance score")}:</span>
                      <span className="text-lg font-medium text-gray-900">
                        {sdr.avarege_score?.overall_performance_score || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="shadow-md mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-800">{t("Full Ranking")}</h2>
        </div>
        <Table
          dataSource={operatorData?.data || []}
          columns={columns}
          rowKey="id"
          pagination={false}
          rowClassName={(_, index) => {
            if (index === 0) return "bg-yellow-50"
            if (index === 1) return "bg-yellow-50"
            if (index === 2) return "bg-yellow-50"
            return ""
          }}
        />


      </Card>

      <div className="mt-auto mb-4">
        <SimpleAIChat context="sdr" />
      </div>

      <Modal
        title={t("Operator Details")}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          setSelectedOperator(null)
        }}
        footer={null}
        width={800}
      >
        <div className="p-4">
          {selectedOperator && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                {selectedOperator.photo ? (
                  <Avatar src={selectedOperator.photo} size={64} />
                ) : (
                  <Avatar size={64} style={{ backgroundColor: stringToColor(selectedOperator?.name || "N") }}>
                    {(selectedOperator.name || "N").substring(0, 2).toUpperCase()}
                  </Avatar>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{selectedOperator.name}</h3>
                  <p className="text-gray-600">
                    {t("Email")}: {selectedOperator?.email || 0}
                  </p>

                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">


                <table className="min-w-full text-left text-base text-gray-600 border  rounded-lg overflow-hidden">
                  <tbody className="border">
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 border-r font-semibold bg-gray-50">{t("Successfully Calls")}</th>
                      <td className="px-4 py-2 font-base">{selectedOperator?.avarege_score?.successfully_calls || 0}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 border-r  font-semibold bg-gray-50">{t("Unsuccessfully Calls")}</th>
                      <td className="px-4 py-2 font-base">{selectedOperator?.avarege_score?.unsuccessfully_calls || 0}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 border-r  font-semibold bg-gray-50">{t("All Calls")}</th>
                      <td className="px-4 py-2 font-base">{selectedOperator?.all_calls || 0}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 border-r  font-semibold bg-gray-50">{t("Performance Score")}</th>
                      <td className="px-4 py-2 font-base">{selectedOperator?.avarege_score?.overall_performance_score || 0}</td>
                    </tr>

                  </tbody>
                </table>

              </div>
              <div className="mt-6">
                <RadarChartForDashboard
                  communication_skills_score={selectedOperator.avarege_score?.communication_skills_score || 0}
                  customer_management_score={selectedOperator.avarege_score?.customer_management_score || 0}
                  overall_performance_score={selectedOperator.avarege_score?.overall_performance_score || 0}
                  problem_handling_score={selectedOperator.avarege_score?.problem_handling_score || 0}
                  protocol_adherence_score={selectedOperator.avarege_score?.protocol_adherence_score || 0}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default LeaderboardPage
