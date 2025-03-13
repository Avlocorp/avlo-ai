import { Button, Timeline } from "antd";
import AudioFile from "assets/icons/mp3-icon.png";
import { Cpu, Download, Eye } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useAnalyzeAudioMutation,
  useGetClientsByPhoneNumberQuery,
} from "services/api/audios/audios.api";

const ClientsHistory = () => {
  const params = useParams();

  const [analyzeAudios] = useAnalyzeAudioMutation();
  const { data } = useGetClientsByPhoneNumberQuery({
    phone: params.phone as string,
  });

  const history = useMemo(() => {
    return data?.data.map((item) => {
      return {
        dot: <img src={AudioFile} alt="" width={40} height={40} />,
        children: (
          <div className="flex gap-8 pl-5">
            <div className="w-[25%]">
              <h3>
                {item.operator.name} {item.operator.last_name}
              </h3>
              <p>{item.call_date}</p>
            </div>

            <div className="flex gap-3 items-center">
              <Link to={item.download_link} download>
                <Button
                  type="text"
                  icon={<Download />}
                  className={`hover:text-white hover:bg-zinc-800 !text-[#5B9BEC]`}
                />
              </Link>
              <Button
                icon={<Cpu />}
                type="text"
                className={item.analysed ? "text-[#4A554F]" : "text-[#5B9BEC]"}
                onClick={() => {
                  analyzeAudios(item.id.toString());
                }}
              ></Button>
              <Link
                to={item.analysed ? `/pm/call-center/audio/${item.id}` : ""}
              >
                <Eye color={item.analysed ? "#5B9BEC" : "#4A554F"} />
              </Link>
            </div>
          </div>
        ),
      };
    });
  }, [data]);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-semibold text-white">Clients History</h1>
      <p className="mb-[100px]">Here we will show the history of clients</p>

      <Timeline items={history} className="ml-6" />
    </section>
  );
};

export default ClientsHistory;
