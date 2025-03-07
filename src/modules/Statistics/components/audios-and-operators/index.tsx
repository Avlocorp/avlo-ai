import { Avatar, Badge, Button, Table, Tabs, TabsProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Operator } from "services/api/operators/operators.types";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { useGetOperatorsQuery } from "services/api/operators/operators.api";
import { useState } from "react";

const AudiosAndOperators = () => {
  const [page, setPage] = useState(1);
  const {
    data: operators,
    isLoading,
    isFetching,
  } = useGetOperatorsQuery({ page: page, search: "" });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
    },
    {
      key: "2",
      label: "Tab 2",
    },
  ];

  const columns: ColumnsType<Operator> = [
    {
      title: "No",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },

    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.photo} size={40} icon={<UserOutlined />} />
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
      title: "Overall",
      dataIndex: "avarege_score",
      render: (score) => (
        <Badge
          count={`${score.overall_performance_score}%`}
          className="[&_.ant-badge-count]:bg-transparent [&_.ant-badge-count]:shadow-none [&_.ant-badge-count]:border [&_.ant-badge-count]:border-[#139a51]"
        />
      ),
    },
    {
      title: "All calls amount",
      dataIndex: "all_calls",
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
    <div>
      <div className="mb-6 py-4 px-6 bg-[#2a2a2d] rounded-xl">
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="[&_.ant-tabs-tab-btn]:text-[#adbdb5] before:[&_.ant-tabs-nav]:border-[#1a1a1d]"
        />
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
  );
};

export default AudiosAndOperators;
