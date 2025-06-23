import { Button, Popconfirm, PopconfirmProps, message } from "antd";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
    useDeleteChecklistMutation,
    useGetCheckListQuery,
} from "services/api/qa-dashboard/qa-dshboard.api";

interface DeleteChecklistProps {
    id: number;
}

export default function DeleteChecklist({ id }: DeleteChecklistProps) {
    const [deleteChecklist, { isLoading }] = useDeleteChecklistMutation();
    const { refetch } = useGetCheckListQuery();

    const confirm: PopconfirmProps["onConfirm"] = async () => {
        try {
            await deleteChecklist({ checklist_id: id }).unwrap();
            refetch();
            toast.success("Checklist successfully deleted");
        } catch (err: any) {
            console.log(err?.data.error);
            const errorMessage =
                typeof err?.data.error === "string"
                    ? err?.data.error
                    : "Failed to delete checklist";

            toast.error(errorMessage);
        }
    };

    const cancel: PopconfirmProps["onCancel"] = () => {
        message.info("Delete cancelled");
    };

    return (
        <Popconfirm
            title="Delete the checklist"
            description="Are you sure to delete this checklist?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button
                type="text"
                size="large"
                icon={<Trash2 stroke="red" className="w-4 h-4" />}
                loading={isLoading}
                className="text-gray-400 hover:text-red-600"
            />
        </Popconfirm>
    );
}
