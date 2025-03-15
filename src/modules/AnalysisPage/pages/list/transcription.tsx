import { Card } from "antd";
import { Transcription } from "services/api/home/home.type";

export function TranscriptionView({
  transcription,
}: {
  transcription: Transcription;
}) {
  if (!transcription) {
    return (
      <Card className="mx-12 mb-6 text-center bg-[#2a2a2d] text-gray-500">
        Transcription not found
      </Card>
    );
  }

  return (
    <Card className="mx-12 mb-6 bg-[#2a2a2d]" title="Transcription">
      <div className="space-y-4">
        {transcription.map((entry, index) => (
          <div key={index} className="!mb-4 px-3 py-1 rounded-lg flex gap-3">
            <div className="flex-1">
              <div className="mt-1 text-sm">
                <strong className="text-base">
                  {entry.speaker === "customer" ? "Mijoz" : "Operator"}:
                </strong>{" "}
                {entry.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
