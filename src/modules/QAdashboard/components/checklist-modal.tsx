import { useState } from "react";
import { Modal, Input, Button, Select, message, Tabs, Pagination, ConfigProvider, theme as antdTheme } from "antd";
import { Grid, List, Search, Settings, X } from "lucide-react";
import {
    useGetCheckListQuery,
    useGetStatusListQuery,
    useUpdateStatusMutation,
} from "services/api/qa-dashboard/qa-dshboard.api";
import { useDebounce } from "hooks";
import CreateChecklist from "./create-checklist";
import EditChecklist from "./edit-checklist";
import DeleteChecklist from "./delete-checklist";
import { useTranslation } from "react-i18next";
import { useTheme } from "services/contexts/ThemeContext";

const ChecklistModals = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [activeTab, setActiveTab] = useState("pipeline-stages");
    const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const debouncedSearch = useDebounce(searchValue, 500);

    const { data: checklistData, isLoading: isChecklistLoading, refetch: refetchChecklist } = useGetCheckListQuery();

    const { data: statusData, isLoading: isStatusLoading, refetch } = useGetStatusListQuery({
        search: debouncedSearch,
        page: currentPage,
        per_page: pageSize,
    });

    const [updateStatus] = useUpdateStatusMutation();

    const handleChecklistChange = async (checklist_id: number, statusId: number) => {
        setUpdatingStatusId(statusId);
        try {
            await updateStatus({ checklist_id, statusId }).unwrap();
            message.success(t("Checklist successfully updated!"));
            refetch();
        } catch {
            message.error(t("Failed to update checklist."));
        } finally {
            setUpdatingStatusId(null);
        }
    };

    const openModal = () => setIsManageModalOpen(true);
    const closeModal = () => {
        setIsManageModalOpen(false);
        setSearchValue("");
    };

    // Theme configuration for Ant Design
    const getThemeConfig = () => {
        if (theme === "dark") {
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

    // Dynamic styles based on theme
    const getStyles = () => {
        const isDark = theme === "dark";
        return {
            tabContent: {
                backgroundColor: isDark ? "#374151" : "#ffffff",
                color: isDark ? "#f3f4f6" : "#111827",
            },
            statusCard: {
                backgroundColor: isDark ? "#4b5563" : "#ffffff",
                borderColor: isDark ? "#6b7280" : "#d1d5db",
                color: isDark ? "#f3f4f6" : "#111827",
            },
            checklistCard: {
                backgroundColor: isDark ? "#4b5563" : "#ffffff",
                borderColor: isDark ? "#6b7280" : "#d1d5db",
                color: isDark ? "#f3f4f6" : "#111827",
                boxShadow: isDark
                    ? "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            },
            loadingText: {
                color: isDark ? "#9ca3af" : "#6b7280",
            },
            emptyText: {
                color: isDark ? "#9ca3af" : "#6b7280",
            },
            description: {
                color: isDark ? "#9ca3af" : "#6b7280",
            },
            criteriaBox: {
                backgroundColor: isDark ? "#6b7280" : "#f3f4f6",
                color: isDark ? "#f3f4f6" : "#111827",
            },
        };
    };

    const styles = getStyles();

    const tabItems = [
        {
            key: "pipeline-stages",
            label: (
                <span className="flex items-center gap-2 px-4">
                    <List className="w-4 h-4" /> {t("Pipeline Stages")}
                </span>
            ),
            children: (
                <div className="border rounded-md p-4 overflow-y-auto mt-3" style={styles.tabContent}>
                    {isStatusLoading ? (
                        <div className="text-center" style={styles.loadingText}>
                            {t("Loading statuses...")}
                        </div>
                    ) : statusData?.data?.length ? (
                        <>
                            {statusData.data.map((status) => (
                                <div
                                    key={status.id}
                                    className="mb-4 border p-3 rounded-md flex justify-between items-center"
                                    style={styles.statusCard}
                                >
                                    <div>
                                        <div className="text-base font-semibold" style={{ color: styles.statusCard.color }}>
                                            {status.name}
                                        </div>
                                        <div style={styles.description}>
                                            {t("Assigned to")}: {status.description}
                                        </div>
                                    </div>
                                    <Select
                                        className="min-w-[200px]"
                                        placeholder={t("Select Checklist")}
                                        loading={isChecklistLoading || updatingStatusId === status.id}
                                        value={status.checklist_id || undefined}
                                        options={checklistData?.data?.map((c) => ({
                                            label: c.name,
                                            value: c.id,
                                        }))}
                                        onChange={(val) => handleChecklistChange(val, status.id)}
                                    />
                                </div>
                            ))}

                            <div className="flex justify-center mt-4">
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={statusData.all_data}
                                    onChange={(page, pageSize) => {
                                        setCurrentPage(page);
                                        setPageSize(pageSize);
                                    }}
                                    showSizeChanger
                                />
                            </div>
                        </>
                    ) : (
                        <div className="text-center" style={styles.emptyText}>
                            {t("No checklists found. Please create a new one.")}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "checklists",
            label: (
                <span className="flex items-center gap-2 px-4">
                    <Grid className="w-4 h-4" /> {t("Checklists")}
                </span>
            ),
            children: (
                <div className="border rounded-md p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-3" style={styles.tabContent}>
                    {isChecklistLoading ? (
                        <div style={styles.loadingText}>{t("Loading checklists...")}</div>
                    ) : checklistData?.data?.length ? (
                        checklistData.data.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-lg p-6 hover:shadow-md transition"
                                style={{
                                    ...styles.checklistCard,
                                    border: `1px solid ${styles.checklistCard.borderColor}`,
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-xl font-semibold" style={{ color: styles.checklistCard.color }}>
                                        {item.name}
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <EditChecklist
                                            checklist_id={item.id}
                                            name={item.name}
                                            description={item.description}
                                            onUpdated={refetchChecklist}
                                        />
                                        <DeleteChecklist id={item.id} />
                                    </div>
                                </div>
                                <p className="text-sm" style={styles.description}>
                                    {item.description}
                                </p>
                                <div className="mt-2 flex justify-between">
                                    <div style={{ color: styles.checklistCard.color }}>{t("Criteria")}</div>
                                    <div className="flex items-center rounded-lg p-2 h-[22px]" style={styles.criteriaBox}>
                                        {item.criteria_count} {t("items")}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center" style={styles.emptyText}>
                            {t("No checklists available.")}
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <ConfigProvider theme={getThemeConfig()}>
            <div>
                <Button
                    icon={<Settings className="w-4 h-4" />}
                    onClick={openModal}
                    className="flex items-center gap-2"
                >
                    {t("Manage Checklists")}
                </Button>

                <Modal
                    title={t("Manage Checklists")}
                    open={isManageModalOpen}
                    onCancel={closeModal}
                    centered
                    footer={null}
                    width={1000}
                    closeIcon={<X className="w-6 h-6 text-gray-400" />}
                >
                    <div className="p-4">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <Input
                                placeholder={t("Search checklists...")}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                prefix={<Search className="w-4 h-4 text-gray-400" />}
                                className="w-full h-10"
                                size="large"
                            />
                            <CreateChecklist refetchChecklist={refetchChecklist} />
                        </div>

                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            items={tabItems}
                            size="large"
                            tabBarStyle={{
                                padding: "0 24px",
                                background: theme === "dark" ? "#374151" : "white",
                                color: theme === "dark" ? "#f3f4f6" : "#111827"
                            }}
                        />
                    </div>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default ChecklistModals;