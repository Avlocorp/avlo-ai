import { Button, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
    useCreateChechlistMutation,
    useCreateCriteriaMutation,
} from "services/api/qa-dashboard/qa-dshboard.api";


type CreateChecklistProps = {
    refetchChecklist: () => void;
};

export default function CreateChecklist({ refetchChecklist }: CreateChecklistProps) {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checklistName, setChecklistName] = useState("");
    const [checklistDescription, setChecklistDescription] = useState("");
    const [criteria, setCriteria] = useState<string[]>([]);

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
            alert("Checklist name is required");
            return;
        }

        try {
            // ✅ Checklistni yaratish
            const createdChecklist = await createChecklist({
                name: checklistName,
                description: checklistDescription,
            }).unwrap();

            const checklistId = createdChecklist.id;

            // ✅ Criteria larni yaratish
            const trimmedCriteria = criteria.map((c) => c.trim()).filter(Boolean);

            if (trimmedCriteria.length > 0) {
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
            alert("Error creating checklist and criteria");
        }
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-900 h-10 hover:bg-gray-800 border-gray-900 flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                <p>Create Checklist</p>
            </Button>

            <Modal
                title={null}
                open={isModalOpen}
                onCancel={closeEditModal}
                footer={null}
                width={600}
                className="checklist-modal"
                closeIcon={<X className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
            >
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">New Checklist</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Checklist Name
                            </label>
                            <Input
                                value={checklistName}
                                onChange={(e) => setChecklistName(e.target.value)}
                                placeholder="Enter checklist name"
                                size="large"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <TextArea
                                value={checklistDescription}
                                onChange={(e) => setChecklistDescription(e.target.value)}
                                placeholder="Enter description"
                                rows={4}
                                className="resize-none"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Criteria
                                </label>
                                <Button
                                    size="small"
                                    onClick={addCriterion}
                                    className="bg-gray-900 text-white border-gray-900 flex items-center gap-1 h-8"
                                >
                                    <Plus className="w-4 h-4" />
                                    <p>Add Criterion</p>
                                </Button>
                            </div>

                            {criteria.length === 0 ? (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                                    <p className="text-gray-500">
                                        No criteria added yet. Click "Add Criterion" to get started.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {criteria.map((criterion, index) => (
                                        <div key={index} className="flex items-center gap-3 py-2">
                                            <Input
                                                value={criterion}
                                                onChange={(e) => updateCriterion(index, e.target.value)}
                                                placeholder="Enter criterion text..."
                                                className="flex-1"
                                            />
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<Trash2 className="w-5 h-5" stroke="red" />}
                                                onClick={() => removeCriterion(index)}
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
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveChecklist}
                            loading={isLoading}
                            className="bg-gray-900 text-white border-gray-900 flex items-center h-8"
                        >
                            Save Checklist
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
