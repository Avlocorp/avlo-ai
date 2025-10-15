import { ArrowLeft, Phone, Clock, Brain, Eye, TrendingUp, Filter, ArrowUpDown, ArrowUpRight, RefreshCcw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDetailOperatorQuery } from 'services/api/settings';
import { Input, Pagination, Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useGetLeadsListNewQuery, useLazyGetLeadAnalysisQuery } from 'services/api/leads/leads.api';
import dayjs from 'dayjs';
import LeadAnalysisRejectedModal from 'modules/Agents/components/rejected-view/rejected-modal-detail';
import LeadAnalysisThinkModal from 'modules/Agents/components/think-view/think-modal-detail';
import LeadAnalysisSendPayModal from 'modules/Agents/components/send-pay-view/sendPay-modal-detail';
import { SearchOutlined } from "@ant-design/icons";

export default function DetailAgents() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: operatorDetail } = useGetDetailOperatorQuery({
    id: Number(id), // string bo‘lib keladi, Number ga o‘tkazamiz
  });
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const strengths = operatorDetail?.analysed_data?.top_strengths || [];
  const weaknesses = operatorDetail?.analysed_data?.top_weaknesses || [];
  const onBack = () => {
    navigate('/pm/operators');
  }
  const [selectedLead, setSelectedLead] = useState<{ id: number } | null>(null);

  const getDateRange = (time: string | undefined) => {
    const today = new Date();
    let from: string | undefined;
    let until: string | undefined;

    const format = (d: Date) => d.toISOString().split("T")[0]; // YYYY-MM-DD

    switch (time) {
      case "today":
        from = format(today);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        until = format(tomorrow);
        break;
      case "yesterday":
        const y = new Date(today);
        y.setDate(today.getDate() - 1);
        from = format(y);
        const yNext = new Date(y);
        yNext.setDate(y.getDate() + 1);
        until = format(yNext);
        break;
      case "week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 7);
        from = format(weekStart);
        until = format(today);
        break;
      case "month":
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        from = format(monthStart);
        until = format(today);
        break;
      default:
        from = undefined;
        until = undefined;
    }

    return { from, until };
  };


  function getInitials(name?: string, lastName?: string) {
    if (!name && !lastName) return "?";
    return `${name?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  }

  const { from, until } = getDateRange(selectedTime);

  // ✅ Leads API chaqiruv

  // Search state
  const [search, setSearch] = useState<string>("");

  // sort state
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }


  const { data, isLoading, refetch } = useGetLeadsListNewQuery({
    page: currentPage,
    limit: pageSize,
    status_id: selectedStatus,
    from,
    search,
    until,
    field: "created_date",
    sort: sortOrder === "asc" ? "created_date" : "-created_date",
    operator_id: Number(id),
  });

  const getStatusLabel = (statusId: string | number | null | undefined) => {
    const found = statusOptions.find((s) => s.value === String(statusId));
    return found ? found.label : "-";
  };

  const getStatusColor = (status: string | number | null | undefined) => {
    switch (String(status)) {
      case "UC_5SK34Q":
        return "bg-blue-100 text-blue-800";
      case "1":
        return "bg-yellow-100 text-yellow-800";
      case "UC_0JC627":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  const [triggerAnalysis] = useLazyGetLeadAnalysisQuery()
  const [analyzingIds, setAnalyzingIds] = useState<number[]>([]);

  const handleAnalyze = async (crmId: number) => {
    // oldini olish: bir paytning o'zida bir xil leadga qayta bosilmasin
    setAnalyzingIds(prev => (prev.includes(crmId) ? prev : [...prev, crmId]))
    try {
      await triggerAnalysis(crmId).unwrap()
      await refetch() // ro'yxatdagi analysed flag yangilansin
    } catch (error) {
      console.error("Analysis error:", error)
    } finally {
      setAnalyzingIds(prev => prev.filter(x => x !== crmId))
    }
  }

  const timeOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];
  const statusOptions = [
    { label: "To'lov yuborildi", value: "UC_5SK34Q" },
    { label: "Bekor bo'ldi", value: "1" },
    { label: "O'ylab ko'radi", value: "UC_0JC627" },
  ];


  return (

    <div
      className="min-h-screen"
    >
      <div className="flex items-center justify-between shadow-sm border-b p-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Agents</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">agentName's Leads</h1>
            <p className="text-sm text-gray-600">Manage and analyze lead interactions</p>
          </div>
        </div>
        <button
          // onClick={onViewAnalytics}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Brain className="w-4 h-4" />
          <span>View Analytics</span>
        </button>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">



        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              AI Analysis Summary
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Aggregated insights from 00 analyzed leads
            </p>
          </div>

          <div className="p-6  flex gap-6">




            <div className="bg-white border rounded-lg p-6 w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Top Insights
              </h3>
              <div className="space-y-3">
                {strengths.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Pain Points */}
            <div className="bg-white border rounded-lg p-6 w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-orange-600" />
                Common Pain Points
              </h3>
              <div className="space-y-3">
                {weaknesses.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>



          </div>
        </div>


        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border mt-5">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Lead Filters</h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm border mb-8 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">{t("Filters")}</h2>
              </div>




              <div className="flex items-center gap-3 w-[90%]">


                <div className="w-full max-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Status")}
                  </label>
                  <Select
                    allowClear
                    placeholder="Select status"
                    className="w-full cursor-pointer h-10"
                    options={statusOptions}
                    value={selectedStatus}
                    onChange={(value) => setSelectedStatus(value || undefined)}
                  />
                </div>

                <div className="w-full max-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Time")}
                  </label>
                  <Select
                    allowClear
                    placeholder="Select time"
                    className="w-full cursor-pointer h-10"
                    options={timeOptions}
                    value={selectedTime}
                    onChange={(value) => setSelectedTime(value || undefined)}
                  />
                </div>



                {/* Clear All button */}
                <button
                  onClick={() => {
                    setSelectedStatus(undefined);
                    setSelectedTime(undefined);
                  }}
                  className="h-10  px-3 mt-6 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  {t("Clear All")}
                </button>
              </div>


            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Lead Details ({data?.all_data ?? 0})
            </h2>
            <div className="w-full max-w-[200px] flex items-center ">

              <Input
                allowClear
                placeholder="Enter CRM ID"
                size="large"
                value={search}
                onChange={e => setSearch(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400 h-5 w-5" />}
              />
            </div>

          </div>

          {isLoading ? (
            <div className="p-6 flex justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full"

                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">{t("№")}</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">{t("Conversations")}</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">{t("Total Minutes")}</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">{t("Status")}</th>
                      <th
                        onClick={toggleSort}
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer select-none flex items-center gap-1"
                      >
                        {t("Created At")}
                        <button>
                          <ArrowUpDown
                            className={`w-5 h-5 transition-transform duration-200 ${sortOrder === "asc" ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                      </th>

                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">{t("Assigned to")}</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">{t("Link")}</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">{t("AI Analysis")}</th>

                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.data?.map((lead: any, index: number) => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(currentPage - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {lead.number_of_success_calls ?? 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              {(lead.duration_of_all_calls ? lead.duration_of_all_calls / 60 : 0).toFixed(2)}
                            </span>

                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              lead.status_id
                            )}`}
                          >
                            {getStatusLabel(lead.status_id)}
                          </span>

                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">

                          <span className="text-sm font-medium text-gray-900">
                            {lead?.created_date ? dayjs(lead?.created_date).format("DD.MM.YYYY") : "-"}
                          </span>

                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            {lead?.operator?.photo ? (
                              <img
                                src={lead.operator.photo}
                                alt={lead.operator.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                {getInitials(lead?.operator?.name, lead?.operator?.last_name)}
                              </div>
                            )}
                            <div className="text-sm font-medium text-gray-900">
                              {lead?.operator?.name} {lead?.operator?.last_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="hover:bg-[#f3f4f6] hover:border-[#4338ca]"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "5px",
                              borderRadius: "6px",
                              border: "1px solid #4338ca",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              window.open(`https://b24-l2y8pg.bitrix24.kz/crm/lead/details/${lead.crm_id}/`, "_blank")
                            }}
                          >
                            <ArrowUpRight size={18} style={{ color: "#4338ca" }} />
                          </button>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">



                          {lead?.analysed ? (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedLead({ id: lead.id });
                                }}
                                className="flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-colors bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Eye className="w-4 h-4" />
                                <span className="text-xs">View</span>
                              </button>

                              <button
                                onClick={() => handleAnalyze(lead.crm_id)}
                                disabled={analyzingIds.includes(lead.crm_id)}
                                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-colors
                ${analyzingIds.includes(lead.crm_id) ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
                              >
                                {analyzingIds.includes(lead.crm_id) ? (
                                  <>
                                    <Spin size="small" />
                                    <span>Loading...</span>
                                  </>
                                ) : (
                                  <>
                                    <RefreshCcw className="w-4 h-4" />
                                    <span>Reanalyze</span>
                                  </>
                                )}
                              </button>

                              {/* Modal */}
                              {selectedLead?.id === lead.id && lead.status_id === "1" && (
                                <LeadAnalysisRejectedModal
                                  open={true}
                                  onClose={() => setSelectedLead(null)}
                                  lead_id={selectedLead?.id!}
                                />
                              )}
                              {selectedLead?.id === lead.id && lead.status_id === "UC_0JC627" && (
                                <LeadAnalysisThinkModal
                                  open={true}
                                  onClose={() => setSelectedLead(null)}
                                  lead_id={selectedLead?.id}
                                />
                              )}


                              {selectedLead?.id === lead.id && lead.status_id === "UC_5SK34Q" && (
                                <LeadAnalysisSendPayModal
                                  open={true}
                                  onClose={() => {
                                    setSelectedLead(null);
                                  }}
                                  lead_id={selectedLead?.id!}
                                />
                              )}

                            </div>
                          ) : (
                            <button
                              onClick={() => handleAnalyze(lead.crm_id)}
                              disabled={analyzingIds.includes(lead.crm_id)}
                              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-colors
            ${analyzingIds.includes(lead.crm_id) ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
                            >
                              {analyzingIds.includes(lead.crm_id) ? (
                                <>
                                  <Spin size="small" />
                                  <span>Loading...</span>
                                </>
                              ) : (
                                <>
                                  <Brain className="w-4 h-4" />
                                  <span>Analyze</span>
                                </>
                              )}
                            </button>
                          )}



                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ✅ Pagination */}
              <div className="p-4 flex justify-end">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={data?.all_data ?? 0}
                  showSizeChanger
                  defaultPageSize={20}
                  onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  }}
                />
              </div>
            </>
          )}
        </div>

      </div>
    </div>

  );
}
