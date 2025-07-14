import { Button, Input, Modal, ConfigProvider, theme as antdTheme } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useCreateChechlistMutation,
    useCreateCriteriaMutation,
} from "services/api/qa-dashboard/qa-dshboard.api";
import { useTheme } from "services/contexts/ThemeContext";

type CreateChecklistProps = {
    refetchChecklist: () => void;
};

export default function CreateChecklist({ refetchChecklist }: CreateChecklistProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checklistName, setChecklistName] = useState("");
    const [checklistDescription, setChecklistDescription] = useState("");
    const [criteria, setCriteria] = useState<string[]>([]);
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [createChecklist, { isLoading }] = useCreateChechlistMutation();
    const [createCriteria] = useCreateCriteriaMutation();

    const closeEditModal = () => {
        setIsModalOpen(false);
        setChecklistName("");
        setChecklistDescription("");
        setCriteria([]);
    };

    const addCriterion = () => {
        setCriteria([...criteria, ""]);
    };

    const updateCriterion = (index: number, value: string) => {
        const updated = [...criteria];
        updated[index] = value;
        setCriteria(updated);
    };

    const removeCriterion = (index: number) => {
        const updated = criteria.filter((_, i) => i !== index);
        setCriteria(updated);
    };

    const handleSaveChecklist = async () => {
        if (!checklistName.trim()) {
            alert(t("Checklist name is required"));
            return;
        }

        try {
            const createdChecklist = await createChecklist({
                name: checklistName,
                description: checklistDescription,
            }).unwrap();

            const checklistId = createdChecklist.id;

            const trimmedCriteria = criteria.map((c) => c.trim()).filter(Boolean);

            if (trimmedCriteria?.length > 0) {
                await Promise.all(
                    trimmedCriteria.map((text) =>
                        createCriteria({ checklist_id: checklistId, text })
                    )
                );
            }

            refetchChecklist();
            closeEditModal();
        } catch (err) {
            console.error("Failed to create checklist and criteria:", err);
            alert(t("Error creating checklist and criteria"));
        }
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
            modalContent: {
                backgroundColor: isDark ? "#374151" : "#ffffff",
                color: isDark ? "#f3f4f6" : "#111827",
            },
            title: {
                color: isDark ? "#f3f4f6" : "#111827",
            },
            label: {
                color: isDark ? "#d1d5db" : "#374151",
            },
            emptyState: {
                backgroundColor: isDark ? "#4b5563" : "#f9fafb",
                borderColor: isDark ? "#6b7280" : "#e5e7eb",
                color: isDark ? "#9ca3af" : "#6b7280",
            },
            border: {
                borderColor: isDark ? "#4b5563" : "#e5e7eb",
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

        };
    };

    const styles = getStyles();

    return (
        <ConfigProvider theme={getThemeConfig()}>
            <div>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                    className="h-10 flex items-center gap-2"
                    style={styles.primaryButton}
                >
                    <Plus className="w-4 h-4" />
                    <p>{t("Create Checklist")}</p>
                </Button>

                <Modal
                    title={null}
                    open={isModalOpen}
                    onCancel={closeEditModal}
                    footer={null}
                    width={600}
                    className="checklist-modal"
                    closeIcon={<X className="w-5 h-5" style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }} />}
                    styles={{
                        content: styles.modalContent,
                    }}
                >
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-6" style={styles.title}>
                            {t("New Checklist")}
                        </h2>

                        <div className="space-y-6">
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
                                    <div
                                        className="border rounded-lg p-8 text-center"
                                        style={{
                                            ...styles.emptyState,
                                            border: `1px solid ${styles.emptyState.borderColor}`,
                                        }}
                                    >
                                        <p style={{ color: styles.emptyState.color }}>
                                            {t('No criteria added yet. Click "Add Criterion" to get started.')}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {criteria.map((criterion, index) => (
                                            <div key={index} className="flex items-center gap-3 py-2">
                                                <Input
                                                    value={criterion}
                                                    onChange={(e) => updateCriterion(index, e.target.value)}
                                                    placeholder={t("Enter criterion text...")}
                                                    className="flex-1"
                                                />
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    icon={<Trash2 className="w-5 h-5" stroke="#ef4444" />}
                                                    onClick={() => removeCriterion(index)}
                                                    className="hover:bg-red-50 dark:hover:bg-red-900/20"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-end gap-3 mt-8 pt-6 border-t"
                            style={{ borderTopColor: styles.border.borderColor }}
                        >
                            <Button
                                onClick={closeEditModal}
                                className="px-6"
                                style={styles.secondaryButton}
                            >
                                {t("Cancel")}
                            </Button>
                            <Button
                                onClick={handleSaveChecklist}
                                loading={isLoading}
                                className="flex items-center h-8"
                                style={styles.primaryButton}
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