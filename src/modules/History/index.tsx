import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker, Pagination } from "antd";
import { formatDate } from "components/lib/utils";
import { useGetHistoryListQuery } from "services/api/history/history.api";
import CalendarIcon from "assets/icons/calendar";
import SearchIconPrimary from "assets/icons/search-lg";
import { Link } from "react-router-dom";

export default function History() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const defaultFrom = dayjs().subtract(1, "month").format("YYYY-MM-DD");
  const defaultUntil = dayjs().format("YYYY-MM-DD");

  const [search, setSearch] = useState("");
  const [from, setFrom] = useState<string | null>(defaultFrom);
  const [until, setUntil] = useState<string | null>(defaultUntil);

  const { data } = useGetHistoryListQuery({
    page,
    from: from || "",
    until: until || "",
    search,
  });

  const { RangePicker } = DatePicker;

  const handleDateRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    if (dates) {
      setFrom(dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : null);
      setUntil(dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : null);
    } else {
      setFrom(null);
      setUntil(null);
    }
  };

  if (!Array.isArray(data?.data)) {
    return <div className="text-white text-center p-4">No data available</div>;
  }

  return (
    <div className="bg-[#1A1A1D] w-full h-full">
      <div>
        <div className="mx-8">
          <div>
            <p className="text-[30px] text-white">History</p>
            <p className="text-base text-white">
              View your team's trades and transactions.
            </p>
          </div>
          <div className="my-6 flex items-center justify-between bg-[#343436] px-4 py-3 rounded-xl">
            <div className="flex items-center bg-[#1A1A1D] px-[14px] py-[10px] rounded-lg gap-2 w-[400px] text-[#84948D]">
              <SearchIconPrimary />
              <input
                type="text"
                className="bg-[#1A1A1D] w-full text-white outline-none"
                placeholder="Search for audios"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // ✅ Yangi qiymatni set qilish
              />
            </div>
            <div className="flex items-center gap-3">
              <RangePicker
                prefix={<CalendarIcon />}
                variant="borderless"
                suffixIcon={null}
                allowClear={false}
                separator={"-"}
                onChange={handleDateRangeChange}
                className="custom-range-picker py-[10px] px-4 bg-[#1A1A1D] text-sm text-white placeholder-white hover:bg-[#393941]"
                placeholder={["Jan 6, 2022", "Jan 13, 2022"]}
                format="YYYY-MM-DD"
                defaultValue={[dayjs(defaultFrom), dayjs(defaultUntil)]}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1D] w-full flex flex-col overflow-y-auto max-h-full px-8">
          <div className="grid grid-cols-2 gap-4">
            {data?.data?.map((item) => (
              <Link to={`/pm/call-center/audio/${item.audio_id}`}>
                <div
                  key={item.id}
                  className="rounded-[15px] flex flex-col gap-4 max-h-[120px] justify-between cursor-pointer w-full p-4 bg-[#343436]"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[#5B9BEC] text-[14px] font-bold">
                      {item.operator_name || item.operator_last_name
                        ? `${item.operator_name || ""} ${
                            item.operator_last_name || ""
                          }`.trim()
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
                    <span className="text-[#fff] text-[12px] font-semibold w-full text-end">
                      {item?.data?.overall_performance_score
                        ? item?.data?.overall_performance_score
                        : ""}{" "}
                      %
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-end items-center mt-6 mr-5">
            <Pagination
              current={page}
              total={data?.all_data || 0}
              pageSize={pageSize}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
              className="dark-pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
