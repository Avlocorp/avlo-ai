import { Pagination } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetClientsByPhoneNumberQuery } from "services/api/audios/audios.api";

const CallsList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data } = useGetClientsByPhoneNumberQuery({ page: page });

  const phoneNumbers = data?.data || {};
  const phoneNumbersArr = Object.keys(data?.data || {});

  return (
    <div className="bg-[#1A1A1D] w-full h-full">
      <div className="mb-6 mx-8">
        <p className="text-[30px] text-white">Calls</p>
        <p className="text-base text-white">View your team's calls.</p>
      </div>

      <div className="bg-[#1A1A1D] w-full flex flex-col overflow-y-auto max-h-full px-8">
        <div className="grid grid-cols-2 gap-4">
          {phoneNumbersArr?.map((phone) => (
            <Link
              key={phone}
              to={`/pm/call-center/audio/${phoneNumbers[phone].all_calls}`}
            >
              <div className="rounded-[15px] flex flex-col gap-4 max-h-[120px] justify-between cursor-pointer w-full p-4 bg-[#343436]">
                <div className="flex justify-between items-center">
                  <span className="text-[#5B9BEC] text-[14px] font-bold">
                    {phone}
                  </span>
                  <span className="text-[#5B9BEC] text-[14px] font-bold">
                    {phoneNumbers[phone].all_calls}
                  </span>
                </div>
                {/* <div className="flex justify-between items-center gap-4">
                  <span className="text-[#fff] text-[12px] font-semibold">
                    {item?.data?.conversation_title || "No Title"}
                  </span>
                  <span className="text-[#fff] text-[12px] font-semibold w-full text-end">
                    {item?.data?.overall_performance_score
                      ? item?.data?.overall_performance_score
                      : ""}{" "}
                    %
                  </span>
                </div> */}
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
  );
};

export default CallsList;
