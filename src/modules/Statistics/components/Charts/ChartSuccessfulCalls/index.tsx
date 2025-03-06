import Dot from "assets/icons/Dot";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart } from "recharts";

export default function SuccessfulCallsPieChart({
  successfull,
  failed,
}: {
  successfull: number;
  failed: number;
}) {
  const { t } = useTranslation();

  const total = successfull + failed;
  const successfulAngle = total === 0 ? 0 : (successfull / total) * 360;
  const failedAngle = total === 0 ? 0 : (failed / total) * 360;

  const successfulPercentage =
    total === 0 ? 0 : ((successfull / total) * 100).toFixed(1);
  const failedPercentage =
    total === 0 ? 0 : ((failed / total) * 100).toFixed(1);

  const data1 = [{ name: t("Segment 1"), value: successfull }];

  const data2 = [{ name: t("Segment 2"), value: failed }];

  return (
    <div className="w-full bg-[#2A2A2D] p-4 rounded-lg flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-white">{t("Successful calls")}</p>
      </div>
      <div className="flex justify-center items-center">
        <PieChart width={210} height={220}>
          <Pie
            data={data1}
            cx="50%"
            cy="50%"
            startAngle={0}
            endAngle={successfulAngle}
            innerRadius={50}
            outerRadius={105}
            dataKey="value"
          >
            <Cell fill="#34C759" stroke="none" />
          </Pie>

          <Pie
            data={data2}
            cx="50%"
            cy="50%"
            startAngle={successfulAngle}
            endAngle={successfulAngle + failedAngle}
            innerRadius={50}
            outerRadius={105}
            dataKey="value"
          >
            <Cell fill="#FFA900" stroke="none" />
          </Pie>
        </PieChart>
      </div>
      <div className="flex  justify-between">
        <div className="flex flex-col gap-6 justify-between items-start ">
          <button className="flex items-center gap-2 py-[2px] px-2 bg-[rgba(52,199,89,0.1)] rounded-lg">
            <Dot fill="#34C759" />
            <p className="text-[#34C759] text-[12px]">{t("Successful")}</p>
          </button>
          <button className="flex items-center gap-2 py-[2px] px-2 bg-[rgba(255,149,0,0.1)] rounded-lg">
            <Dot fill="#FF9500" />
            <p className="text-[#FF9500] text-[12px]">{t("Failed")}</p>
          </button>
        </div>
        <div className="flex flex-col gap-6 justify-between items-start ">
          <p className="text-[14px]">{successfull}</p>
          <p className="text-[14px]">{failed}</p>
        </div>
        <div className="flex flex-col gap-6 justify-between items-start ">
          <p className="text-[14px]">{successfulPercentage}%</p>

          <p className="text-[14px]">{failedPercentage}%</p>
        </div>
      </div>
    </div>
  );
}
