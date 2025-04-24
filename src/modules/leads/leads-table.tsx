import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useGetLeadsListQuery } from "services/api/leads/leads.api";
import { Lead } from "services/api/leads/leads.types";

interface IProps {
  searchValue: string;
}

const LeadsTable = (props: IProps) => {
  const perPage = 50;
  const { searchValue } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { data, isLoading, isFetching } = useGetLeadsListQuery({
    page: currentPage,
    search: searchValue,
  });
  const { t } = useTranslation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: String(page) }); // URLga yangi sahifani saqlash
  };

  const columns: ColumnsType<Lead> = [
    {
      title: "No",
      dataIndex: "id",
      render: (_, __, index) => (currentPage - 1) * perPage + index + 1,
    },
    {
      title: t("Title"),
      dataIndex: "TITLE",
      key: "TITLE",
    },
    {
      title: t("Created at"),
      dataIndex: "DATE_CREATE",
      key: "DATE_CREATE",
      render: (value) => {
        const date = new Date(value);
        const humanReadable = date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        return humanReadable;
      },
    },
    {
      title: t("Assigned to"),
      dataIndex: "assigned_by",
      key: "assigned_by",
      render: (value) => {
        return value && `${value.name} ${value.last_name}`;
      },
    },
    {
      title: t("Scoring"),
      dataIndex: "lead_score",
      key: "lead_score",
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        // total: data?.total,
        pageSize: perPage,
        current: currentPage,
        showSizeChanger: false,
        onChange: (page) => {
          setCurrentPage(page);
          handlePageChange(page);
        },
        showTotal: (total, range) =>
          `Page ${Math.ceil(range[0] / perPage)} of ${Math.ceil(
            total / perPage
          )}`,
      }}
      loading={isLoading || isFetching}
    />
  );
};

export default LeadsTable;
