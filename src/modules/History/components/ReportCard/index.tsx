import { formatDate } from "components/lib/utils";
import { useGetHistoryListQuery } from "services/api/history/history.api";

export default function ReportCard() {
    const { data } = useGetHistoryListQuery({ page: 1 });

    if (!Array.isArray(data?.data)) {
        return <div className="text-white text-center p-4">No data available</div>;
    }
    //ism familya vaqt yaratilgan  overall_performance_score  || title
    return (
        <div className="bg-[#1A1A1D] w-full  grid overflow-y-auto max-h-full grid-cols-2 gap-3 px-8">
            {data.data.map((item) => (
                <div key={item.id} className="rounded-[15px] flex flex-col h-full justify-between cursor-pointer w-full  p-4 bg-[#343436] ">
                    <div className="flex justify-between items-center ">
                        <span className="text-[#5B9BEC] text-[14px] font-bold">
                            {item.operator_name || item.operator_last_name
                                ? `${item.operator_name || ""} ${item.operator_last_name || ""}`.trim()
                                : "No data"}

                        </span>
                        <span className="text-[#5B9BEC] text-[14px] font-bold">
                            {formatDate(item.created_at)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-[#fff] text-[12px] font-semibold">
                            {item?.data?.conversation_title || "No Title"}
                        </span>
                        <span className="text-[#fff] text-[12px] font-semibold w-full text-end" >
                            {item?.data?.overall_performance_score ? item?.data?.overall_performance_score : ""} %
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
