import { Button, Switch } from "antd";
import BitrixIcon from "assets/images/bitrix.jpg";
import AmoCRMImg from "assets/images/amoCRM.png";
import { useState } from "react";
import BitrixIntegrationModal from "./bitrix-integration-modal";
import BitrixAddAccountModal from "./add-accaount";
import { useGetSettingResponseMutation } from "services/api/settings";

const IntegrationsSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddAcc, setIsModalAddAccOpen] = useState(false);
  const [getSettingResponse] = useGetSettingResponseMutation();
  const handleAddAccount = async (values: { url: string }) => {

    try {
      const response = await getSettingResponse({ url: values.url }).unwrap();
      if (response?.sso_url) {
        window.open(response.sso_url, "_blank");
      }
    } catch (err) {
      console.error("Xatolik:", err);
    }

    setIsModalAddAccOpen(false);
  };

  const handleIntegrate = (values: unknown) => {
    console.log("Integration values:", values);
    setIsModalOpen(false);
  };
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <ul className="grid grid-cols-3 gap-6">
      <li className="bg-[#343436] rounded-xl">
        <div>
          <div className="p-6 border-b border-[#1a1a1d]">
            <div className="mb-6 flex items-center gap-3">
              <img
                src={BitrixIcon}
                alt=""
                width={84}
                height={52}
                className="rounded-lg"
              />
              <h4 className="text-white">Bitrix24</h4>
              <Switch
                defaultChecked
                onChange={onChange}
                className="ml-auto bg-[#ccd5df]"
              />
            </div>
            <p className="text-[#F0F4F2]">
              Streamline software projects, sprints, and bug tracking.
            </p>
          </div>
          <div className="py-4 flex justify-between">
            <Button
              type="text"
              className="text-[#5b9bec] font-semibold text-sm hover:!text-white hover:!bg-transparent"
              onClick={() => setIsModalAddAccOpen(true)}
            >
              Add account
            </Button>
            <BitrixAddAccountModal
              isOpen={isModalAddAcc}
              onClose={() => setIsModalAddAccOpen(false)}
              onIntegrate={handleAddAccount}
            />
            <Button
              type="text"
              className="text-[#5b9bec] font-semibold text-sm hover:!text-white hover:!bg-transparent"
              onClick={() => setIsModalOpen(true)}
            >
              View integration
            </Button>

            <BitrixIntegrationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onIntegrate={handleIntegrate}
            />
          </div>
        </div>
      </li>
      <li className="bg-[#343436] rounded-xl">
        <div>
          <div className="p-6 border-b border-[#1a1a1d]">
            <div className="mb-6 flex items-center gap-3">
              <img
                src={AmoCRMImg}
                alt=""
                width={84}
                height={52}
                className="w-[84px] h-[52px] rounded-lg object-cover"
              />
              <h4 className="text-white">AmoCRM</h4>
              <Switch
                defaultChecked
                onChange={onChange}
                className="ml-auto bg-[#ccd5df]"
              />
            </div>
            <p className="text-[#F0F4F2]">
              Link pull requests and automate workflows.
            </p>
          </div>
          <div className="py-4 flex justify-end">
            <Button
              type="text"
              className="text-[#5b9bec] font-semibold text-sm hover:!text-white hover:!bg-transparent"
            >
              View integration
            </Button>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default IntegrationsSettings;
