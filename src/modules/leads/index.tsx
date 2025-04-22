import type React from "react";
import { Input, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetDealsListQuery,
  useGetLeadsListQuery,
} from "services/api/leads/leads.api";
import { useDebounce } from "hooks";
import LeadsTable from "./leads-table";
import DealsTable from "./deals-table";

const LeadsList: React.FC = () => {
  const perPage = 50;
  const [activeTab, setActiveTab] = useState("leads");
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 600);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: String(page) }); // URLga yangi sahifani saqlash
  };

  const { data, isLoading, isFetching } = useGetLeadsListQuery({
    page: currentPage,
    search: debouncedValue,
  });
  const {
    data: deals,
    isLoading: dealsLoading,
    isFetching: dealsFetching,
  } = useGetDealsListQuery({
    page: currentPage,
    search: debouncedValue,
  });

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white">Call centre leads</h1>
      </div>

      <div className="mb-6 px-4 py-3 bg-[#343436] rounded-xl">
        <div className="flex justify-between">
          <Input
            placeholder="Search for members"
            prefix={
              <SearchOutlined className="[&_svg]:w-6 [&_svg]:h-6 text-zinc-400" />
            }
            className="w-[400px] h-11 bg-zinc-900 border-zinc-800 text-white placeholder-zinc-400"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-[#343436]">
        <div className="p-4 border-b border-zinc-800">
          <Tabs
            defaultActiveKey="leads"
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: "leads",
                label: "Leads",
              },
              {
                key: "deals",
                label: "Deals",
              },
            ]}
          />
        </div>

        {activeTab === "leads" && (
          <LeadsTable
            currentPage={currentPage}
            data={data || []}
            handlePageChange={handlePageChange}
            isFetching={isFetching}
            isLoading={isLoading}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {activeTab === "deals" && (
          <DealsTable
            currentPage={currentPage}
            data={deals || []}
            handlePageChange={handlePageChange}
            isFetching={dealsFetching}
            isLoading={dealsLoading}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default LeadsList;
