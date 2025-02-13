import ShareIcon from "assets/icons/ShareIcon";
import { useTranslation } from "react-i18next";

interface ShareButtonProps {
  className?: string;
}

const ShareButton = (props: ShareButtonProps) => {
  const { className } = props;
  const { t } = useTranslation();
  return (
    <div className="relative">
      <button
        className={`px-4 py-2 bg-[#2A2A2D] items-center flex border border-[#343436] gap-2 rounded-full hover:bg-[#3A3A3D] transition-colors duration-200 ${className || ""
          }`}
        aria-label="Share or Invite"
      >
        <ShareIcon />
        <span className="text-white text-sm font-medium">{t("Invite")}</span>
      </button>
    </div>
  );
};

export default ShareButton;
