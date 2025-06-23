import { useState } from "react";
import { Modal, Input, Button, Select, message, Tabs, Pagination } from "antd";
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

const ChecklistModals = () => {
    const { t } = useTranslation();
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

    const tabItems = [
        {
            key: "pipeline-stages",
            label: (
                <span className="flex items-center gap-2 px-4">
                    <List className="w-4 h-4" /> {t("Pipeline Stages")}
                </span>
            ),
            children: (
                <div className="border rounded-md p-4 overflow-y-auto bg-white mt-3">
                    {isStatusLoading ? (
                        <div className="text-center text-gray-400">{t("Loading statuses...")}</div>
                    ) : statusData?.data?.length ? (
                        <>
                            {statusData.data.map((status) => (
                                <div
                                    key={status.id}
                                    className="mb-4 border p-3 rounded-md flex justify-between items-center"
                                >
                                    <div>
                                        <div className="text-base font-semibold text-gray-800">{status.name}</div>
                                        <div className="text-gray-500">
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
                        <div className="text-center text-gray-500">
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
                <div className="border rounded-md p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white mt-3">
                    {isChecklistLoading ? (
                        <div>{t("Loading checklists...")}</div>
                    ) : checklistData?.data?.length ? (
                        checklistData.data.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-xl font-semibold text-gray-800">{item.name}</div>
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
                                <p className="text-gray-500 text-sm">{item.description}</p>
                                <div className="mt-2 flex justify-between">
                                    <div>{t("Criteria")}</div>
                                    <div className="flex items-center rounded-lg bg-gray-100 p-2 h-[22px]">
                                        {item.criteria_count} {t("items")}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">{t("No checklists available.")}</div>
                    )}
                </div>
            ),
        },
    ];

    return (
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
                        tabBarStyle={{ padding: "0 24px", background: "white" }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ChecklistModals;
