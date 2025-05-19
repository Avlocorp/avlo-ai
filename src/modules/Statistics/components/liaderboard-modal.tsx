

import { Image, Modal, Select } from "antd"
import { TrophyOutlined } from "@ant-design/icons"

interface LeaderboardUser {
    id: number
    name: string
    avatar: string
    initials?: string
    rate: number
    rank: number
}

interface LeaderboardModalProps {
    isOpen: boolean
    onClose: () => void
}

const leaderboardData: LeaderboardUser[] = [
    {
        id: 1,
        name: "Inna Petrova",
        avatar: "/placeholder.svg?height=40&width=40",
        rate: 37.5,
        rank: 1,
    },
    {
        id: 2,
        name: "Frank Williams",
        avatar: "",
        initials: "FW",
        rate: 33.3,
        rank: 2,
    },
    {
        id: 3,
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rate: 25.0,
        rank: 3,
    },
    {
        id: 4,
        name: "Grace Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rate: 25.0,
        rank: 4,
    },
    {
        id: 5,
        name: "Dana Lee",
        avatar: "",
        initials: "DL",
        rate: 16.7,
        rank: 5,
    },
    {
        id: 6,
        name: "Hector Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rate: 10.0,
        rank: 6,
    },
    {
        id: 7,
        name: "Carlos Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        rate: 9.1,
        rank: 7,
    },
    {
        id: 8,
        name: "Juan Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        rate: 8.3,
        rank: 8,
    },
    {
        id: 9,
        name: "Bekzod Tursunov",
        avatar: "/placeholder.svg?height=40&width=40",
        rate: 0.0,
        rank: 9,
    },
    {
        id: 10,
        name: "Elena Popova",
        avatar: "/placeholder.svg?height=40&width=40",
        rate: 0.0,
        rank: 10,
    },
]

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
    return (
        <Modal
            title={
                <div className="flex items-center gap-2">
                    <TrophyOutlined className="text-yellow-500" />
                    <span>Leaderboard</span>
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={400}
        >
            <div className="py-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                    <Select
                        defaultValue="win-rate"
                        className="w-full"
                        options={[
                            { value: "win-rate", label: "Win Rate" },
                            { value: "sql-rate", label: "SQL Rate" },
                            { value: "potential-value", label: "Potential Value" },
                            { value: "cac", label: "CAC Per Lead" },
                        ]}
                    />
                </div>

                <div className="space-y-2">
                    {leaderboardData.map((user) => (
                        <div
                            key={user.id}
                            className={`flex items-center p-3 rounded-lg border ${user.rank <= 3 ? "border-yellow-200 bg-yellow-50" : "border-gray-100"
                                }`}
                        >
                            <div className="w-8 h-8 flex items-center justify-center font-medium text-gray-500">{user.rank}</div>

                            {user.avatar ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={user.avatar || "/placeholder.svg"}
                                        alt={user.name}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                    {user.initials}
                                </div>
                            )}

                            <div className="ml-3 flex-grow">
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.rate.toFixed(1)}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}
