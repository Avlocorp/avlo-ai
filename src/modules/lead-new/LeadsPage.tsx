"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { useGetLeadsListQuery } from "services/api/leads/leads.api"
import { useTheme } from "services/contexts/ThemeContext"
import { ConfigProvider, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { theme as antdTheme } from "antd"
import { motion } from "framer-motion"
import type { Lead } from "services/api/leads/leads.types"
import Language from "components/language"

const LeadsPage = () => {
  const perPage = 50
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = Number(searchParams.get("page")) || 1
  const [currentPage, setCurrentPage] = useState(initialPage)
  const { theme } = useTheme()
  const { t } = useTranslation()

  // Fetch data
  const { data, error } = useGetLeadsListQuery({
    page: currentPage,
    limit: perPage,
  })

  const leads = data?.result || []

  // Keep URL in sync
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1
    if (urlPage !== currentPage) {
      setCurrentPage(urlPage)
    }
  }, [searchParams])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const params = new URLSearchParams(searchParams)
    params.set("page", String(page))
    setSearchParams(params)
  }

  const getThemeConfig = () => ({
    algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#4338ca",
      borderRadius: 8,
      colorBgContainer: theme === "dark" ? "#374151" : "#ffffff",
      colorText: theme === "dark" ? "#f3f4f6" : "#111827",
    },
  })

  const columns: ColumnsType<Lead> = [
    {
      title: "No",
      render: (_, __, index) => (currentPage - 1) * perPage + index + 1,
      width: 60,
    },
    {
      title: t("Title"),
      dataIndex: "TITLE",
      render: (v) => (
        <div
          style={{
            maxWidth: 180,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={v}
        >
          {v || t("No title")}
        </div>
      ),
    },
    {
      title: t("Created at"),
      dataIndex: "created_at",
      render: (v) => {
        if (!v) return "-"
        const d = new Date(v)
        const dateStr = d.toLocaleDateString("en-GB").replace(/\//g, ".")
        const timeStr = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
        return `${dateStr} ${timeStr}`
      },
    },
    {
      title: t("Assigned to"),
      dataIndex: "assigned_by",
      render: (r) => `${r?.name || ""} ${r?.last_name || ""}`.trim() || "-",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      render: (v) => v || "-",
    },
  ]

  if (error) {
    return (
      <div style={{ padding: 32, color: theme === "dark" ? "#ef4444" : "#dc2626" }}>
        <p style={{ fontSize: 18, fontWeight: 500, textAlign: "center" }}>
          Error loading leads data
        </p>
      </div>
    )
  }

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: 32,
          minHeight: "100vh",
          backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
          color: theme === "dark" ? "#f3f4f6" : "#111827",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600 }}>{t("Leads")}</h1>
          <Language />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
            boxShadow: theme === "dark"
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table
            columns={columns}
            dataSource={leads}
            rowKey="ID"
            pagination={{
              total: 300,
              current: currentPage,
              pageSize: perPage,
              onChange: handlePageChange,
              showSizeChanger: false,
              hideOnSinglePage: false,
            }}
          />

        </motion.div>
      </motion.div>
    </ConfigProvider>
  )
}

export default LeadsPage
