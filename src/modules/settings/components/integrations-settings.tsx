import { Switch } from "antd";
import BitrixIcon from "assets/images/bitrix.jpg";
import AmoCRMImg from "assets/images/amoCRM.png";

const IntegrationsSettings = () => {
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
          <p className="py-4 px-6 text-right text-[#5b9bec] font-semibold text-sm">
            View integration
          </p>
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
              <h4 className="text-white">Bitrix24</h4>
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
          <p className="py-4 px-6 text-right text-[#5b9bec] font-semibold text-sm">
            View integration
          </p>
        </div>
      </li>
    </ul>
  );
};

export default IntegrationsSettings;
