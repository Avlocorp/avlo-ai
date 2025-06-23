import type React from "react";
import { Input, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDebounce } from "hooks";
import LeadsTable from "./leads-table";
import DealsTable from "./deals-table";
import { useTranslation } from "react-i18next";

const LeadsList: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("leads");

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 600);

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 ">
        <h1 className="text-3xl font-semibold text-white">
          {t("Call centre leads")}
        </h1>
      </div>

      <div className="mb-6 px-4 py-3 bg-[#343436] rounded-xl">
        <div className="flex justify-between">
          <Input
            placeholder={t("Search for leads/deals")}
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
                label: t("Leads"),
              },
              {
                key: "deals",
                label: t("Deals"),
              },
            ]}
          />
        </div>

        {activeTab === "leads" && <LeadsTable searchValue={debouncedValue} />}
        {activeTab === "deals" && <DealsTable searchValue={debouncedValue} />}
      </div>
    </div>
  );
};

export default LeadsList;
