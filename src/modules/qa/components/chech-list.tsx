import { useTranslation } from 'react-i18next';

export default function ChecklistTab() {
    const criteria = [
        { id: 1, text: "Does SDR say hello?", compliance: 95 },
        { id: 2, text: "Does SDR introduce themselves?", compliance: 88 },
        { id: 3, text: "Does SDR explain the purpose of the call?", compliance: 92 },
        { id: 4, text: "Does SDR ask for permission to continue?", compliance: 75 },
        { id: 5, text: "Does SDR handle objections properly?", compliance: 82 },
    ];
    const { t } = useTranslation()
    return (
        <div className="p-6  bg-gray-50 dark:bg-[#374151]">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800">
                                    {t("Criteria")}
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800">
                                    {t("Compliance")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {criteria.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                        {item.text}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.compliance >= 90
                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                : item.compliance >= 80
                                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                }`}
                                        >
                                            {item.compliance}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}