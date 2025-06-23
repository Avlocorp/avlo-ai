

import type { ColumnsType } from "antd/es/table"
import { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query/react"
import { useGetLeadsListQuery, useGetSingleStatusQuery } from "services/api/leads/leads.api"

import type { Lead } from "services/api/leads/leads.types"
import Language from "components/language"
import { useGetSingleOperatorQuery } from "services/api/operators/operators.api"
import Table from "antd/es/table"



const LeadsPage = () => {
  const perPage = 10
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = Number(searchParams.get("page")) || 1
  const [currentPage, setCurrentPage] = useState(initialPage)

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

  const { t } = useTranslation()

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

  // Since we can't call hooks in a loop, we'll use conditional queries
  // for up to 10 possible operators (matching perPage)
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
      operator1,
      operator2,
      operator3,
      operator4,
      operator5,
      operator6,
      operator7,
      operator8,
      operator9,
      operator10,
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
    operator1,
    operator2,
    operator3,
    operator4,
    operator5,
    operator6,
    operator7,
    operator8,
    operator9,
    operator10,
  ])
  const uniqueStatusIds = useMemo(() => {
    const statusIds = leads
      .map((lead) => lead.status_id)
      .filter((id): id is number => id !== undefined && id !== null)

    return [...new Set(statusIds)]
  }, [leads])

  // statuslar uchun query lar
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

  // statusMap yaratish
  const statusMap = useMemo(() => {
    const map = new Map()
    const statuses = [
      status1,
      status2,
      status3,
      status4,
      status5,
      status6,
      status7,
      status8,
      status9,
      status10,
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
        <div className="truncate max-w-[180px]" title={value || t("No title")}>
          {value || t("No title")}
        </div>
      ),
      width: 200,
    },
    {
      title: t("Created at"),
      dataIndex: "created_at",
      render: (value) => {
        if (!value) return "";

        try {
          const date = new Date(typeof value === "number" ? value * 1000 : value);
          const humanReadable = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return (
            <div className="max-w-[130px]" title={humanReadable}>
              {humanReadable}
            </div>
          );
        } catch (error) {
          return <div className="max-w-[130px]">Invalid date</div>;
        }
      },
      width: 150,
    },
    {
      title: t("Assigned to"),
      dataIndex: "responsible_user_id",
      render: (responsible_user_id) => {
        if (!responsible_user_id) {
          return <div className="truncate max-w-[150px]">{t("Not assigned")}</div>;
        }

        const operatorData = operatorMap.get(responsible_user_id);

        // Agar hali yuklanmagan bo'lsa yoki topilmasa
        if (!operatorData) {
          return <div className="truncate max-w-[150px]">{t("Loading...")}</div>;
        }

        const operatorName = operatorData?.name || t("Unknown operator");

        return (
          <div title={operatorName} className="truncate max-w-[150px]">
            {operatorName}
          </div>
        );
      },
      width: 150,
    },
    {
      title: t("Status"),
      dataIndex: "status_id",
      render: (status_id) => {
        if (!status_id) {
          return (
            <div className="max-w-[150px] truncate">
              {t("Unknown status")}
            </div>
          );
        }

        const statusData = statusMap.get(status_id);
        const statusName = statusData?.name || t("Unknown status");

        return (
          <div className="max-w-[150px] truncate" title={statusName}>
            {statusName}
          </div>
        );
      },
      width: 150,
    },
  ];


  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Error loading leads data</p>
      </div>
    )
  }

  return (
    <div className="px-8 py-5">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Leads</h1>
          <Language />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
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
              return `Page ${currentPageNum} of ${totalPages} (${total} total items)`
            },
          }}
          loading={isLoading || isFetching}
        />
      </div>
    </div>
  )
}

export default LeadsPage
