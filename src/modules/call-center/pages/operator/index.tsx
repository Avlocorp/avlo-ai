import { Avatar, Badge, Button, Space, Table } from "antd";
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
import { useGetSingleOperatorQuery } from "services/api/operators/operators.api";
import Analyze from "./analyze";

const OperatorPage = () => {
  const [page, setPage] = useState(1);
  const { operatorId } = useParams();
  const [analyzeAudios] = useAnalyzeAudioMutation();
  const { data: operator } = useGetSingleOperatorQuery({
    operatorId: parseInt(operatorId as string),
  });

  // const handleDownload = () => {
  //   setIsDownloading(true);

  //   // fetch(`${baseUrl}api/company/audios/pdf/${id}/`, {
  //   //   method: "GET",
  //   //   headers: {
  //   //     Authorization: `Bearer ${storage.get(ACCESS_TOKEN_KEY)}`,
  //   //   },
  //   // })
  //   //   .then((response) => {
  //   //     if (!response.ok) {
  //   //       throw new Error("Network response was not ok");
  //   //     }
  //   //     return response.blob();
  //   //   })
  //   //   .then((blob) => {
  //   //     // Create a URL for the blob
  //   //     const url = window.URL.createObjectURL(blob);

  //   //     // Create a temporary link element
  //   //     const link = document.createElement("a");
  //   //     link.href = url;
  //   //     link.setAttribute("download", `audio-${id}.pdf`);

  //   //     // Append to the document, click it, and clean up
  //   //     document.body.appendChild(link);
  //   //     link.click();
  //   //     document.body.removeChild(link);

  //   //     // Release the blob URL
  //   //     window.URL.revokeObjectURL(url);
  //   //     setIsDownloading(false);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Download failed:", error);
  //   //     setIsDownloading(false);
  //   //   });
  // };

  const navigate = useNavigate();
  const {
    data: audios,
    isLoading,
    refetch,
  } = useGetOperatorAudiosQuery({
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
    {
      title: "File upload date",
      dataIndex: "file_upload_date",
      render: (file_upload_date) => {
        return <div>{formatDate(file_upload_date)}</div>;
      },
    },
    {
      title: "File size",
      dataIndex: "size",
      render: (size) => {
        const toMB = (bytes: number) => (bytes / 1048576).toFixed(2) + " MB";

        return <div>{toMB(size)}</div>;
      },
    },
    {
      title: "Customer phone",
      dataIndex: "phone",
      render: (phone) => {
        return <div>{formatPhoneNumber(phone)}</div>;
      },
    },

    {
      title: "Status",
      dataIndex: "analysed",
      render: (analyzed) => {
        return (
          <Badge
            count={analyzed ? "Analyzed" : "Not analyzed yet"}
            className={`px-2 py-1 text-xs font-medium rounded-full [&_.ant-badge-count]:shadow-none [&_.ant-badge-count]:bg-[#9FB2C61A] ${
              analyzed
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
            <Link to={`/pm/call-center/audio/${audio.id}`}>
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
        <span className="font-medium">{operator?.data?.[0]?.name}</span>
      </div>

      <div className="mb-6 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar src={operator?.data?.[0]?.photo} size={64} />
          <div>
            <h4 className="text-white text-3xl font-semibold">
              {operator?.data?.[0]?.name} {operator?.data?.[0]?.last_name}
            </h4>
            <p className="text-base">{operator?.data?.[0]?.email}</p>
          </div>
        </div>

        {/* <div className="flex items-center text-center">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-[#5b9bec] shadow-none border-0 text-sm h-10 flex items-center justify-center p-2 px-3 rounded-md gap-2"
          >
            <DownloadIcon
              width={24}
              height={24}
              className="[&_svg]:w-[32px] [&_svg]:h-[32px]"
            />
            {isDownloading ? "Downloading..." : "Download"}
          </button>
        </div> */}
      </div>

      <Analyze data={operator?.data?.[0]?.avarege_score} />

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
