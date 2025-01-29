import type { ComponentType } from "react"

interface AgentDevelopmentCardProps {
    title?: string
    content?: string[]
    Icon?: ComponentType
}

export default function AgentDevelopmentCard({
    title = "Agentni Rivojlantirish Imkoniyatlari",
    content = [],
    Icon,
}: AgentDevelopmentCardProps) {
    return (
        <div className="bg-[#2A2A2D] rounded-xl p-4 min-h-[289px] w-full">
            <div className="flex items-center justify-start gap-2 mb-5">
                {Icon && <Icon />}
                <p className="text-white text-[16px]">{title}</p>
            </div>
            <div
                className="text-white text-sm"
                dangerouslySetInnerHTML={{
                    __html: content?.join("<br />") || "",
                }}
            />
        </div>
    )
}

