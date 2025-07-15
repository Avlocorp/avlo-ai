import { useEffect, useState } from "react";
import { Button, Input, Modal, ConfigProvider, theme as antdTheme } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Edit, Plus, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import {
    useCreateCriteriaMutation,
    useDeleteCriteriaMutation,
    useGetCriteriaListQuery,
    useUpdateChecklistMutation,
} from "services/api/qa-dashboard/qa-dshboard.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";
import { useTheme } from "services/contexts/ThemeContext";

interface EditChecklistProps {
    checklist_id?: number;
    name?: string;
    description?: string;
    onUpdated?: () => void;
}

interface Criterion {
    id: number;
    text: string;
    isNew?: boolean;
}

export default function EditChecklist({
    checklist_id,
    name,
    description,
    onUpdated,
}: EditChecklistProps) {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [checklistName, setChecklistName] = useState(name || "");
    const [checklistDescription, setChecklistDescription] = useState(description || "");
    const [criteria, setCriteria] = useState<Criterion[]>([]);

    const { data, isSuccess, refetch } = useGetCriteriaListQuery(
        checklist_id ? { checklist_id } : skipToken,
        {
            skip: !checklist_id,
        }
    );

    const [updateChecklist] = useUpdateChecklistMutation();
    const [deleteCriteria] = useDeleteCriteriaMutation();
    const [createCriteria] = useCreateCriteriaMutation();

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

    // Consolidated styles object
    const getStyles = () => {
        const isDark = theme === "dark";
        return {
            modalContent: {
                backgroundColor: isDark ? "#374151" : "#ffffff",
                color: isDark ? "#f3f4f6" : "#111827",
            },
            title: {
                color: isDark ? "#f3f4f6" : "#111827",
                margin: "0 0 24px 0",
                fontSize: "20px",
                fontWeight: 600,
            },
            label: {
                color: isDark ? "#f3f4f6" : "#374151",
                fontWeight: 500,
                marginBottom: "8px",
                display: "block",
            },
            emptyState: {
                backgroundColor: isDark ? "#1f2937" : "#f9fafb",
                border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
                color: isDark ? "#9ca3af" : "#6b7280",
                padding: "32px",
                textAlign: "center" as const,
                borderRadius: "8px",
            },
            criteriaContainer: {
                display: "flex",
                flexDirection: "column" as const,
                gap: "12px",
                maxHeight: "400px",
                overflowY: "auto" as const,
                paddingRight: "16px",
            },
            criterionRow: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 0",
            },
            primaryButton: {
                backgroundColor: isDark ? "#4338ca" : "#111827",
                borderColor: isDark ? "#4338ca" : "#111827",
                color: "#ffffff",
            },
            secondaryButton: {
                backgroundColor: "transparent",
                borderColor: isDark ? "#6b7280" : "#d1d5db",
                color: isDark ? "#f3f4f6" : "#374151",
            },
            footer: {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
            },
            spaceY: {
                display: "flex",
                flexDirection: "column" as const,
                gap: "24px",
            },
            editButton: {
                color: isDark ? "#9ca3af" : "#6b7280",
            },
            editButtonHover: isDark
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-400 hover:text-gray-600",
            closeIcon: isDark
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-400 hover:text-gray-600",
            deleteButtonHover: isDark
                ? "text-gray-300 hover:text-red-400"
                : "text-gray-400 hover:text-red-600",
        };
    };

    const styles = getStyles();

    useEffect(() => {
        if (isEditModalOpen && isSuccess && data) {
            setChecklistName(name || "");
            setChecklistDescription(description || "");
            setCriteria(
                data.data.map((item) => ({
                    id: item.id,
                    text: item.text,
                    isNew: false,
                }))
            );
            refetch();
        }
    }, [isEditModalOpen, isSuccess, data, name, description]);

    const openEditModal = () => setIsEditModalOpen(true);

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setChecklistName("");
        setChecklistDescription("");
        setCriteria([]);
    };

    const updateCriterion = (index: number, value: string) => {
        const updated = [...criteria];
        updated[index] = { ...updated[index], text: value };
        setCriteria(updated);
    };

    const removeCriterion = async (id: number) => {
        const item = criteria.find((c) => c.id === id);
        if (item?.isNew) {
            setCriteria((prev) => prev.filter((c) => c.id !== id));
            return;
        }
        try {
            await deleteCriteria({ criteria_id: id }).unwrap();
            setCriteria((prev) => prev.filter((c) => c.id !== id));
            toast.success(t("Criterion deleted successfully."));
            onUpdated?.();
        } catch (error) {
            console.error("Error deleting criterion:", error);
            toast.error(t("Failed to delete criterion."));
        }
    };

    const addCriterion = () => {
        setCriteria([...criteria, { id: Date.now(), text: "", isNew: true }]);
    };

    const handleSaveChecklist = async () => {
        if (!checklist_id) {
            toast.error(t("Checklist ID is missing."));
            return;
        }
        try {
            await updateChecklist({
                checklist_id,
                name: checklistName,
                description: checklistDescription,
            }).unwrap();

            for (const crit of criteria) {
                if (crit.isNew && crit.text.trim()) {
                    await createCriteria({ checklist_id, text: crit.text }).unwrap();
                }
            }

            toast.success(t("Checklist and criteria saved successfully!"));
            onUpdated?.();
            closeEditModal();
        } catch (error) {
            console.error("Error saving checklist and criteria:", error);
            toast.error(t("Failed to save checklist and criteria."));
        }
    };

    return (
        <ConfigProvider theme={getThemeConfig()}>
            <div>
                <Button
                    type="text"
                    size="large"
                    icon={<Edit stroke={styles.editButton.color} className="w-4 h-4" />}
                    onClick={openEditModal}
                    className={styles.editButtonHover}
                />

                <Modal
                    title={null}
                    open={isEditModalOpen}
                    onCancel={closeEditModal}
                    footer={null}
                    width={600}
                    closeIcon={<X className={`w-5 h-5 ${styles.closeIcon}`} />}
                    className="checklist-modal"
                    styles={{
                        content: styles.modalContent,
                        header: styles.modalContent,
                    }}
                >
                    <div className="p-6 overflow-auto" style={styles.modalContent}>
                        <h2 className="text-xl font-semibold mb-6" style={styles.title}>
                            {t("Edit Checklist")}
                        </h2>

                        <div className="space-y-6" style={styles.spaceY}>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={styles.label}>
                                    {t("Checklist Name")}
                                </label>
                                <Input
                                    value={checklistName}
                                    onChange={(e) => setChecklistName(e.target.value)}
                                    placeholder={t("Enter checklist name")}
                                    size="large"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={styles.label}>
                                    {t("Description")}
                                </label>
                                <TextArea
                                    value={checklistDescription}
                                    onChange={(e) => setChecklistDescription(e.target.value)}
                                    placeholder={t("Enter description")}
                                    rows={4}
                                    className="resize-none"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-sm font-medium" style={styles.label}>
                                        {t("Criteria")}
                                    </label>
                                    <Button
                                        size="small"
                                        onClick={addCriterion}
                                        className="flex items-center gap-1 h-8"
                                        style={styles.primaryButton}
                                    >
                                        <Plus className="w-4 h-4" />
                                        <p>{t("Add Criterion")}</p>
                                    </Button>
                                </div>

                                {criteria?.length === 0 ? (
                                    <div style={styles.emptyState}>
                                        <p style={{ margin: 0 }}>
                                            {t('No criteria added yet. Click "Add Criterion" to get started.')}
                                        </p>
                                    </div>
                                ) : (
                                    <div style={styles.criteriaContainer}>
                                        {criteria.map((criterion, index) => (
                                            <div
                                                key={`${criterion.id}-${index}`}
                                                style={styles.criterionRow}
                                            >
                                                <Input
                                                    value={criterion.text}
                                                    onChange={(e) => updateCriterion(index, e.target.value)}
                                                    placeholder={t("Enter criterion text...")}
                                                    style={{ flex: 1 }}
                                                    disabled={!criterion.isNew}
                                                />
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    icon={<Trash2 className="w-5 h-5" stroke="#ef4444" />}
                                                    onClick={() => removeCriterion(criterion.id)}
                                                    className={styles.deleteButtonHover}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={styles.footer}>
                            <Button
                                onClick={closeEditModal}
                                style={{ padding: "0 24px" }}
                            >
                                {t("Cancel")}
                            </Button>
                            <Button
                                type="primary"
                                onClick={handleSaveChecklist}
                                style={{
                                    ...styles.primaryButton,
                                    padding: "0 24px",
                                }}
                            >
                                {t("Save Checklist")}
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </ConfigProvider>
    );
}