export default function ChecklistTab() {
    const criteria = [
        { id: 1, text: "Does SDR say hello?", compliance: 95 },
        { id: 2, text: "Does SDR introduce themselves?", compliance: 88 },
        { id: 3, text: "Does SDR explain the purpose of the call?", compliance: 92 },
        { id: 4, text: "Does SDR ask for permission to continue?", compliance: 75 },
        { id: 5, text: "Does SDR handle objections properly?", compliance: 82 },
    ]

    return (
        <div className="p-6">
            <div className="flex justify-between font-medium text-gray-700 border-b pb-2 mb-4">
                <div>Criteria</div>
                <div>Compliance</div>
            </div>

            {criteria.map((item) => (
                <div key={item.id} className="flex justify-between py-3 border-b">
                    <div>{item.text}</div>
                    <div>
                        <span
                            className={`px-2 py-1 rounded-full text-sm ${item.compliance >= 90
                                ? "bg-green-100 text-green-800"
                                : item.compliance >= 80
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                        >
                            {item.compliance}%
                        </span>
                    </div>
                </div>
            ))}

        </div>
    )
}
