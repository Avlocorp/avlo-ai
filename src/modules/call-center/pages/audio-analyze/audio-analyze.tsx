import ChatMain from "modules/AnalysisPage/pages/list";
import { useParams } from "react-router-dom";
import { useGetSingleAudioQuery } from "services/api/audios/audios.api";

const AudioAnalyze = () => {
  const { audioId } = useParams();
  const { data } = useGetSingleAudioQuery(audioId as string);

  return (
    <div>{data && <ChatMain data={data?.data?.[0]?.analysed_data} id={data?.data?.[0]?.id} />}</div>
  );
};

export default AudioAnalyze;
