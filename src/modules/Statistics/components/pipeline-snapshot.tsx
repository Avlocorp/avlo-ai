export default function PipelineSnapshot() {
    const stages = [
        {
            name: "Prospecting",
            count: 2,
            value: "$32,339",
            leads: 2,
        },
        {
            name: "Qualifying",
            count: 4,
            value: "$115,072",
            leads: 4,
        },
        {
            name: "Demo",
            count: 3,
            value: "$8,960",
            leads: 3,
        },
    ]

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Pipeline Snapshot</h3>

            <div className="grid grid-cols-3 gap-4">
                {stages.map((stage) => (
                    <div key={stage.name} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">{stage.name}</div>
                            <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{stage.count}</div>
                        </div>

                        <div className="text-sm text-gray-500 mb-1">Total Value</div>
                        <div className="text-xl font-bold mb-1">${stage.value}</div>
                        <div className="text-sm text-gray-500">{stage.leads} leads</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
