
import type React from "react"
import { useRef, useState, useEffect } from "react"
import { ArrowUpRight, Download, Pause, Play } from "lucide-react"

interface AudioPlayerCellProps {
    downloadLink: string
    name: string
    leadId: string
    isDarkMode: boolean
    iconButtonStyle: React.CSSProperties
    onDownload: (url: string, filename: string) => void
}

export function AudioPlayerCell({
    downloadLink,
    name,
    leadId,
    isDarkMode,
    iconButtonStyle,
    onDownload,
}: AudioPlayerCellProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const togglePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return
        audioRef.current.currentTime = Number(e.target.value)
    }



    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const setAudioDuration = () => setDuration(audio.duration)

        audio.addEventListener("timeupdate", updateTime)
        audio.addEventListener("loadedmetadata", setAudioDuration)

        return () => {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", setAudioDuration)
        }
    }, [])

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <audio
                ref={audioRef}
                src={downloadLink}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                preload="metadata"
            />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                    onClick={togglePlay}
                    style={{
                        ...iconButtonStyle,
                        backgroundColor: isDarkMode ? "#4b5563" : "#f3f4f6",
                    }}
                >
                    {isPlaying ? <Pause size={16} style={{ color: "#4338ca" }} /> : <Play size={16} style={{ color: "#4338ca" }} />}
                </button>

                <span style={{ fontSize: "12px", color: isDarkMode ? "#e5e7eb" : "#374151" }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    style={{ flex: 1 }}
                />

                <button
                    onClick={() => onDownload(downloadLink, `${name}_${leadId}.mp3`)}
                    style={{
                        ...iconButtonStyle,
                        backgroundColor: isDarkMode ? "#4b5563" : "#f3f4f6",
                    }}
                >
                    <Download size={16} style={{ color: "#4338ca" }} />
                </button>
                <button
                    style={{
                        ...iconButtonStyle,
                        backgroundColor: isDarkMode ? "#4b5563" : "#f3f4f6",
                    }}
                    onClick={() => {
                        window.open(`https://b24-l2y8pg.bitrix24.kz/crm/lead/details/${leadId}/`, "_blank")
                    }}
                >
                    <ArrowUpRight size={18} style={{ color: "#4338ca" }} />
                </button>
            </div>


        </div>
    )
}
