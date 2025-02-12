import type React from "react";
import {
  Table,
  Input,
  Button,
  Tabs,
  Avatar,
  Badge,
  Space,
  DatePicker,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  FileExcelOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Cpu } from "lucide-react";

interface Member {
  key: string;
  name: string;
  email: string;
  avatar: string;
  performance: number;
  todayCalls: number;
  allCalls: number;
  analyzed: boolean;
  date: string;
}

const members: Member[] = [
  {
    key: "1",
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-doqBkubeNUojU9uYNknpP5yAiDmh7F.png",
    performance: 80,
    todayCalls: 20,
    allCalls: 20,
    analyzed: true,
    date: "Feb 22, 2024",
  },
  {
    key: "2",
    name: "Phoenix Baker",
    email: "phoenix@untitledui.com",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-doqBkubeNUojU9uYNknpP5yAiDmh7F.png",
    performance: 75,
    todayCalls: 15,
    allCalls: 15,
    analyzed: false,
    date: "Feb 22, 2024",
  },
  {
    key: "2",
    name: "Phoenix Baker",
    email: "phoenix@untitledui.com",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-doqBkubeNUojU9uYNknpP5yAiDmh7F.png",
    performance: 49,
    todayCalls: 15,
    allCalls: 15,
    analyzed: false,
    date: "Feb 22, 2024",
  },
  // Add more members as needed
];

const CallCenter: React.FC = () => {
  const columns: ColumnsType<Member> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} size={40} />
          <div>
            <div className="font-medium text-white">{record.name}</div>
            <div className="text-sm text-zinc-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Overall performance",
      dataIndex: "performance",
      render: (performance: number) => (
        <Badge
          count={`${performance >= 50 ? "+" : "-"} ${performance}%`}
          className={`px-2 py-1 [&_.ant-badge-count]:!bg-transparent text-xs font-medium rounded-full [&_.ant-badge-count]:shadow-none [&_.ant-badge-count]:border ${
            performance >= 50
              ? "[&_.ant-badge-count]:text-[#139a51] [&_.ant-badge-count]:border-[#139A51]"
              : "[&_.ant-badge-count]:text-[#ff3b30] [&_.ant-badge-count]:border-[#ff3b30]"
          }`}
        />
      ),
    },
    {
      title: "Today calls",
      dataIndex: "todayCalls",
    },
    {
      title: "All calls amount",
      dataIndex: "allCalls",
    },
    {
      title: "Analyzed",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "analyzed",
      render: (analyzed: boolean) => (
        <Badge
          count={analyzed ? "Analyzed" : "Not analyzed yet"}
          className={`px-2 py-1 text-xs font-medium rounded-full [&_.ant-badge-count]:shadow-none [&_.ant-badge-count]:bg-[#9FB2C61A] ${
            analyzed
              ? "text-green-500 [&_.ant-badge-count]:bg-[#34c75961]"
              : "text-zinc-400"
          }`}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "analyzed",
      render: (analyzed: boolean) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined className="[&_svg]:w-[28px] [&_svg]:h-[28px]" />}
            className={`text-zinc-400 hover:text-white hover:bg-zinc-800 ${
              !analyzed ? "!text-[#5B9BEC]" : "!text-[#49554F]"
            }`}
          />
          <Button
            type="text"
            icon={<Cpu size={28} />}
            className={`text-zinc-400 hover:text-white hover:bg-zinc-800 ${
              analyzed ? "!text-[#5B9BEC]" : "!text-[#49554F]"
            }`}
          />
        </Space>
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
          />
          <DatePicker.RangePicker
            placeholder={["From when", "Till Now"]}
            allowEmpty={[false, true]}
            onChange={(date, dateString) => {
              console.log(date, dateString);
            }}
            rootClassName="[&_.ant-picker-cell-in-range_.ant-picker-cell-inner]:bg-[red]"
          />
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
              count="12 members"
              style={{ backgroundColor: "#27272a" }}
              className="text-white"
            />
          </Space>
          <Space>
            <Button
              type="primary"
              icon={<FileExcelOutlined />}
              className="bg-[#139a51] shadow-none hover:bg-green-700 border-0"
            >
              Export
            </Button>
            <Button
              type="primary"
              icon={<LineChartOutlined />}
              className="bg-[#5b9bec] shadow-none hover:bg-blue-700 border-0"
            >
              Analyze
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={members}
          pagination={{
            total: 100,
            showSizeChanger: false,
            showTotal: (total, range) => `Page ${range[0]} of ${total}`,
          }}
        />
      </div>
    </div>
  );
};

export default CallCenter;
