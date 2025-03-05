import type React from "react";
import { Table, Input, Button, Tabs, Avatar, Badge, Space } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useLazyGetOperatorsQuery,
  useSyncOperatorsQuery,
} from "services/api/operators/operators.api";
import { useEffect, useState } from "react";
import { Operator } from "services/api/operators/operators.types";
import { Link } from "react-router-dom";
import { useDebounce } from "hooks";

const CallCenter: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 600);

  const { data: syncData, isLoading } = useSyncOperatorsQuery();
  const [fetchOperators, { data: operators, isLoading: isFetching }] =
    useLazyGetOperatorsQuery();

  useEffect(() => {
    if (syncData?.success) {
      fetchOperators({ page, search: "" });
    }
  }, [syncData, page]);

  useEffect(() => {
    if (syncData?.success) {
      fetchOperators({ page: 1, search: debouncedValue });
    }
  }, [debouncedValue]);

  const columns: ColumnsType<Operator> = [
    {
      title: "No",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "operator_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.photo} size={40} />
          <div>
            <div className="font-medium text-white">
              {record.name ? record.name : "-"} {record.last_name}
            </div>
            <div className="text-sm text-zinc-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Position",
      dataIndex: "work_position",
      render: (position: string) => (
        <span className="text-white">{position ? position : "-"}</span>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "mobile_phone",
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "id",
      render: (id: number) => (
        <Link to={`operator/${id}`}>
          <Button
            type="text"
            icon={<EyeOutlined className="[&_svg]:w-[28px] [&_svg]:h-[28px]" />}
            className={`!text-[#5B9BEC] hover:text-white hover:bg-zinc-800`}
          />
        </Link>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white">
          Call centre members
        </h1>
        <p className="mt-1 text-white">
          This section features staff listings and audio recordings.
        </p>
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
          {/* <DatePicker.RangePicker
            placeholder={["From when", "Till Now"]}
            allowEmpty={[false, true]}
            onChange={(date, dateString) => {
              console.log(date, dateString);
            }}
            rootClassName="[&_.ant-picker-cell-in-range_.ant-picker-cell-inner]:bg-[red]"
          /> */}
        </div>
        <Tabs
          defaultActiveKey="members"
          items={[
            {
              key: "members",
              label: "Members",
            },
            {
              key: "audios",
              label: <span>Audios</span>,
            },
          ]}
          className="[&_.ant-tabs-nav::before]:border-zinc-800 [&_.ant-tabs-tab]:text-zinc-400 [&_.ant-tabs-tab-active]:text-white"
        />
      </div>

      <div className="rounded-lg border border-zinc-800 bg-[#343436]">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <Space>
            <span className="font-semibold text-white">All members</span>
            <Badge
              // count="12 members"
              count={`${operators?.all_data} members`}
              style={{ backgroundColor: "#27272a" }}
              className="text-white"
            />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={operators?.data}
          pagination={{
            total: operators?.all_data,
            showSizeChanger: false,
            showTotal: (total, range) => `Page ${range[0]} of ${total}`,
            onChange: (page) => {
              setPage(page);
            },
          }}
          loading={isLoading || isFetching}
        />
      </div>
    </div>
  );
};

export default CallCenter;
