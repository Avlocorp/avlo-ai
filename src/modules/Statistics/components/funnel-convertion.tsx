export default function FunnelConversion() {
    const stages = [
        { name: "Prospecting", percentage: 15 },
        { name: "Qualifying", percentage: 65 },
        { name: "Demo", percentage: 45 },
        { name: "Proposal", percentage: 25 },
        { name: "Negotiation", percentage: 0 },
        { name: "Closed", percentage: 0 },
    ]

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Funnel Conversion</h3>

            <div className="space-y-3">
                {stages.map((stage) => (
                    <div key={stage.name} className="flex items-center">
                        <div className="w-24 text-sm text-gray-600">{stage.name}</div>
                        <div className="flex-grow">
                            <div className="relative h-6">
                                <div className="absolute inset-0 bg-gray-100"></div>
                                <div className="absolute inset-y-0 left-0 bg-blue-500" style={{ width: `${stage.percentage}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <div>0%</div>
                    <div>50%</div>
                    <div>100%</div>
                </div>
            </div>
        </div>
    )
}
