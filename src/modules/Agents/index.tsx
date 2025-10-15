import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "services/contexts/ThemeContext"
import { ArrowUpDown, ArrowUpRight, Brain, Clock, Eye, Filter, Phone, RefreshCcw, Users } from "lucide-react"
import { useGetOperatorListQuery } from "services/api/settings"
import { Select, Spin, Pagination, Input } from "antd";
import { useGetLeadsListNewQuery, useLazyGetLeadAnalysisQuery } from "services/api/leads/leads.api"
import dayjs from "dayjs";
import LeadAnalysisRejectedModal from "./components/rejected-view/rejected-modal-detail"
import LeadAnalysisThinkModal from "./components/think-view/think-modal-detail"
import LeadAnalysisSendPayModal from "./components/send-pay-view/sendPay-modal-detail"
import { SearchOutlined } from "@ant-design/icons";
const AgentsDashboard = () => {
    const { t } = useTranslation()
    const { theme } = useTheme()

    // ✅ Filter states
    const [selectedAgent, setSelectedAgent] = useState<string | number | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    // Pagination states

    const [selectedLead, setSelectedLead] = useState<{ id: number } | null>(null);

    // ✅ Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)

    // ✅ Operatorlar ro'yxati
    const {
        data: operatorsResponse,
        isLoading: operatorsLoading,
    } = useGetOperatorListQuery({
        per_page: 500,
        search: "",
        sort: "name"
    });
    const operators = operatorsResponse?.data ?? [];

    // ✅ Date range function
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



    const { from, until } = getDateRange(selectedTime);

    // ✅ Leads API chaqiruv

    // Search state
    const [search, setSearch] = useState<string>("");

    // sort state
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const toggleSort = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    }


    interface OptionType {
        label: string;
        value: "yes" | "no";
    }

    const aiAnalysisOptions: OptionType[] = [
        { label: "Analyze", value: "no" },
        { label: "Analyzed", value: "yes" },
    ];

    const [selectedAIAnalysis, setSelectedAIAnalysis] = useState<"yes" | "no" | undefined>(undefined);

    const { data, isLoading, refetch } = useGetLeadsListNewQuery({
        page: currentPage,
        limit: pageSize,
        operator_id: selectedAgent && selectedAgent !== "all" ? selectedAgent : undefined,
        status_id: selectedStatus,
        from,
        search,
        until,
        field: "created_date",
        sort: sortOrder === "asc" ? "created_date" : "-created_date",
        analysed: selectedAIAnalysis, // endi "yes" yoki "no" ketadi
    });

    // Lazy analyze trigger
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







    // ✅ Dropdown options
    const agentOptions = [
        { label: t("All Agents"), value: "all" },
        ...operators.map((op: any) => {
            const fullName = [op?.name, op?.last_name].filter(Boolean).join(" ");
            return {
                label: fullName,
                value: op?.id,
            };
        }),
    ];



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





    function getInitials(name?: string, lastName?: string) {
        if (!name && !lastName) return "?";
        return `${name?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
    }

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb" }}
        >
            {/* Header */}
            <div
                className="shadow-sm border-b"
                style={{
                    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
                    borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb"
                }}
            >
                <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="py-6">
                            <h1
                                className="text-2xl font-bold"
                                style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
                            >
                                {t("Call Center Analytics")}
                            </h1>
                            <p
                                className=" text-sm"
                                style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
                            >
                                {t("Monitor and analyze your sales team performance")}
                            </p>
                        </div>
                    </div>
                    {/* <Language /> */}
                </div>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border mb-8 p-6">
                    <div className="flex items-center space-x-2 mb-6">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-900">{t("Filters")}</h2>
                    </div>




                    <div className="flex items-center gap-3 w-[90%]">
                        <div className="w-full max-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("Agent")}
                            </label>
                            <Select
                                showSearch
                                allowClear
                                placeholder="Select agent"
                                className="w-full cursor-pointer h-10"
                                notFoundContent={operatorsLoading ? <Spin size="small" /> : null}
                                options={agentOptions}
                                optionFilterProp="label"
                                value={selectedAgent}
                                onChange={(value) => setSelectedAgent(value || undefined)}
                            />
                        </div>

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
                        <div className="w-full max-w-[200px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("AI Analysis")}
                            </label>
                            <Select
                                allowClear
                                placeholder="Select AI Analysis"
                                className="w-full cursor-pointer h-10"
                                options={aiAnalysisOptions}
                                value={selectedAIAnalysis}
                                onChange={(value) => setSelectedAIAnalysis(value || undefined)}
                            />
                        </div>


                        {/* Clear All button */}
                        <button
                            onClick={() => {
                                setSelectedAgent(undefined);
                                setSelectedStatus(undefined);
                                setSelectedTime(undefined);
                                setSelectedAIAnalysis(undefined);
                            }}
                            className="h-10  px-3 mt-6 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                            {t("Clear All")}
                        </button>
                    </div>


                </div>

                {/* Table */}
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
    )
}

export default AgentsDashboard
