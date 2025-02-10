import type React from "react"
import { useEffect, useState } from "react"
import RoutesWrapper from "./routes"
import "./App.css"


interface AnalysisData {
  // Add your analysis data type here
  [key: string]: any
}

const App: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)

  useEffect(() => {
    const storedData = sessionStorage.getItem("analysisData")
    if (storedData) {
      setAnalysisData(JSON.parse(storedData))
    }
  }, [])

  const updateAnalysisData = (newData: AnalysisData | null) => {
    setAnalysisData(newData)
    if (newData) {
      sessionStorage.setItem("analysisData", JSON.stringify(newData))
    } else {
      sessionStorage.removeItem("analysisData")
    }
  }



  return (
    <RoutesWrapper analysisData={analysisData} setAnalysisData={updateAnalysisData} />
  )
}

export default App

