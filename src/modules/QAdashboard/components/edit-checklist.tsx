import { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
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
        <div>
            <Button
                type="text"
                size="large"
                icon={<Edit stroke="#000" className="w-4 h-4" />}
                onClick={openEditModal}
                className="text-gray-400 hover:text-gray-600"
            />

            <Modal
                title={null}
                open={isEditModalOpen}
                onCancel={closeEditModal}
                footer={null}
                width={600}
                closeIcon={<X className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
                className="checklist-modal"
            >
                <div className="p-6 overflow-auto">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t("Edit Checklist")}</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                <label className="block text-sm font-medium text-gray-700">
                                    {t("Criteria")}
                                </label>
                                <Button
                                    size="small"
                                    onClick={addCriterion}
                                    className="bg-gray-900 text-white border-gray-900 flex items-center gap-1 h-8"
                                >
                                    <Plus className="w-4 h-4" />
                                    <p>{t("Add Criterion")}</p>
                                </Button>
                            </div>

                            {criteria.length === 0 ? (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                                    <p className="text-gray-500">
                                        {t('No criteria added yet. Click "Add Criterion" to get started.')}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-4">
                                    {criteria.map((criterion, index) => (
                                        <div
                                            key={`${criterion.id}-${index}`}
                                            className="flex items-center gap-3 py-2"
                                        >
                                            <Input
                                                value={criterion.text}
                                                onChange={(e) => updateCriterion(index, e.target.value)}
                                                placeholder={t("Enter criterion text...")}
                                                className="flex-1"
                                                disabled={!criterion.isNew}
                                            />
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<Trash2 className="w-5 h-5" stroke="red" />}
                                                onClick={() => removeCriterion(criterion.id)}
                                                className="text-gray-400 hover:text-red-600"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <Button onClick={closeEditModal} className="px-6">
                            {t("Cancel")}
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleSaveChecklist}
                            className="bg-gray-900 hover:bg-gray-800 border-gray-900 px-6"
                        >
                            {t("Save Checklist")}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
