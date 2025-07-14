import type React from "react"
import { useState } from "react"
import { Table, Card, Avatar, Select, Modal, ConfigProvider, theme as antdTheme } from "antd"
import { Eye, Medal } from "lucide-react"
import { motion } from "framer-motion"
import Language from "components/language"
import SimpleAIChat from "components/simpleAIchat"
import { useGetOperatorListQuery } from "services/api/settings"
import RadarChartForDashboard from "modules/Statistics/components/Charts/RadarChartForDashboard"
import { useTranslation } from "react-i18next"
import { useTheme } from "services/contexts/ThemeContext"

const stringToColor = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str?.length; i++) {
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
  const { t } = useTranslation()
  const { theme } = useTheme()
  const top3Sdrs = operatorData?.data?.slice(0, 3) || []

  // Ant Design theme configuration
  const getThemeConfig = () => {
    if (theme === "dark") {
      return {
        algorithm: antdTheme.darkAlgorithm,
        token: {
          colorPrimary: "#4338ca",
          borderRadius: 8,
          colorBgContainer: "#374151",
          colorBgElevated: "#374151",
          colorBgLayout: "#1f2937",
          colorText: "#f3f4f6",
          colorTextSecondary: "#9ca3af",
          colorBorder: "#4b5563",
          colorBorderSecondary: "#374151",
        },
      }
    }

    return {
      algorithm: antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: "#4338ca",
        borderRadius: 8,
        colorBgContainer: "#ffffff",
        colorBgElevated: "#ffffff",
        colorBgLayout: "#f9fafb",
        colorText: "#111827",
        colorTextSecondary: "#6b7280",
        colorBorder: "#d1d5db",
      },
    }
  }

  // Theme-aware styles
  const containerStyle = {
    padding: "32px",
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "calc(100vh - 64px)",
    backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
    color: theme === "dark" ? "#f3f4f6" : "#111827",
  }

  const headerStyle = {
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    display: "flex",
    alignItems: "center",
    margin: 0,
  }

  const subtitleStyle = {
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
    marginTop: "8px",
  }

  const selectContainerStyle = {
    marginBottom: "24px",
    maxWidth: "400px",
  }

  const labelStyle = {
    display: "block",
    fontSize: "16px",
    fontWeight: "500",
    color: theme === "dark" ? "#f3f4f6" : "#374151",
    marginBottom: "8px",
  }

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
                : theme === "dark"
                  ? "bg-gray-600 text-gray-200"
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
            <span
              className="font-medium"
              style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
            >
              {safeName}
            </span>
          </div>
        )
      },
    },
    {
      title: t("All calls"),
      dataIndex: "all_calls",
      key: "all_calls",
      render: (calls: number) => (
        <span style={{ color: theme === "dark" ? "#9ca3af" : "#71717a" }}>
          {calls || 0}
        </span>
      ),
    },
    {
      title: t("Overall performance score"),
      dataIndex: "avarege_score",
      key: "avarege_score",
      render: (_: any, record: any) => (
        <span style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}>
          {record.avarege_score?.overall_performance_score || "0"}
        </span>
      ),
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (_: any, record: any) => (
        <button
          className="flex space-x-2 p-2 rounded-md transition-colors duration-200"
          style={{
            backgroundColor: theme === "dark" ? "#065f46" : "#ecfdf5",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme === "dark" ? "#047857" : "#d1fae5"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme === "dark" ? "#065f46" : "#ecfdf5"
          }}
          onClick={() => {
            setSelectedOperator(record)
            setIsModalOpen(true)
          }}
        >
          <Eye
            className="w-5 h-5"
            style={{ color: theme === "dark" ? "#10b981" : "#059669" }}
          />
        </button>
      ),
    },
  ]

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>
              <Medal className="w-7 h-7 text-yellow-500 mr-3" />
              {t("Leaderboard")}
            </h1>
            <p style={subtitleStyle}>
              {t("Performance ranking of all SDRs based on overall score")}
            </p>
          </div>
          <Language />
        </div>

        <div style={selectContainerStyle}>
          <label htmlFor="sortMetric" style={labelStyle}>
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
                className={`shadow-md rounded-xl px-3 transition-all duration-200 ${index === 0
                  ? "border-2 border-yellow-500"
                  : index === 1
                    ? theme === "dark" ? "border border-gray-500" : "border border-gray-300"
                    : "border border-amber-700"
                  }`}
                style={{
                  backgroundColor: theme === "dark"
                    ? "#374151"
                    : index === 0
                      ? "#fefce8"
                      : index === 1
                        ? "#f3f4f6"
                        : "#fffbeb",
                }}
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
                      <p
                        className="text-lg font-semibold"
                        style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
                      >
                        {sdr.name}
                      </p>
                      <div className="flex items-center mt-1">
                        <span
                          className="text-sm mr-2"
                          style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
                        >
                          {t("Overall performance score")}:
                        </span>
                        <span
                          className="text-lg font-medium"
                          style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
                        >
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
            <h2
              className="text-lg font-medium"
              style={{ color: theme === "dark" ? "#f3f4f6" : "#1f2937" }}
            >
              {t("Full Ranking")}
            </h2>
          </div>
          <Table
            dataSource={operatorData?.data || []}
            columns={columns}
            rowKey="id"
            pagination={false}
            rowClassName={(_, index) => {
              if (index <= 2) return "top-performer"
              return ""
            }}
          />
        </Card>

        <div className="mt-auto mb-4">
          <SimpleAIChat context="sdr" />
        </div>

        <Modal
          title={
            <span style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}>
              {t("Operator Details")}
            </span>
          }
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedOperator(null)
          }}
          footer={null}
          width={800}
        >
          <div style={{ padding: "16px" }}>
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
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
                    >
                      {selectedOperator.name}
                    </h3>
                    <p style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}>
                      {t("Email")}: {selectedOperator?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <motion.div
                  className="overflow-hidden rounded-lg border"
                  style={{
                    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                    borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <table className="min-w-full text-left text-base">
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}` }}>
                        <th
                          className="px-4 py-3 font-medium"
                          style={{
                            backgroundColor: theme === "dark" ? "#374151" : "#f9fafb",
                            color: theme === "dark" ? "#f3f4f6" : "#374151",
                          }}
                        >
                          {t("Successfully Calls")}
                        </th>
                        <td
                          className="px-4 py-3"
                          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
                        >
                          {selectedOperator?.avarege_score?.successfully_calls || 0}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}` }}>
                        <th
                          className="px-4 py-3 font-medium"
                          style={{
                            backgroundColor: theme === "dark" ? "#374151" : "#f9fafb",
                            color: theme === "dark" ? "#f3f4f6" : "#374151",
                          }}
                        >
                          {t("Unsuccessfully Calls")}
                        </th>
                        <td
                          className="px-4 py-3"
                          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
                        >
                          {selectedOperator?.avarege_score?.unsuccessfully_calls || 0}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}` }}>
                        <th
                          className="px-4 py-3 font-medium"
                          style={{
                            backgroundColor: theme === "dark" ? "#374151" : "#f9fafb",
                            color: theme === "dark" ? "#f3f4f6" : "#374151",
                          }}
                        >
                          {t("All Calls")}
                        </th>
                        <td
                          className="px-4 py-3"
                          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
                        >
                          {selectedOperator?.all_calls || 0}
                        </td>
                      </tr>
                      <tr>
                        <th
                          className="px-4 py-3 font-medium"
                          style={{
                            backgroundColor: theme === "dark" ? "#374151" : "#f9fafb",
                            color: theme === "dark" ? "#f3f4f6" : "#374151",
                          }}
                        >
                          {t("Performance Score")}
                        </th>
                        <td
                          className="px-4 py-3"
                          style={{ color: theme === "dark" ? "#d1d5db" : "#6b7280" }}
                        >
                          {selectedOperator?.avarege_score?.overall_performance_score || 0}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>

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
    </ConfigProvider>
  )
}

export default LeaderboardPage