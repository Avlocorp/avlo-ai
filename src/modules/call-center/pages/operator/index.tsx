import { Avatar, Badge, Button, Space, Table, Tabs } from "antd";
import { ColumnsType } from "antd/es/table";
import HomeIcon from "assets/icons/HomeIcon";
import { ChevronRight, Cpu, Download, Eye, RefreshCcw } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAnalyzeAudioMutation,
  useGetClientsInfoQuery,
  useGetOperatorAudiosQuery,
  useRefreshAudiosMutation,
} from "services/api/audios/audios.api";
import { CustomerData, OperatorAudio } from "services/api/audios/audios.types";
import AudioFile from "assets/icons/mp3-icon.png";
import { formatDate, formatPhoneNumber } from "components/lib/utils";
import { toast, Id } from "react-toastify";
import { useGetSingleOperatorQuery } from "services/api/operators/operators.api";
import Analyze from "./analyze";
import { useTranslation } from "react-i18next";

const OperatorPage = () => {
  const { t } = useTranslation();
  const toastId = useRef<Id | null>(null);

  const [page, setPage] = useState(1);
  const { operatorId } = useParams();
  const [analyzeAudios] = useAnalyzeAudioMutation();
  const { data: operator } = useGetSingleOperatorQuery({
    operatorId: parseInt(operatorId as string),
  });

  const navigate = useNavigate();
  const {
    data: audios,
    isLoading,
    refetch,
  } = useGetOperatorAudiosQuery({
    operatorId: parseInt(operatorId as string),
    page,
  });

  const { data: customer } = useGetClientsInfoQuery({
    id: parseInt(operatorId as string),
    page,
  });
  const [fetchAudios] = useRefreshAudiosMutation();

  const [activeTab, setActiveTab] = useState("all_audios");

  const columnsAudios: ColumnsType<OperatorAudio> = [
    {
      title: "ID",
      dataIndex: "audio_id",
    },
    {
      title: t("Name"),
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
      title: t("File upload date"),
      dataIndex: "file_upload_date",
      render: (file_upload_date) => {
        return <div>{formatDate(file_upload_date)}</div>;
      },
    },
    {
      title: t("File size"),
      dataIndex: "size",
      render: (size) => {
        const toMB = (bytes: number) => (bytes / 1048576).toFixed(2) + " MB";

        return <div>{toMB(size)}</div>;
      },
    },
    {
      title: t("Customer phone"),
      dataIndex: "phone",
      render: (phone) => {
        return <div>{formatPhoneNumber(phone)}</div>;
      },
    },

    {
      title: t("Status"),
      dataIndex: "analysed",
      render: (analyzed) => {
        return (
          <Badge
            count={analyzed ? t("Analyzed") : t("Not analyzed yet")}
            className={`px-2 py-1 text-xs font-medium rounded-full [&_.ant-badge-count]:shadow-none [&_.ant-badge-count]:bg-[#9FB2C61A] ${analyzed
                ? "[&_.ant-badge-count]:bg-[#34c75937] text-green-500"
                : "text-zinc-400"
              }`}
          />
        );
      },
    },
    {
      title: t("Actions"),
      key: "actions",
      dataIndex: "data",
      render: (_, audio) => {
        return (
          <Space>
            <Link
              to={audio.analysed ? `/pm/call-center/audio/${audio.id}` : ""}
            >
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
  const columnsCustomer: ColumnsType<CustomerData> = [
    {
      title: "№",
      dataIndex: "index",
      render: (_, __, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: t("Customer phone"),
      dataIndex: "phone",
      render: (phone) => {
        return <div>{formatPhoneNumber(phone)}</div>;
      },
    },
    {
      title: (
        <div className="text-center">{t("Overall performance score")}</div>
      ),
      dataIndex: "analysed_calls",
      render: (analysed_calls) => {
        return (
          <div className="text-center">
            {analysed_calls.overall_performance_score}
          </div>
        );
      },
    },

    {
      title: <div className="text-center">{t("Successfully calls")}</div>,
      dataIndex: "analysed_calls",
      render: (analysed_calls) => {
        return (
          <div className="text-center">{analysed_calls.successfully_calls}</div>
        );
      },
    },
    {
      title: <div className="text-center">{t("Unsuccessfully calls")}</div>,
      dataIndex: "analysed_calls",
      render: (analysed_calls) => {
        return (
          <div className="text-center">
            {analysed_calls.unsuccessfully_calls}
          </div>
        );
      },
    },
    {
      title: <div className="text-center">{t("All calls")}</div>,
      dataIndex: "all_calls",
      render: (all_calls) => {
        return <div className="text-center">{all_calls}</div>;
      },
    },
    {
      title: t("Actions"),
      key: "actions",
      dataIndex: "data",
      render: (_, item) => {
        return (
          <Space>
            <Link
              to={`/pm/calls-history/${item.phone.replaceAll("+", "")}`}
            // to={audio.analysed ? `/pm/call-center/audio/${audio.id}` : ""}
            >
              <Eye color={"#5B9BEC"} />
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
          {t("Call centre")}
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
      </div>

      <Analyze data={operator?.data?.[0]?.avarege_score} />

      <div className="rounded-lg border border-zinc-800 bg-[#343436]">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <Space>
            <Tabs
              defaultActiveKey="all_audios"
              activeKey={activeTab}
              onChange={setActiveTab}
              items={[
                {
                  key: "all_audios",
                  label: t("All audios"),
                },
                {
                  key: "customer",
                  label: t("Customers"),
                },
              ]}
            />
          </Space>

          <button
            className="flex items-center gap-2 text-[#5B9BEC] text-base mr-3"
            onClick={() => {
              toastId.current = toast(t("Refreshing data..."), {
                autoClose: false,
                type: "info",
              });
              fetchAudios().then(() => {
                refetch();
                // toast.success("Data refreshed successfully");
                toast.update(toastId.current as Id, {
                  render: t("Data refreshed successfully"),
                  type: "success",
                  autoClose: 2000,
                });
              });
            }}
          >
            <RefreshCcw stroke="#5B9BEC" />
            {t("Refresh")}
          </button>
        </div>

        {activeTab === "all_audios" && (
          <Table
            columns={columnsAudios}
            dataSource={audios?.data || []}
            pagination={{
              total: audios?.all_data || 0,
              showSizeChanger: false,
              showTotal: (total, range) => `Page ${range[0]} of ${total}`,
              onChange: (page) => setPage(page),
            }}
            loading={isLoading}
          />
        )}

        {activeTab === "customer" && (
          <Table
            columns={columnsCustomer}
            dataSource={customer?.data || []}
            pagination={{
              total: customer?.all_data || 0,
              showSizeChanger: false,
              showTotal: (total, range) => `Page ${range[0]} of ${total}`,
              onChange: (page) => setPage(page),
            }}
            loading={isLoading}
          />
        )}
      </div>
    </section>
  );
};

export default OperatorPage;
