import { Button, Popconfirm, PopconfirmProps, message } from "antd";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();

    const confirm: PopconfirmProps["onConfirm"] = async () => {
        try {
            await deleteChecklist({ checklist_id: id }).unwrap();
            refetch();
            toast.success(t("Checklist successfully deleted"));
        } catch (err: any) {
            const errorMessage =
                typeof err?.data.error === "string"
                    ? err?.data.error
                    : t("Failed to delete checklist");

            toast.error(errorMessage);
        }
    };

    const cancel: PopconfirmProps["onCancel"] = () => {
        message.info(t("Delete cancelled"));
    };

    return (
        <Popconfirm
            title={t("Delete the checklist")}
            description={t("Are you sure to delete this checklist?")}
            onConfirm={confirm}
            onCancel={cancel}
            okText={t("Yes")}
            cancelText={t("No")}
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
