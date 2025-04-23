import ArrowClock from "assets/icons/arrow-clock";
import Dot from "assets/icons/Dot";
import { Cell, Pie, PieChart } from "recharts";
import Smile1 from "assets/icons/smile-1.1.svg";
import Smile2 from "assets/icons/smile-2.1.svg";
import Smile3 from "assets/icons/smile-3.1.svg";
import Smile4 from "assets/icons/smile-4.1.svg";
import { useTranslation } from "react-i18next";

export default function PieChartEmoji() {
  const { t } = useTranslation();
  const data = [
    { name: "Very Happy", value: 400, color: "#0DB319", emoji: Smile4 },
    { name: "Happy", value: 300, color: "#F9EA0B", emoji: Smile3 },
    { name: "Neutral", value: 200, color: "#F3A004", emoji: Smile2 },
    { name: "Unhappy", value: 100, color: "#FD4239", emoji: Smile1 },
  ];

  return (
    <div className="p-4 w-full bg-[#2A2A2D] rounded-xl text-white flex flex-col gap-8">
      <div className="flex justify-between">
        <p className="text-2xl">{t("Client’s emotions")}</p>
        <span className="text-[#F3A004] text-2xl">50%</span>
      </div>
      <div className="flex justify-center items-center relative">
        <div className="relative">
          <PieChart width={290} height={170}>
            {data.map((entry, index) => (
              <Pie
                key={index}
                data={[entry]}
                cx="50%"
                cy="100%"
                startAngle={index * 45}
                endAngle={(index + 1) * 45}
                innerRadius={90}
                outerRadius={145}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill={entry.color} stroke="none" />
              </Pie>
            ))}
          </PieChart>
          {/* Emojis */}
          {data.map((entry, index) => {
            const angle = (index * 45 + (index + 1) * 45) / 2; // Midpoint angle of each segment
            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * 118; // Adjust X for positioning
            const y = 150 - Math.sin(radian) * 110; // Adjust Y for positioning

            return (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: 30,
                  height: 30,
                  left: `${130 + x}px`,
                  top: `${y - 10}px`,
                }}
              >
                <img key={index} src={entry.emoji} alt={entry.name} />
              </div>
            );
          })}

          <div className="absolute left-[calc(50%-14px)] flex items-end justify-center top-[58px] rotate-[0deg] origin-[bottom_center]">
            <ArrowClock />
          </div>
          <div className="absolute inset-0 flex items-center justify-center top-[160px]">
            <Dot fill="#fff" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
