"use client"

import type React from "react"

import { useState } from "react"

import { AlertTriangle } from "lucide-react"
import { Settings } from "lucide-react"
import ChecklistTab from "./components/chech-list"
import ScriptTab from "./components/script-tabs"
import OffensiveWordsTab from "./components/offensive-word"
import SimpleAIChat from "components/simpleAIchat"

export default function SalesDashboard() {
    const [activeTab, setActiveTab] = useState("checklist")

    return (
        <div className="container mx-auto p-4 flex flex-col min-h-[calc(100vh-64px)]">
            <div className="flex border-b mb-6">
                <TabButton isActive={activeTab === "checklist"} onClick={() => setActiveTab("checklist")}>
                    Checklist
                </TabButton>
                <TabButton isActive={activeTab === "script"} onClick={() => setActiveTab("script")}>
                    Script
                </TabButton>
                <TabButton isActive={activeTab === "offensive-words"} onClick={() => setActiveTab("offensive-words")}>
                    <AlertTriangle className="w-4 h-4 mr-1" /> Offensive-Words Finder
                </TabButton>
                <div className="ml-auto flex items-center">
                    <select className="border rounded px-2 py-1 text-sm mr-2">
                        <option>All SDRs</option>
                    </select>
                    <button className="rounded-full p-2 hover:bg-gray-100">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                {activeTab === "checklist" && <ChecklistTab />}
                {activeTab === "script" && <ScriptTab />}
                {activeTab === "offensive-words" && <OffensiveWordsTab />}
            </div>
            <div className="mt-auto mb-4">
                <SimpleAIChat context="sdr" />
            </div>
        </div>
    )
}

function TabButton({
    children,
    isActive,
    onClick,
}: {
    children: React.ReactNode
    isActive: boolean
    onClick: () => void
}) {
    return (
        <button
            className={`flex items-center px-4 py-3 font-medium text-sm ${isActive ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"
                }`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
