import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AccountSettings from "modules/settings/components/account-settings";
import IntegrationsSettings from "modules/settings/components/integrations-settings";
import { useState } from "react";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Account",
  },
  {
    key: "2",
    label: "Integrations",
  },
];

const AccountSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <section>
      <div className="px-6">
        <div className="mb-6 py-4 px-6 bg-[#2a2a2d] rounded-xl">
          <Tabs
            defaultActiveKey={activeTab}
            items={items}
            onChange={setActiveTab}
            className="[&_.ant-tabs-tab-btn]:text-[#adbdb5] before:[&_.ant-tabs-nav]:border-[#1a1a1d]"
          />
        </div>

        {activeTab === "1" && <AccountSettings />}
        {activeTab === "2" && <IntegrationsSettings />}
      </div>
    </section>
  );
};

export default AccountSettingsPage;
