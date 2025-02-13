import { useState, useRef, useEffect } from "react";
import ArrowTopIcon from "../../assets/icons/ArrowTop";
import ChatLoaderIcon from "../../assets/icons/ChatLoader";
import PlayAudioIcon from "assets/icons/play_audio";
import PauseIcon from "assets/icons/pauseicon";
import PlayIcon from "assets/icons/playicon";
import { ACCESS_TOKEN_KEY } from "config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SearchInputMainProps {
  onSendMessage: (message: string, audio?: File | null) => void;
}

export default function SearchInputMain({
  onSendMessage,
}: SearchInputMainProps) {
  const hasToken = !!localStorage.getItem(ACCESS_TOKEN_KEY);

  const [inputMessage, setInputMessage] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (audioFile) {
      audioRef.current = new Audio(URL.createObjectURL(audioFile));
      audioRef.current.onended = () => setIsPlaying(false);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, [audioFile]);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setIsPlaying(false);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() || audioFile) {
      onSendMessage(inputMessage, audioFile);
      setInputMessage("");
      setAudioFile(null);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const AudioSize = audioFile?.size
    ? `${(audioFile.size / 1024 / 1024).toFixed(2)} MB`
    : "";
  const AudioName = audioFile?.name
    ? audioFile.name.replace(/.mp3|.wav|.flac|.aac|.wma/gi, "")
    : "";
  return (
    <div className="fixed bottom-[5%] left-[300px] right-0 flex flex-col justify-center items-center z-[5]">
      {audioFile && (
        <div className="w-full max-w-[686px]">
          <div className="p-[14px] w-full  max-w-[302px] mb-6 bg-[#2A2A2D] rounded-2xl  text-white flex items-center justify-between ">
            <div className="flex flex-col gap-1">
              <span className="text-white text-[14px]">{AudioName}</span>
              <span className="truncate max-w-[500px]">{AudioSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="">
                <PlayAudioIcon />
              </span>
              <button
                onClick={togglePlayPause}
                className=" bg-[#343436] rounded-full hover:bg-[#454548] transition-colors duration-200"
              >
                {isPlaying ? (
                  <span>
                    <PauseIcon />
                  </span>
                ) : (
                  <span>
                    <PlayIcon />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-[686px] px-4 py-3 bg-[#2A2A2D] rounded-2xl">
        <input
          type="text"
          placeholder={t("Send a message")}
          className="w-full bg-[#2A2A2D] mb-5 text-[14px] text-white border-none outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <div className="flex items-center h-10 justify-between">
          <div className="flex items-center gap-3">
            {hasToken ? (
              <label
                htmlFor="audio-upload"
                className="flex items-center gap-3 px-4 py-2 text-white border border-[#343436] rounded-md cursor-pointer hover:bg-[#343436] transition-colors duration-200"
              >
                <span className="text-[14px]">
                  {audioFile ? "Change audio" : "Select the source"}
                </span>
                <ChatLoaderIcon />
              </label>
            ) : (
              <Link to={"/login"}>
                <label
                  htmlFor="audio-upload"
                  className="flex items-center gap-3 px-4 py-2 text-white border border-[#343436] rounded-md cursor-pointer hover:bg-[#343436] transition-colors duration-200"
                >
                  <span className="text-[14px]">
                    {audioFile ? "Change audio" : "Select the source"}
                  </span>
                  <ChatLoaderIcon />
                </label>
              </Link>
            )}
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleAudioUpload}
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="flex items-center justify-center p-2 hover:bg-[#343436] rounded-full transition-colors duration-200"
          >
            <ArrowTopIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
