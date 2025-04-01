import type React from "react";
import { Table, Input, Badge, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetLeadsListQuery } from "services/api/leads/leads.api";
import { Lead } from "services/api/leads/leads.types";
import { useDebounce } from "hooks";

const LeadsList: React.FC = () => {
  const perPage = 50;
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 600);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: String(page) }); // URLga yangi sahifani saqlash
  };

  const { data, isLoading, isFetching } = useGetLeadsListQuery({
    page: currentPage,
    search: debouncedValue,
  });

  const columns: ColumnsType<Lead> = [
    {
      title: "No",
      dataIndex: "id",
      render: (_, __, index) => (currentPage - 1) * perPage + index + 1,
    },
    {
      title: "Title",
      dataIndex: "TITLE",
      key: "TITLE",
    },
    {
      title: "Created at",
      dataIndex: "DATE_CREATE",
      key: "DATE_CREATE",
    },
    {
      title: "Assigned to",
      dataIndex: "assigned_by",
      key: "assigned_by",
      render: (value) => {
        return value && `${value.name} ${value.last_name}`;
      },
    },
    {
      title: "Scoring",
      dataIndex: "lead_score",
      key: "lead_score",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white">Call centre leads</h1>
      </div>

      <div className="mb-6 px-4 py-3 bg-[#343436] rounded-xl">
        <div className="flex justify-between">
          <Input
            placeholder="Search for members"
            prefix={
              <SearchOutlined className="[&_svg]:w-6 [&_svg]:h-6 text-zinc-400" />
            }
            className="w-[400px] h-11 bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-[#343436]">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <Space>
            <span className="font-semibold text-white">All members</span>
            {data?.total && (
              <Badge
                count={`${data?.total} members`}
                style={{ backgroundColor: "#27272a" }}
                className="text-white"
              />
            )}
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={data?.result}
          pagination={{
            total: data?.total,
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
      </div>
    </div>
  );
};

export default LeadsList;
