import { Badge, Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import HomeIcon from "assets/icons/HomeIcon";
import { ChevronRight, Cpu, Download, Eye, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAnalyzeAudioMutation,
  useGetOperatorAudiosQuery,
} from "services/api/audios/audios.api";
import { OperatorAudio } from "services/api/audios/audios.types";
import AudioFile from "assets/icons/mp3-icon.png";
import { formatDate, formatPhoneNumber } from "components/lib/utils";
import { toast } from "react-toastify";

const OperatorPage = () => {
  const [page, setPage] = useState(1);
  const { operatorId } = useParams();
  const [analyzeAudios] = useAnalyzeAudioMutation();

  const navigate = useNavigate();
  const { data: audios, isLoading, refetch } = useGetOperatorAudiosQuery({
    operatorId: parseInt(operatorId as string),
    page,
  });

  const columns: ColumnsType<OperatorAudio> = [
    {
      title: "ID",
      dataIndex: "audio_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value) => {
        return (
          <div className="flex items-center gap-2">
            <img src={AudioFile} alt="Audio file icon" width={40} height={40} />
            <span className="text-white">{value}</span>
          </div>
        );
      },
    },
    // {
    //   title: "Link",
    //   dataIndex: "operator",
    //   render: (value) => {
    //     return (
    //       <div className="w-[350px] flex items-center gap-2">
    //         <Avatar src={value.photo} />
    //         <div>
    //           <h3 className="font-medium">
    //             {value.name} {value.last_name}
    //           </h3>
    //           <p className="text-[#ADBDB5]">{value.email}</p>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      title: "File upload date",
      dataIndex: "file_upload_date",
      render: (file_upload_date) => {
        return (
          <div>
            {formatDate(file_upload_date)}
          </div>
        );
      },
    },
    {
      title: "File size",
      dataIndex: "size",
      render: (size) => {
        const toMB = (bytes: number) => (bytes / 1048576).toFixed(2) + " MB";

        return (
          <div>
            {toMB(size)}
          </div>
        );
      },
    },
    {
      title: "Customer phone",
      dataIndex: "phone",
      render: (phone) => {
        return (
          <div>
            {formatPhoneNumber(phone)}
          </div>
        );
      },
    },


    {
      title: "Status",
      dataIndex: "analysed",
      render: (analyzed) => {
        return (
          <Badge
            count={analyzed ? "Analyzed" : "Not analyzed yet"}
            className={`px-2 py-1 text-xs font-medium rounded-full [&_.ant-badge-count]:shadow-none [&_.ant-badge-count]:bg-[#9FB2C61A] ${analyzed
              ? "[&_.ant-badge-count]:bg-[#34c75937] text-green-500"
              : "text-zinc-400"
              }`}
          />
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "data",
      render: (_, audio) => {
        return (
          <Space>
            <Link to={`/admin/call-center/audio/${audio.id}`}>
              <Eye color={audio.analysed ? "#5B9BEC" : "#4A554F"} />
            </Link>
            <Button
              icon={<Cpu />}
              type="text"
              className={audio.analysed ? "text-[#4A554F]" : "text-[#5B9BEC]"}
              onClick={() => {
                analyzeAudios(audio.id.toString());
              }}
            ></Button>
            <Link to={audio.download_link}>
              <Button
                type="text"
                icon={<Download />}
                className={`hover:text-white hover:bg-zinc-800 !text-[#5B9BEC]`}
              />
            </Link>
          </Space>
        );
      },
    },
  ];

  return (
    <section className="p-6">
      <div className="mb-5 flex items-center gap-2">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <HomeIcon isActive />
        </div>
        <ChevronRight />
        <span
          className="font-medium cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Call centre
        </span>
        <ChevronRight />
        {/* <span className="font-medium">{data?.operator}</span> */}
      </div>
      <div className="mb-6 flex items-center gap-4">
        {/* <h4 className="text-white text-3xl font-semibold">{data?.operator}</h4> */}
      </div>

      <div className="mb-6">
        <h4 className="text-center">Not analyzed yet</h4>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-[#343436]">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <Space>
            <span className="font-semibold text-white">All audios</span>
          </Space>

          <button
            className="flex items-center gap-2 text-[#5B9BEC] text-base mr-3"
            onClick={() => {
              refetch();
              toast.success("Data refreshed successfully");
            }}
          >
            <RefreshCcw stroke="#5B9BEC" />
            Refresh
          </button>
        </div>

        <Table
          columns={columns}
          dataSource={audios?.data || []}
          pagination={{
            total: audios?.all_data,
            showSizeChanger: false,
            showTotal: (total, range) => `Page ${range[0]} of ${total}`,
            onChange: (page) => {
              setPage(page);
            },
          }}
          loading={isLoading}
        />
      </div>
    </section>
  );
};

export default OperatorPage;
