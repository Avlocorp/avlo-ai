import { Card, DatePicker, Select } from "antd";
import { TrendingUp } from "lucide-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetOperatorListQuery } from "services/api/settings";
import { useGetAllCheckListQuery, useGetMetricsQuery } from "services/api/qa-dashboard/qa-dshboard.api";
import Language from "components/language";
import ChecklistModals from "./components/checklist-modal";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function QAdashboard() {
    const { t } = useTranslation();
    const [selectedChecklistId, setSelectedChecklistId] = useState<number>();
    const [selectedOperatorId, setSelectedOperatorId] = useState<number>();

    const { data: checklistData } = useGetAllCheckListQuery({});
    const { data: operatorData } = useGetOperatorListQuery({ page: 1, per_page: 500, search: "" });

    useEffect(() => {
        if (checklistData?.data?.length && !selectedChecklistId) {
            setSelectedChecklistId(checklistData.data[0].id);
        }
    }, [checklistData, selectedChecklistId]);

    const { data: metricsData } = useGetMetricsQuery(
        {
            checklist_id: selectedChecklistId!,
            ...(selectedOperatorId != null ? { operator_id: selectedOperatorId } : {}),
        },
        { skip: !selectedChecklistId }
    );

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-5">
            <div className="mx-auto">
                {/* Header */}
                <div className="flex justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("QA Checklist Management")}</h1>
                        <p className="text-gray-600">
                            {t("Monitor sales call compliance and track performance across your team")}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Language />
                        <ChecklistModals />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center mb-8 gap-4 py-4">
                    <div className="flex flex-col items-start gap-2 w-1/3">
                        <span className="text-gray-700 text-sm text-start">{t("Date Range")}</span>
                        <RangePicker
                            defaultValue={[dayjs("2025-04-17"), dayjs("2025-05-28")]}
                            format="MMM DD, YYYY"
                            className="w-full h-10"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-1/3">
                        <span className="text-gray-700 text-sm">{t("SDR")}</span>
                        <Select
                            allowClear
                            className="h-10"
                            showSearch
                            placeholder={t("Select a person")}
                            optionFilterProp="label"
                            value={selectedOperatorId}
                            onChange={(value) => setSelectedOperatorId(value)}
                            options={operatorData?.data
                                ?.filter((item) => item.name || item.last_name)
                                .map((item) => ({
                                    value: item.id,
                                    label: `${item.name ?? ""} ${item.last_name ?? ""}`.trim(),
                                })) || []}
                        />
                    </div>
                </div>

                {/* Checklist Info & Select */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                                {checklistData?.data.find((item) => item.id === selectedChecklistId)?.name || t("Checklist")}
                            </h2>
                            <p className="text-gray-600 text-sm">{t("Description for selected checklist")}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-gray-700 text-sm">{t("Select Checklist")}</span>
                            <Select
                                showSearch
                                className="w-48 h-10"
                                placeholder={t("Select checklist")}
                                value={selectedChecklistId}
                                onChange={(value) => setSelectedChecklistId(value)}
                            >
                                {checklistData?.data?.map((item) => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* Summary Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="text-start">
                            <div className="text-gray-600 text-sm mb-2">{t("Overall Compliance")}</div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">81%</div>
                            <div className="flex items-center justify-start text-green-600 text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" /> {t("+4% from last month")}
                            </div>
                        </Card>

                        <Card className="text-start">
                            <div className="text-gray-600 text-sm mb-2">{t("Calls Analyzed")}</div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">156</div>
                            <div className="flex items-center justify-start text-green-600 text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" /> {t("+23 from last week")}
                            </div>
                        </Card>

                        <Card className="text-start">
                            <div className="text-gray-600 text-sm mb-2">{t("Top Performing Criterion")}</div>
                            <div className="text-lg mb-1">{t("SDR Introduction")}</div>
                            <div className="text-2xl font-bold text-green-600">92%</div>
                        </Card>
                    </div>
                </div>

                {/* Detailed Metrics */}
                <Card>
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("Compliance by Criterion")}</h3>
                        <p className="text-gray-600">{t("Performance breakdown for Discovery Call Checklist")}</p>
                    </div>

                    <div className="space-y-6">
                        {metricsData?.criterias?.map((criteria, index) => {
                            const positive = parseFloat(criteria.results.positive_percentage.toFixed(1));
                            const negative = parseFloat(criteria.results.negative_percentage.toFixed(1));
                            const neutral = parseFloat(criteria.results.neutral_percentage.toFixed(1));
                            return (
                                <div key={index}>
                                    <div className="mb-2 text-gray-900 font-semibold text-[16px]">{criteria.text}</div>
                                    <div className="relative h-4 rounded-lg bg-gray-200 overflow-hidden">
                                        <div className="absolute top-0 left-0 h-full bg-green-600" style={{ width: `${positive}%` }} />
                                        <div className="absolute top-0 h-full bg-[#ef4444]" style={{ left: `${positive}%`, width: `${negative}%` }} />
                                        <div className="absolute top-0 h-full bg-yellow-400" style={{ left: `${positive + negative}%`, width: `${neutral}%` }} />
                                    </div>
                                    <div className="flex text-sm text-gray-700 mt-1 w-full">
                                        {positive > 0 && (
                                            <span className="text-green-600 text-center" style={{ width: `${positive}%`, minWidth: "60px" }}>
                                                {positive}% ({criteria.results.positive})
                                            </span>
                                        )}
                                        {negative > 0 && (
                                            <span className="text-red-600 text-center" style={{ width: `${negative}%`, minWidth: "60px" }}>
                                                {negative}% ({criteria.results.negative})
                                            </span>
                                        )}
                                        {neutral > 0 && (
                                            <span className="text-yellow-500 text-center" style={{ width: `${neutral}%`, minWidth: "60px" }}>
                                                {neutral}% ({criteria.results.neutral})
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </div>
    );
}
