import { useState } from "react";
import MainContent from "./components/MainContent";
import AnimatedLoader from "components/ui/loader/loader";
import ChatMain from "modules/AnalysisPage/pages/list";
import type { AIResponse } from "services/api/home/home.type";
import { useGetAIResponseMutation } from "services/api/home";
import SearchInputMain from "components/Serach";
import { useNavigate } from "react-router-dom";

export interface ErrorResponse {
  status: number;
  data: Data;
}

export interface Data {
  detail: string;
  code: string;
  messages: Message[];
}

export interface Message {
  token_class: string;
  token_type: string;
  message: string;
}

export default function Home() {
  const [getAIResponse, { isLoading }] = useGetAIResponseMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<AIResponse | null>(null);
  const navigate = useNavigate();

  const addMessage = async (newMessage: string, audio?: File | null) => {
    try {
      const response = await getAIResponse({
        message: newMessage,
        audio: audio || undefined,
      }).unwrap();
      setData(response);
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      if (errorResponse.status === 401) {
        navigate("/login");
      }

      setErrorMessage(
        "An error occurred while analyzing the call. Please try again."
      );
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div className="bg-[#1A1A1D] w-full flex h-[calc(100vh-78px)] flex-col">
      {isLoading ? (
        <div className="fixed inset-0 ml-[300px] flex justify-center items-center bg-black bg-opacity-50 z-50">
          <AnimatedLoader />
        </div>
      ) : data ? (
        <div className="flex-grow overflow-hidden">
          <ChatMain data={data} />
        </div>
      ) : (
        <div className=" ">
          <MainContent />
          <SearchInputMain onSendMessage={addMessage} />
        </div>
      )}
      {errorMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
