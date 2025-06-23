import { useEffect, useState } from "react";
import { Modal, Table, Spin, Checkbox } from "antd";
import { Eye, X } from "lucide-react";
import {
    useGetCheckListQuery,
    useUpdateStatusMutation,
} from "services/api/qa-dashboard/qa-dshboard.api";
// import EditChecklist from "./edit-checklist";
import DeleteChecklist from "./delete-checklist";

interface ViewChecklistProps {
    checklistId?: number;
    statusId?: number;
    onChecklistUpdated?: () => void;
}


export default function ViewChecklist({ checklistId, statusId, onChecklistUpdated }: ViewChecklistProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCheckboxId, setActiveCheckboxId] = useState<number | null>(checklistId ?? null);
    const { data, isLoading, isError, refetch } = useGetCheckListQuery();

    const [updateStatus] = useUpdateStatusMutation();

    const openModal = () => {
        setIsModalOpen(true);
        refetch()
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {

        refetch();

    }, [refetch]);

    const handleCheckboxChange = async (id: number) => {
        if (!statusId) {
            console.error("statusId prop yo'q!");
            return;
        }

        setActiveCheckboxId(id);

        try {
            await updateStatus({
                statusId,
                checklist_id: id,
            }).unwrap();
            refetch(); // checklist ichidagi malumotni yangilash
            onChecklistUpdated?.(); // tashqi komponentga yangilanish haqida xabar berish
        } catch (error) {
            console.error("Statusni yangilashda xatolik:", error);
        }
    };


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Criteria Count",
            dataIndex: "criteria_count",
            key: "criteria_count",
        },
        {
            title: "Status",
            dataIndex: "status_id", // bu backenddagi status id bo'lishi kerak
            key: "status",
            render: (_: any, record: any) => (
                <Checkbox
                    checked={activeCheckboxId === record.id}
                    onChange={() => handleCheckboxChange(record.id)}
                />
            ),
        },
        {
            title: "Action",
            dataIndex: "created_at",
            key: "created_at",
            render: (_: any, record: any) => (
                <div className="flex items-center gap-2">
                    {/* <EditChecklist
                        checklist_id={record.id}
                        name={record.name}
                        description={record.description}
                        onUpdated={() => {
                            refetch();              // checklist ma’lumotlarini yangilash
                            onChecklistUpdated?.(); // parent komponentga xabar berish
                        }}
                    /> */}

                    <DeleteChecklist id={record.id} />
                </div>
            ),
        }

    ];


    return (
        <div>
            <button onClick={openModal}>
                <Eye stroke="green" />
            </button>

            <Modal
                title={null}
                footer={null}
                centered
                open={isModalOpen}
                onCancel={closeModal}
                width={800}
                className="checklist-modal"
                closeIcon={<X className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
                confirmLoading={isLoading}

            >
                <div className="px-6 pt-6 pb-3">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Checklist Table
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center py-10">
                            <Spin size="large" />
                        </div>
                    ) : isError ? (
                        <p className="text-red-500">Failed to load checklists.</p>
                    ) : (
                        <Table
                            dataSource={data?.data || []}
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                            bordered
                        />
                    )}
                </div>
            </Modal>
        </div>
    );
}
