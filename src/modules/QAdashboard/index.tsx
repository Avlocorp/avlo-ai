import { Card, DatePicker, Select, ConfigProvider, theme as antdTheme } from "antd";
import { TrendingUp } from "lucide-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetOperatorListQuery } from "services/api/settings";
import { useGetAllCheckListQuery, useGetMetricsQuery } from "services/api/qa-dashboard/qa-dshboard.api";
import Language from "components/language";
import ChecklistModals from "./components/checklist-modal";
import { useTranslation } from "react-i18next";
import { useTheme } from "services/contexts/ThemeContext";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function QAdashboard() {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [selectedChecklistId, setSelectedChecklistId] = useState<number>();
    const [selectedOperatorId, setSelectedOperatorId] = useState<number>();
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
        dayjs("2025-04-17"),
        dayjs("2025-05-28")
    ]);

    const isDarkMode = theme === "dark";

    const { data: checklistData, isLoading: checklistLoading, error: checklistError } = useGetAllCheckListQuery({});
    const { data: operatorData, isLoading: operatorLoading, error: operatorError } = useGetOperatorListQuery({
        page: 1,
        per_page: 500,
        search: ""
    });

    useEffect(() => {
        if (checklistData?.data?.length && !selectedChecklistId) {
            setSelectedChecklistId(checklistData.data[0].id);
        }
    }, [checklistData, selectedChecklistId]);

    const { data: metricsData, isLoading: metricsLoading, error: metricsError } = useGetMetricsQuery(
        {
            checklist_id: selectedChecklistId!,
            start_date: dateRange[0].format('YYYY-MM-DD'),
            end_date: dateRange[1].format('YYYY-MM-DD'),
            ...(selectedOperatorId != null ? { operator_id: selectedOperatorId } : {}),
        },
        {
            skip: !selectedChecklistId,
            refetchOnMountOrArgChange: true
        }
    );

    // Theme configuration for Ant Design - consistent with BusinessDashboard
    const getThemeConfig = () => {
        if (isDarkMode) {
            return {
                algorithm: antdTheme.darkAlgorithm,
                token: {
                    colorPrimary: "#4338ca",
                    borderRadius: 8,
                    colorBgContainer: "#374151",
                    colorBgElevated: "#374151",
                    colorBgLayout: "#1f2937",
                    colorText: "#f3f4f6",
                    colorTextSecondary: "#9ca3af",
                    colorBorder: "#4b5563",
                },
            };
        }

        return {
            algorithm: antdTheme.defaultAlgorithm,
            token: {
                colorPrimary: "#4338ca",
                borderRadius: 8,
                colorBgContainer: "#ffffff",
                colorBgElevated: "#ffffff",
                colorBgLayout: "#f9fafb",
                colorText: "#111827",
                colorTextSecondary: "#6b7280",
                colorBorder: "#d1d5db",
            },
        };
    };

    // Main container styles
    const containerStyle = {
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#1f2937" : "#f9fafb",
        color: isDarkMode ? "#f3f4f6" : "#111827",
        padding: "20px 32px",
        transition: "background-color 0.3s, color 0.3s",
    };

    const headerTextStyle = {
        color: isDarkMode ? "#f3f4f6" : "#111827",
    };

    const subTextStyle = {
        color: isDarkMode ? "#9ca3af" : "#6b7280",
    };

    const cardStyle = {
        backgroundColor: isDarkMode ? "#374151" : "#ffffff",
        borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
        transition: "background-color 0.3s, border-color 0.3s",
    };

    if (checklistError || operatorError || metricsError) {
        return (
            <ConfigProvider theme={getThemeConfig()}>
                <div style={containerStyle}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "400px"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{
                                color: "#dc2626",
                                fontSize: "1.125rem",
                                marginBottom: "8px"
                            }}>
                                Error loading data
                            </div>
                            <p style={subTextStyle}>Please try refreshing the page</p>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        );
    }

    return (
        <ConfigProvider theme={getThemeConfig()}>
            <div style={containerStyle}>
                <div style={{ maxWidth: "none", margin: "0 auto" }}>
                    {/* Header */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "32px",
                        alignItems: "flex-start"
                    }}>
                        <div>
                            <h1 style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                marginBottom: "8px",
                                margin: 0,
                                ...headerTextStyle
                            }}>
                                {t("QA Checklist Management")}
                            </h1>
                            <p style={{
                                margin: 0,
                                ...subTextStyle
                            }}>
                                {t("Monitor sales call compliance and track performance across your team")}
                            </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

                            <Language />
                            <ChecklistModals />
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "32px",
                        gap: "16px",
                        padding: "16px 0"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "8px",
                            width: "33.333333%"
                        }}>
                            <span style={{
                                fontSize: "0.875rem",
                                textAlign: "start",
                                ...subTextStyle
                            }}>
                                {t("Date Range")}
                            </span>
                            <RangePicker
                                value={dateRange}
                                onChange={(dates) => {
                                    if (dates && dates[0] && dates[1]) {
                                        setDateRange([dates[0], dates[1]]);
                                    }
                                }}
                                format="MMM DD, YYYY"
                                style={{ width: "100%", height: "40px" }}
                            />
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            width: "33.333333%"
                        }}>
                            <span style={{
                                fontSize: "0.875rem",
                                ...subTextStyle
                            }}>
                                {t("SDR")}
                            </span>
                            <Select
                                allowClear
                                style={{ height: "40px" }}
                                showSearch
                                placeholder={t("Select a person")}
                                optionFilterProp="label"
                                value={selectedOperatorId}
                                onChange={(value) => setSelectedOperatorId(value)}
                                loading={operatorLoading}
                                options={operatorData?.data
                                    ?.filter((item) => (item.name || item.last_name))
                                    .map((item) => ({
                                        value: item.id,
                                        label: `${item.name ?? ""} ${item.last_name ?? ""}`.trim(),
                                    })) || []}
                            />
                        </div>
                    </div>

                    {/* Checklist Info & Select */}
                    <div style={{ marginBottom: "32px" }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "24px"
                        }}>
                            <div>
                                <h2 style={{
                                    fontSize: "1.25rem",
                                    fontWeight: "bold",
                                    marginBottom: "4px",
                                    margin: 0,
                                    ...headerTextStyle
                                }}>
                                    {checklistData?.data?.find((item) => item.id === selectedChecklistId)?.name || t("Checklist")}
                                </h2>
                                <p style={{
                                    fontSize: "0.875rem",
                                    margin: 0,
                                    ...subTextStyle
                                }}>
                                    {t("Description for selected checklist")}
                                </p>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                            }}>
                                <span style={{
                                    fontSize: "0.875rem",
                                    ...subTextStyle
                                }}>
                                    {t("Select Checklist")}
                                </span>
                                <Select
                                    showSearch
                                    style={{ width: "192px", height: "40px" }}
                                    placeholder={t("Select checklist")}
                                    value={selectedChecklistId}
                                    onChange={(value) => setSelectedChecklistId(value)}
                                    loading={checklistLoading}
                                >
                                    {checklistData?.data?.map((item) => (
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        {/* Summary Metrics Cards */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "24px",
                            marginBottom: "32px"
                        }}>
                            <Card style={cardStyle}>
                                <div style={{
                                    fontSize: "0.875rem",
                                    marginBottom: "8px",
                                    ...subTextStyle
                                }}>
                                    {t("Overall Compliance")}
                                </div>
                                <div style={{
                                    fontSize: "1.875rem",
                                    fontWeight: "bold",
                                    marginBottom: "8px",
                                    ...headerTextStyle
                                }}>
                                    {metricsData?.overall_compliance || '81%'}
                                </div>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    color: "#10b981",
                                    fontSize: "0.875rem"
                                }}>
                                    <TrendingUp size={16} style={{ marginRight: "4px" }} />
                                    {t("+4% from last month")}
                                </div>
                            </Card>

                            <Card style={cardStyle}>
                                <div style={{
                                    fontSize: "0.875rem",
                                    marginBottom: "8px",
                                    ...subTextStyle
                                }}>
                                    {t("Calls Analyzed")}
                                </div>
                                <div style={{
                                    fontSize: "1.875rem",
                                    fontWeight: "bold",
                                    marginBottom: "8px",
                                    ...headerTextStyle
                                }}>
                                    {metricsData?.total_calls || '156'}
                                </div>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    color: "#10b981",
                                    fontSize: "0.875rem"
                                }}>
                                    <TrendingUp size={16} style={{ marginRight: "4px" }} />
                                    {t("+23 from last week")}
                                </div>
                            </Card>

                            <Card style={cardStyle}>
                                <div style={{
                                    fontSize: "0.875rem",
                                    marginBottom: "8px",
                                    ...subTextStyle
                                }}>
                                    {t("Top Performing Criterion")}
                                </div>
                                <div style={{
                                    fontSize: "1.125rem",
                                    marginBottom: "4px",
                                    color: isDarkMode ? "#e5e7eb" : "#111827"
                                }}>
                                    {metricsData?.top_criterion?.name || t("SDR Introduction")}
                                </div>
                                <div style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: "#10b981"
                                }}>
                                    {metricsData?.top_criterion?.percentage || '92%'}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Detailed Metrics */}
                    <Card style={cardStyle}>
                        <div style={{ marginBottom: "24px" }}>
                            <h3 style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                marginBottom: "8px",
                                margin: 0,
                                ...headerTextStyle
                            }}>
                                {t("Compliance by Criterion")}
                            </h3>
                            <p style={{
                                margin: 0,
                                ...subTextStyle
                            }}>
                                {t("Performance breakdown for Discovery Call Checklist")}
                            </p>
                        </div>

                        {metricsLoading ? (
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "128px"
                            }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{
                                        width: "32px",
                                        height: "32px",
                                        border: "2px solid transparent",
                                        borderTop: "2px solid #4338ca",
                                        borderRadius: "50%",
                                        animation: "spin 1s linear infinite",
                                        margin: "0 auto 8px"
                                    }}></div>
                                    <p style={subTextStyle}>Loading metrics...</p>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                {metricsData?.criterias?.map((criteria, index) => {
                                    const positive = parseFloat(criteria.results.positive_percentage.toFixed(1));
                                    const negative = parseFloat(criteria.results.negative_percentage.toFixed(1));
                                    const neutral = parseFloat(criteria.results.neutral_percentage.toFixed(1));

                                    return (
                                        <div key={index}>
                                            <div style={{
                                                marginBottom: "8px",
                                                fontWeight: 600,
                                                fontSize: "16px",
                                                ...headerTextStyle
                                            }}>
                                                {criteria.text}
                                            </div>
                                            <div style={{
                                                position: "relative",
                                                height: "16px",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                                backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb"
                                            }}>
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        height: "100%",
                                                        backgroundColor: "#10b981",
                                                        transition: "all 0.3s",
                                                        width: `${positive}%`
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        height: "100%",
                                                        backgroundColor: "#ef4444",
                                                        transition: "all 0.3s",
                                                        left: `${positive}%`,
                                                        width: `${negative}%`
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        height: "100%",
                                                        backgroundColor: "#fbbf24",
                                                        transition: "all 0.3s",
                                                        left: `${positive + negative}%`,
                                                        width: `${neutral}%`
                                                    }}
                                                />
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                fontSize: "0.875rem",
                                                marginTop: "4px",
                                                width: "100%",
                                                ...subTextStyle
                                            }}>
                                                {positive > 0 && (
                                                    <span
                                                        style={{
                                                            color: "#10b981",
                                                            textAlign: "center",
                                                            width: `${positive}%`,
                                                            minWidth: "60px"
                                                        }}
                                                    >
                                                        {positive}% ({criteria.results.positive})
                                                    </span>
                                                )}
                                                {negative > 0 && (
                                                    <span
                                                        style={{
                                                            color: "#ef4444",
                                                            textAlign: "center",
                                                            width: `${negative}%`,
                                                            minWidth: "60px"
                                                        }}
                                                    >
                                                        {negative}% ({criteria.results.negative})
                                                    </span>
                                                )}
                                                {neutral > 0 && (
                                                    <span
                                                        style={{
                                                            color: "#fbbf24",
                                                            textAlign: "center",
                                                            width: `${neutral}%`,
                                                            minWidth: "60px"
                                                        }}
                                                    >
                                                        {neutral}% ({criteria.results.neutral})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </ConfigProvider>
    );
}