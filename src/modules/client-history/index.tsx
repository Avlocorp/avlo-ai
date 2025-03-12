import { Timeline } from "antd";
import AudioFile from "assets/icons/mp3-icon.png";

const ClientsHistory = () => {
  return (
    <section className="p-6">
      <h1 className="text-3xl font-semibold text-white">Clients History</h1>
      <p className="mb-[100px]">Here we will show the history of clients</p>

      <Timeline
        items={[
          {
            dot: <img src={AudioFile} alt="" width={40} height={40} />,
            children: <p className="pl-5">Solve initial network problems</p>,
          },
          {
            dot: <img src={AudioFile} alt="" width={40} height={40} />,
            children: <p className="pl-5">Solve initial network problems</p>,
          },
          {
            dot: <img src={AudioFile} alt="" width={40} height={40} />,
            children: <p className="pl-5">Solve initial network problems</p>,
          },
          {
            dot: <img src={AudioFile} alt="" width={40} height={40} />,
            children: <p className="pl-5">Solve initial network problems</p>,
          },
        ]}
      />
    </section>
  );
};

export default ClientsHistory;
