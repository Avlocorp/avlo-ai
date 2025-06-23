
import type React from "react"

import { Settings } from "lucide-react"

interface SettingsButtonProps {
    onClick: () => void
    icon?: React.ReactNode
    className?: string
}

export default function SettingsButton({
    onClick,
    icon = <Settings className="w-4 h-4" />,
    className = "border-gray-200 hover:bg-gray-50",
}: SettingsButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center justify-center px-3 py-[6px] border rounded-md transition-colors ${className}`}
        >
            {icon}
        </button>
    )
}
