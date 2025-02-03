import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Cpu, FileChartColumn } from "lucide-react";
import Mp3icon from "assets/icons/mp3-icon.png";

const dataSource = [
  {
    key: "1",
    executedBy: "Voice #007 – Dec 2024",
    duration: "12:34",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
    deliveryTime: "18:08",
    deliveryDate: "Jan 13, 2024",
  },
  {
    key: "2",
    executedBy: "Voice #007 – Dec 2024",
    duration: "2:34",
    name: "John",
    age: 42,
    address: "10 Downing Street",
    deliveryTime: "18:08",
    deliveryDate: "Jan 13, 2024",
  },
];

const columns: ColumnsType = [
  {
    title: "Executed by",
    dataIndex: "executedBy",
    key: "executedBy",
    render: (text) => {
      return (
        <div className="flex items-center gap-3">
          <img src={Mp3icon} alt="" width={40} height={40} />
          <span className="font-medium">{text}</span>
        </div>
      );
    },
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Delivery date",
    dataIndex: "deliveryTime",
    key: "deliveryTime",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => {
      return (
        <button className="text-[#5b9bec] font-semibold text-sm">
          Analyze
        </button>
      );
    },
  },
];

const AudiosTable = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-[#343436]">
      <div className="py-5 px-6 flex justify-between items-center">
        <h3 className="text-white font-semibold text-lg">All audios</h3>

        <div className="flex gap-3">
          <Button className="h-10 px-4 py-[10px] flex items-center gap-2 bg-[#139a51] border-none hover:!bg-[#139a51] hover:opacity-90">
            <FileChartColumn className="block w-5 h-5 text-white" />

            <span className="font-semibold text-sm text-white">Export</span>
          </Button>
          <Button className="h-10 px-4 py-[10px] flex items-center gap-2 bg-[#5b9bec] border-none hover:!bg-[#5b9bec] hover:opacity-90">
            <Cpu className="block w-5 h-5 text-white" />

            <span className="font-semibold text-sm text-white">Analyze</span>
          </Button>
        </div>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="[&_.ant-table]:bg-[#2a2a2d] [&_.ant-table-cell]:!bg-[#2a2a2d]  [&_.ant-table-cell]:border-[#1a1a1d] [&_.ant-table-cell]:!text-[#ffffff] [&_th.ant-table-cell]:!text-[#adbdb5]"
      />
    </div>
  );
};

export default AudiosTable;
