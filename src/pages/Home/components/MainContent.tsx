import LogoIcon from "assets/icons/LogoIcon";
import { useTranslation } from "react-i18next";

export default function MainContent() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-6 mb-10">
        <div style={{ borderRadius: "480px", marginBottom: "24px" }}>
          <LogoIcon w={95} h={95} />
        </div>
        <p className="text-[#fff] text-[40px] w-[477px]  text-center ">
          {t("AvloAI – Intelligent Call Center Analytics")}
        </p>
        <p className="text-[#71727A] text-[16px] items-center w-[554px] text-center">
          {t("Transform call center data into actionable insights with the power of AI. Analyze, optimize, and enhance customer interactions like never before!")}
        </p>
      </div>
      <div>
        <p className="text-center text-[#71727A] text-[16px] mb-4">
          {t("Ask about:")}
        </p>
        <div>
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 h-10 flex items-center gap-1 rounded-[50px] border border-[#343436] text-[14px] text-white">
              {t("Сall center performance")}
            </button>
            <button className="px-4 py-2 h-10 flex items-center gap-1 rounded-[50px] border border-[#343436] text-[14px] text-white">
              {t("Agent efficiency")}
            </button>
            <button className="px-4 py-2 h-10 flex items-center gap-1 rounded-[50px] border border-[#343436] text-[14px] text-white">
              {t("Customer satisfaction")}
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-4 py-2 h-10 flex items-center gap-1 rounded-[50px] border border-[#343436] text-[14px] text-white">
              {t("Сustomer emotions")}
            </button>
            <button className="px-4 py-2 h-10 flex items-center gap-1 rounded-[50px] border border-[#343436] text-[14px] text-white">
              {t("Match voice with account")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
