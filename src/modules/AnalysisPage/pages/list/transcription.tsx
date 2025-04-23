import { Card } from "antd";
import { useTranslation } from "react-i18next";
import { Transcription } from "services/api/home/home.type";

export function TranscriptionView({
  transcription,
}: {
  transcription: Transcription;
}) {
  const { t } = useTranslation();

  if (!transcription) {
    return (
      <Card className="mx-12 mb-6 text-center bg-[#2a2a2d] text-gray-500">
        {t("Transcription not found")}
      </Card>
    );
  }

  return (
    <Card className="mx-12 mb-6 bg-[#2a2a2d]" title={t("Transcription")}>
      <div className="space-y-4">
        {transcription.map((entry, index) => (
          <div key={index} className="!mb-4 px-3 py-1 rounded-lg flex gap-3">
            <div className="flex-1">
              <div className="mt-1 text-sm">
                <strong className="text-base">
                  {entry.speaker === "customer" ? t("Mijoz") : t("Operator")}:
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
