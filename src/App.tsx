import { Layout } from "antd"
import type React from "react"
import { useEffect, useState } from "react"
import Sidebar from "./components/layout/Sidebar"
import RoutesWrapper from "./routes"
import "./App.css"
import HeaderMain from "./components/layout/Header"

const { Content } = Layout

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

  const clearAnalysisData = () => {
    updateAnalysisData(null)
  }

  return (
    <Layout className="h-screen flex overflow-hidden">
      <Sidebar />
      <Layout className="flex-1">
        <HeaderMain onClearAnalysis={clearAnalysisData} />
        <Content className="overflow-auto min-h-[calc(100vh-78px)] bg-[#1A1A1D]">
          <RoutesWrapper analysisData={analysisData} setAnalysisData={updateAnalysisData} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App

