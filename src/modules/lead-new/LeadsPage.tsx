
import type { ColumnsType } from "antd/es/table"
import { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query/react"
import { useGetLeadsListQuery, useGetSingleStatusQuery } from "services/api/leads/leads.api"
import { motion } from "framer-motion"
import { ConfigProvider, theme as antdTheme } from "antd"

import type { Lead } from "services/api/leads/leads.types"
import Language from "components/language"
import { useGetSingleOperatorQuery } from "services/api/operators/operators.api"
import Table from "antd/es/table"
import { Eye } from "lucide-react"
import { Modal } from "antd"
import { useTheme } from "services/contexts/ThemeContext"

const LeadsPage = () => {
  const perPage = 50
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = Number(searchParams.get("page")) || 1
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [selectedLeads, setSelectedLeads] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { theme } = useTheme()
  const { t } = useTranslation()

  // Update current page when URL changes
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page")) || 1
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl)
    }
  }, [searchParams])

  const {
    data: leadsResponse,
    isLoading,
    isFetching,
    error,
  } = useGetLeadsListQuery({
    page: currentPage,
    limit: perPage,
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", String(page))
    setSearchParams(newParams)
  }

  // Extract data from the API response
  const leads = leadsResponse?.result || []
  const totalCount = leadsResponse?.total || 0

  // Get all unique responsible user IDs
  const uniqueResponsibleUserIds = useMemo(() => {
    const userIds = leads
      .map((lead) => lead.responsible_user_id)
      .filter((id): id is number => id !== undefined && id !== null)

    return [...new Set(userIds)]
  }, [leads])

  // Operator queries
  const operator1 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[0] ? { operatorId: uniqueResponsibleUserIds[0] } : skipToken,
  )
  const operator2 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[1] ? { operatorId: uniqueResponsibleUserIds[1] } : skipToken,
  )
  const operator3 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[2] ? { operatorId: uniqueResponsibleUserIds[2] } : skipToken,
  )
  const operator4 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[3] ? { operatorId: uniqueResponsibleUserIds[3] } : skipToken,
  )
  const operator5 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[4] ? { operatorId: uniqueResponsibleUserIds[4] } : skipToken,
  )
  const operator6 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[5] ? { operatorId: uniqueResponsibleUserIds[5] } : skipToken,
  )
  const operator7 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[6] ? { operatorId: uniqueResponsibleUserIds[6] } : skipToken,
  )
  const operator8 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[7] ? { operatorId: uniqueResponsibleUserIds[7] } : skipToken,
  )
  const operator9 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[8] ? { operatorId: uniqueResponsibleUserIds[8] } : skipToken,
  )
  const operator10 = useGetSingleOperatorQuery(
    uniqueResponsibleUserIds[9] ? { operatorId: uniqueResponsibleUserIds[9] } : skipToken,
  )

  // Create a map of user ID to operator data
  const operatorMap = useMemo(() => {
    const map = new Map()
    const operators = [
      operator1, operator2, operator3, operator4, operator5,
      operator6, operator7, operator8, operator9, operator10,
    ]

    operators.forEach((operatorQuery, index) => {
      const userId = uniqueResponsibleUserIds[index]
      if (userId && operatorQuery.data?.data?.[0]) {
        map.set(userId, operatorQuery.data.data[0])
      }
    })

    return map
  }, [
    uniqueResponsibleUserIds,
    operator1, operator2, operator3, operator4, operator5,
    operator6, operator7, operator8, operator9, operator10,
  ])

  const uniqueStatusIds = useMemo(() => {
    const statusIds = leads
      .map((lead) => lead.status_id)
      .filter((id): id is number => id !== undefined && id !== null)

    return [...new Set(statusIds)]
  }, [leads])

  // Status queries
  const status1 = useGetSingleStatusQuery(uniqueStatusIds[0] ? { statusId: uniqueStatusIds[0] } : skipToken)
  const status2 = useGetSingleStatusQuery(uniqueStatusIds[1] ? { statusId: uniqueStatusIds[1] } : skipToken)
  const status3 = useGetSingleStatusQuery(uniqueStatusIds[2] ? { statusId: uniqueStatusIds[2] } : skipToken)
  const status4 = useGetSingleStatusQuery(uniqueStatusIds[3] ? { statusId: uniqueStatusIds[3] } : skipToken)
  const status5 = useGetSingleStatusQuery(uniqueStatusIds[4] ? { statusId: uniqueStatusIds[4] } : skipToken)
  const status6 = useGetSingleStatusQuery(uniqueStatusIds[5] ? { statusId: uniqueStatusIds[5] } : skipToken)
  const status7 = useGetSingleStatusQuery(uniqueStatusIds[6] ? { statusId: uniqueStatusIds[6] } : skipToken)
  const status8 = useGetSingleStatusQuery(uniqueStatusIds[7] ? { statusId: uniqueStatusIds[7] } : skipToken)
  const status9 = useGetSingleStatusQuery(uniqueStatusIds[8] ? { statusId: uniqueStatusIds[8] } : skipToken)
  const status10 = useGetSingleStatusQuery(uniqueStatusIds[9] ? { statusId: uniqueStatusIds[9] } : skipToken)

  // Create status map
  const statusMap = useMemo(() => {
    const map = new Map()
    const statuses = [
      status1, status2, status3, status4, status5,
      status6, status7, status8, status9, status10
    ]

    statuses.forEach((statusQuery, index) => {
      const id = uniqueStatusIds[index]
      if (id && statusQuery.data?.data?.[0]) {
        map.set(id, statusQuery.data.data[0])
      }
    })

    return map
  }, [
    uniqueStatusIds,
    status1, status2, status3, status4, status5,
    status6, status7, status8, status9, status10
  ])

  // Theme configuration for Ant Design
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
          colorBorderSecondary: "#6b7280",
          colorFillSecondary: "#4b5563",
          colorFillTertiary: "#374151",
          colorFillQuaternary: "#374151",
          controlItemBgActive: "#4338ca",
          controlItemBgHover: "#4b5563",
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
        colorBorderSecondary: "#e5e7eb",
        colorFillSecondary: "#f3f4f6",
        colorFillTertiary: "#f9fafb",
        colorFillQuaternary: "#ffffff",
        controlItemBgActive: "#e0e7ff",
        controlItemBgHover: "#f3f4f6",
      },
    }
  }

  // Theme-aware styles
  const containerStyle = {
    padding: "32px",
    backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
    minHeight: "100vh",
    color: theme === "dark" ? "#f3f4f6" : "#111827",
  }

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  }

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "600",
    color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    margin: 0,
  }

  const tableContainerStyle = {
    border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
    boxShadow: theme === "dark"
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  }

  const actionButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: theme === "dark" ? "#065f46" : "#ecfdf5",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  }

  const modalTableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
    border: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
    borderRadius: "8px",
    overflow: "hidden",
  }

  const modalThStyle = {
    padding: "12px 16px",
    width: "40%",
    fontWeight: "600",
    textAlign: "left" as const,
    borderBottom: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
    borderRight: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
    backgroundColor: theme === "dark" ? "#4b5563" : "#f9fafb",
    color: theme === "dark" ? "#f3f4f6" : "#374151",
  }

  const modalTdStyle = {
    padding: "12px 16px",
    borderBottom: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
    color: theme === "dark" ? "#d1d5db" : "#6b7280",
    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
  }

  const columns: ColumnsType<Lead> = [
    {
      title: "No",
      dataIndex: "id",
      render: (_, __, index) => (currentPage - 1) * perPage + index + 1,
      width: 60,
    },
    {
      title: t("Title"),
      dataIndex: "name",
      render: (value) => (
        <div
          style={{
            maxWidth: "180px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: theme === "dark" ? "#f3f4f6" : "#111827"
          }}
          title={value || t("No title")}
        >
          {value || t("No title")}
        </div>
      ),
    },
    {
      title: t("Created at"),
      dataIndex: "created_at",
      render: (value) => {
        if (!value) return ""

        try {
          const date = new Date(typeof value === "number" ? value * 1000 : value)
          const dateStr = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          const timeStr = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })

          return (
            <div
              style={{
                maxWidth: "130px",
                color: theme === "dark" ? "#d1d5db" : "#6b7280"
              }}
              title={`${dateStr} ${timeStr}`}
            >
              {dateStr.replace(/\//g, ".")} <br /> {timeStr}
            </div>
          )
        } catch (error) {
          return (
            <div
              style={{
                maxWidth: "130px",
                color: theme === "dark" ? "#ef4444" : "#dc2626"
              }}
            >
              Invalid date
            </div>
          )
        }
      },
    },
    {
      title: t("Assigned to"),
      dataIndex: "responsible_user_id",
      render: (responsible_user_id) => {
        if (!responsible_user_id) {
          return (
            <div
              style={{
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: theme === "dark" ? "#9ca3af" : "#6b7280"
              }}
            >
              {t("Not assigned")}
            </div>
          )
        }

        const operatorData = operatorMap.get(responsible_user_id)

        if (!operatorData) {
          return (
            <div
              style={{
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: theme === "dark" ? "#9ca3af" : "#6b7280"
              }}
            >
              {t("Loading...")}
            </div>
          )
        }

        const operatorName = operatorData?.name || t("Unknown operator")

        return (
          <div
            title={operatorName}
            style={{
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: theme === "dark" ? "#f3f4f6" : "#111827"
            }}
          >
            {operatorName}
          </div>
        )
      },
    },
    {
      title: t("Status"),
      dataIndex: "status_id",
      render: (status_id) => {
        if (!status_id) {
          return (
            <div
              style={{
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: theme === "dark" ? "#9ca3af" : "#6b7280"
              }}
            >
              {t("Unknown status")}
            </div>
          )
        }

        const statusData = statusMap.get(status_id)
        const statusName = statusData?.name || t("Unknown status")

        return (
          <div
            style={{
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: theme === "dark" ? "#f3f4f6" : "#111827"
            }}
            title={statusName}
          >
            {statusName}
          </div>
        )
      },
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (_: any, record: any) => (
        <motion.button
          style={actionButtonStyle}
          whileHover={{
            scale: 1.05,
            backgroundColor: theme === "dark" ? "#047857" : "#d1fae5"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedLeads(record)
            setIsModalOpen(true)
          }}
        >
          <Eye style={{
            width: "18px",
            height: "18px",
            color: theme === "dark" ? "#10b981" : "#059669"
          }} />
        </motion.button>
      ),
    },
  ]

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{
          textAlign: "center",
          padding: "48px",
          color: theme === "dark" ? "#ef4444" : "#dc2626"
        }}>
          <p style={{ fontSize: "18px", fontWeight: "500" }}>
            Error loading leads data
          </p>
        </div>
      </div>
    )
  }

  const getCustomFieldValue = (fieldName: string) => {
    if (!selectedLeads?.custom_fields_values) return "-"

    const field = selectedLeads.custom_fields_values.find((fieldArray: any) => {
      const fieldNameEntry = fieldArray.find((entry: any) =>
        Array.isArray(entry) && entry[0] === "field_name" && entry[1] === fieldName
      )
      return fieldNameEntry !== undefined
    })

    if (!field) return "-"

    const valuesEntry = field.find((entry: any) =>
      Array.isArray(entry) && entry[0] === "values"
    )

    if (!valuesEntry || !valuesEntry[1] || !Array.isArray(valuesEntry[1]) || valuesEntry[1]?.length === 0) {
      return "-"
    }

    const firstValue = valuesEntry[1][0]
    if (!firstValue || !Array.isArray(firstValue)) return "-"

    const valueEntry = firstValue.find((entry: any) =>
      Array.isArray(entry) && entry[0] === "value"
    )

    return valueEntry ? valueEntry[1] : "-"
  }

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <motion.div
        style={containerStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={headerStyle}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 style={titleStyle}>{t("Leads")}</h1>
          <Language />
        </motion.div>

        <motion.div
          style={tableContainerStyle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Table
            columns={columns}
            dataSource={leads}
            rowKey="id"
            pagination={{
              total: totalCount,
              pageSize: perPage,
              current: currentPage,
              showSizeChanger: false,
              onChange: handlePageChange,
              showTotal: (total, range) => {
                const currentPageNum = Math.ceil(range[0] / perPage)
                const totalPages = Math.ceil(total / perPage)
                return `${t("Page")} ${currentPageNum} ${t("of")} ${totalPages} (${total} ${t("total items")})`
              },
            }}
            loading={isLoading || isFetching}
          />
        </motion.div>

        <Modal
          title={
            <span style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}>
              {t("Leads Details")}
            </span>
          }
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedLeads(null)
          }}
          footer={null}
          width={800}
          styles={{
            mask: {
              backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.45)"
            },
            content: {
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#f3f4f6" : "#111827"
            },
            header: {
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              borderBottom: `1px solid ${theme === "dark" ? "#374151" : "#f0f0f0"}`,
              color: theme === "dark" ? "#f3f4f6" : "#000000"
            },
            body: {
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            }
          }}
        >
          <div style={{ padding: "16px", width: "100%" }}>
            {selectedLeads && (
              <motion.table
                style={modalTableStyle}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <tbody>
                  <tr>
                    <th style={modalThStyle}>{t("Ehtimollik foizi")}</th>
                    <td style={modalTdStyle}>{getCustomFieldValue("Ehtimollik foizi") + "%"}</td>
                  </tr>
                  <tr>
                    <th style={modalThStyle}>{t("Izoh")}</th>
                    <td style={modalTdStyle}>{getCustomFieldValue("Izoh")}</td>
                  </tr>
                  <tr>
                    <th style={modalThStyle}>{t("Summary 1")}</th>
                    <td style={modalTdStyle}>{getCustomFieldValue("Summary-1")}</td>
                  </tr>
                  <tr>
                    <th style={modalThStyle}>{t("Summary 2")}</th>
                    <td style={modalTdStyle}>{getCustomFieldValue("Summary-2")}</td>
                  </tr>
                  <tr>
                    <th style={modalThStyle}>{t("Summary 3")}</th>
                    <td style={modalTdStyle}>{getCustomFieldValue("Summary-3")}</td>
                  </tr>
                </tbody>
              </motion.table>
            )}
          </div>
        </Modal>
      </motion.div>
    </ConfigProvider>
  )
}

export default LeadsPage