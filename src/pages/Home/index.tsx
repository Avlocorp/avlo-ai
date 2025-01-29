import { useState, useEffect } from "react"
import MainContent from "./components/MainContent"
import AnimatedLoader from "components/ui/loader/loader"
import ChatMain from "modules/AnalysisPage/pages/list"
import type { HomeProps, AIResponse } from "services/api/home/home.type"
import { useGetAIResponseMutation } from "services/api/home"
import SearchInputMain from "components/Serach"

interface HomePropsWithAnalysis extends HomeProps {
    analysisData?: AIResponse | null
    setAnalysisData?: (data: AIResponse | null) => void
}

export default function Home({ analysisData, setAnalysisData }: HomePropsWithAnalysis) {
    const [getAIResponse, { isLoading }] = useGetAIResponseMutation()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (analysisData) {
            setAnalysisData && setAnalysisData(analysisData)
        }
    }, [analysisData, setAnalysisData])

    const addMessage = async (newMessage: string, audio?: File | null) => {
        try {
            const response = await getAIResponse({ message: newMessage, audio: audio || undefined }).unwrap()
            setAnalysisData && setAnalysisData(response)
        } catch (error) {
            setErrorMessage("An error occurred while analyzing the call. Please try again.")
            setTimeout(() => setErrorMessage(null), 5000)
        }
    }

    return (
        <div className="bg-[#1A1A1D] w-full flex h-[calc(100vh-78px)] flex-col">
            {isLoading ? (
                <div className="fixed inset-0 ml-[300px] flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <AnimatedLoader />
                </div>
            ) : analysisData ? (
                <div className="flex-grow overflow-hidden">
                    <ChatMain data={analysisData} />
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
    )
}

