import {
  Avatar,
  Badge,
  Button,
  DatePicker,
  Table,
  Tabs,
  TabsProps,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Operator } from "services/api/operators/operators.types";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { useGetOperatorsStatisticsQuery } from "services/api/operators/operators.api";
import { useState } from "react";
import CalendarIcon from "assets/icons/calendar";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const AudiosAndOperators = () => {
  const { t } = useTranslation();
  const perPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [reversed, setReversed] = useState(true);
  const [tab, setTab] = useState("1");
  const [from, setFrom] = useState<string | null>(null);
  const [until, setUntil] = useState<string | null>(null);
  const {
    data: operators,
    isLoading,
    isFetching,
  } = useGetOperatorsStatisticsQuery({
    page: currentPage,
    search: "",
    reversed: reversed,
    from: from || undefined,
    until: until || undefined,
  });

  const { RangePicker } = DatePicker;

  const handleDateRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    if (dates) {
      setFrom(dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : null);
      setUntil(dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : null);
    } else {
      setFrom(null);
      setUntil(null);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("Operators"),
    },
    {
      key: "2",
      label: t("Calls"),
    },
  ];

  const columns: ColumnsType<Operator> = [
    {
      title: "No",
      dataIndex: "id",
      render: (_, __, index) => (currentPage - 1) * perPage + index + 1,
    },

    {
      title: t("Name"),
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
      title: t("Overall"),
      dataIndex: "avarege_score",
      showSorterTooltip: { target: "full-header" },
      sorter: true,

      sortDirections: ["descend"],
      render: (score) => (
        <Badge
          count={`${score.overall_performance_score}%`}
          className="[&_.ant-badge-count]:bg-transparent [&_.ant-badge-count]:shadow-none [&_.ant-badge-count]:border [&_.ant-badge-count]:border-[#139a51]"
        />
      ),
    },
    {
      title: t("All calls amount"),
      dataIndex: "all_calls",
    },
    {
      title: t("Position"),
      dataIndex: "work_position",
      render: (position: string) => (
        <span className="text-white">{position ? position : "-"}</span>
      ),
    },
    {
      title: t("Phone number"),
      dataIndex: "mobile_phone",
    },
    {
      title: t("Actions"),
      key: "actions",
      dataIndex: "id",
      render: (id: number) => (
        <Link to={`/pm/call-center/operator/${id}`}>
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
      <div className="flex items-center justify-between mb-6 py-4 px-6 bg-[#2a2a2d] rounded-xl">
        <Tabs
          defaultActiveKey={tab}
          items={items}
          className="w-max [&_.ant-tabs-tab-btn]:text-[#adbdb5] before:[&_.ant-tabs-nav]:border-[#1a1a1d]"
          onChange={setTab}
        />

        <div className="flex items-center gap-3">
          <RangePicker
            prefix={<CalendarIcon />}
            variant="borderless"
            suffixIcon={null}
            allowClear={false}
            separator={"-"}
            onChange={(dates) => handleDateRangeChange(dates)}
            className="custom-range-picker py-[10px] px-4 bg-[#1A1A1D] text-sm text-white placeholder-white hover:bg-[#393941]"
            placeholder={["Jan 6, 2022", "Jan 13, 2022"]}
            format="YYYY-MM-DD"
          />
        </div>
      </div>
      {tab === "1" && (
        <Table
          columns={columns}
          dataSource={operators?.data}
          pagination={{
            total: operators?.all_data,
            showSizeChanger: false,
            onChange: (page) => setCurrentPage(page),
            showTotal: (total, range) => {
              const currentPage = Math.ceil(range[0] / perPage);
              const totalPages = Math.ceil(total / perPage);
              return `Page ${currentPage} of ${totalPages}`;
            },
          }}
          loading={isLoading || isFetching}
          showSorterTooltip={{ target: "sorter-icon" }}
          onChange={(_, __, sorter) => {
            const order = Array.isArray(sorter)
              ? sorter[0]?.order
              : sorter?.order;
            if (order === "descend") {
              setReversed(false);
            } else {
              setReversed(true);
            }
          }}
        />
      )}
    </div>
  );
};

export default AudiosAndOperators;
