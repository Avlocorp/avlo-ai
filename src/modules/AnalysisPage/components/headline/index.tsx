
interface HeadLineProps {
    title: string
    data?: string
}

export default function HeadLine({ title, data }: HeadLineProps) {
    return (
        <div className="bg-[#2A2A2D] rounded-xl p-4 w-full">
            <div className="text-white text-[16px]">
                {title} {data}
            </div>
        </div>
    )
}

