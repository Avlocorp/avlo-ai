import { Layout } from "antd";
// import QuestionIcon from "assets/icons/questionIcon";
// import PlusIcon from "assets/icons/PlusIcon";
// import ShareButton from "components/ui/button/shareBtn";
import { useState } from "react";
// import { useTranslation } from "react-i18next";
import i18next from "services/i18n";
import { storage } from "services";

const { Header } = Layout;

const HeaderMain = () => {
  const [language, setLanguage] = useState(storage.get("i18nextLng") || "uz");
  // const { t } = useTranslation();
  return (
    <Header className="sticky bg-[#1A1A1D] px-6 h-[78px] flex justify-end items-center top-0 z-10">
      <div className="flex items-center gap-4">
        {/* <button className="px-4 py-2 bg-[#2A2A2D] flex items-center justify-center border border-[#343436] gap-2 rounded-full hover:bg-[#3A3A3D] transition-colors duration-200">
          <PlusIcon />
          <span className="text-white text-sm font-medium">
            {t("New chat")}
          </span>
        </button> */}
        {/* <button className="px-4 py-2 bg-[#2A2A2D] flex items-center justify-center border border-[#343436] gap-2 rounded-full hover:bg-[#3A3A3D] transition-colors duration-200">
          <QuestionIcon />
          <span className="text-white text-sm font-medium">{t("Help")}</span>
        </button> */}
        <select
          className="px-4 mr-5 py-2 bg-[#2A2A2D] flex items-center justify-center border border-[#343436] gap-2 rounded-full hover:bg-[#3A3A3D] transition-colors duration-200 text-white text-sm font-medium appearance-none cursor-pointer"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            i18next.changeLanguage(e.target.value);
          }}
        >
          <option value="en">English</option>
          <option value="uz">O‘zbek</option>
          <option value="ru">Russian</option>
          <option value="tj">Тоҷикӣ</option>
        </select>
        {/* <ShareButton className="px-4 py-2 bg-[#2A2A2D] flex items-center justify-center border border-[#343436] gap-2 rounded-full hover:bg-[#3A3A3D] transition-colors duration-200 text-white text-sm font-medium" /> */}
      </div>
    </Header>
  );
};

export default HeaderMain;
