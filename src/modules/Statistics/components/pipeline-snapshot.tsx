

import { useRef, useState } from "react"
import { Maximize2, Minimize2 } from "lucide-react"

export default function PipelineSnapshot() {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const stages = [
        {
            name: "Prospecting",
            count: 2,
            value: "32,339",
            leads: 2,
        },
        {
            name: "Qualifying",
            count: 4,
            value: "115,072",
            leads: 4,
        },
        {
            name: "Demo",
            count: 3,
            value: "8,960",
            leads: 3,
        },
    ]

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (containerRef.current?.requestFullscreen) {
                containerRef.current
                    .requestFullscreen()
                    .then(() => setIsFullscreen(true))
                    .catch((err) => console.error(`Error attempting to enable fullscreen: ${err.message}`))
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document
                    .exitFullscreen()
                    .then(() => setIsFullscreen(false))
                    .catch((err) => console.error(`Error attempting to exit fullscreen: ${err.message}`))
            }
        }
    }

    // Listen for fullscreen change events
    if (typeof document !== "undefined") {
        document.addEventListener("fullscreenchange", () => {
            setIsFullscreen(!!document.fullscreenElement)
        })
    }

    return (
        <div
            ref={containerRef}
            className={`bg-white rounded-lg shadow-sm p-6 ${isFullscreen ? "w-full h-full flex flex-col" : ""}`}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Pipeline Snapshot</h3>
                <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                    {isFullscreen ? (
                        <Minimize2 className="w-5 h-5 text-gray-600" />
                    ) : (
                        <Maximize2 className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>

            <div
                className={`grid ${isFullscreen ? "grid-cols-4 gap-6" : "grid-cols-3 gap-4"} ${isFullscreen ? "flex-grow" : ""}`}
            >
                {stages.map((stage) => (
                    <div
                        key={stage.name}
                        className={`border rounded-lg p-4 ${isFullscreen ? "flex flex-col justify-between" : ""}`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className={`font-medium ${isFullscreen ? "text-lg" : ""}`}>{stage.name}</div>
                            <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{stage.count}</div>
                        </div>

                        <div className="text-sm text-gray-500 mb-1">Total Value</div>
                        <div className={`${isFullscreen ? "text-2xl" : "text-xl"} font-bold mb-1`}>${stage.value}</div>
                        <div className="text-sm text-gray-500">{stage.leads} leads</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
