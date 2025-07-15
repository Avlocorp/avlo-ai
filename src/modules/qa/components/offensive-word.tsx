import { useState } from "react"
import { Search, Filter, User, Users, Mic } from "lucide-react"
import { ChevronDown } from "lucide-react"

export default function OffensiveWordsTab() {
    const [showResults, setShowResults] = useState(false)
    const [dateRange, setDateRange] = useState("Apr 19, 2025 - May 19, 2025")
    const [speaker, setSpeaker] = useState("All")

    return (
        <div className="p-6  bg-gray-50 dark:bg-[#374151] ">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Date Range Filter */}
                    <div>
                        <div className="font-medium mb-2 text-gray-900 dark:text-gray-100">Date Range</div>
                        <input
                            type="text"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        />
                        <div className="flex flex-wrap gap-2">
                            <button className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">Last 7 days</button>
                            <button className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">Last 30 days</button>
                            <button className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">This month</button>
                            <button className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">Last month</button>
                        </div>
                    </div>

                    {/* Speaker Filter */}
                    <div>
                        <div className="font-medium mb-2 text-gray-900 dark:text-gray-100">Speaker</div>
                        <div className="flex gap-4">
                            {[
                                { label: "Client", value: "Client", icon: <User className="w-4 h-4 mr-1" /> },
                                { label: "Sales Rep", value: "SalesRep", icon: <Mic className="w-4 h-4 mr-1" /> },
                                { label: "All", value: "All", icon: <Users className="w-4 h-4 mr-1" /> },
                            ].map((option) => (
                                <label key={option.value} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="speaker"
                                        className="mr-2 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                        value={option.value}
                                        checked={speaker === option.value}
                                        onChange={() => setSpeaker(option.value)}
                                    />
                                    <span className="flex items-center text-gray-700 dark:text-gray-200">
                                        {option.icon}
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Dictionaries Filter */}
                    <div>
                        <div className="font-medium mb-2 text-gray-900 dark:text-gray-100">Dictionaries</div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded">Profanity & Insults</span>
                            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded">Connection Issues</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">Select All</button>
                            <button className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Clear</button>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-end mt-6">
                    <button
                        className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded flex items-center transition-colors shadow-sm"
                        onClick={() => setShowResults(!showResults)}
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </button>
                </div>
            </div>

            {/* Results */}
            {!showResults ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                    <Filter className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                    <div className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">No offensive words found</div>
                    <div className="text-gray-500 dark:text-gray-400">Try adjusting your filters or selecting different dictionaries</div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                    <th className="px-6 py-3 font-medium">Hit Count</th>
                                    <th className="px-6 py-3 font-medium">Word Types</th>
                                    <th className="px-6 py-3 font-medium">Lead</th>
                                    <th className="px-6 py-3 font-medium">Conversation Snippet</th>
                                    <th className="px-6 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                {/* Example row 1 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">1</td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                                        Profanity & Insults <span className="ml-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded text-xs">1</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">Alex Smith</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">2024-03-15 (15:30)</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">John Meyer</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                                        Well, this happens every time I call. You guys need to fix your{" "}
                                        <span className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200 px-1 rounded">damn</span> system.
                                    </td>
                                    <td className="px-6 py-4">
                                        <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                                    </td>
                                </tr>

                                {/* Example row 2 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">1</td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                                        Profanity & Insults <span className="ml-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded text-xs">1</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">Robert Johnson</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">2024-03-14 (08:45)</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Sarah Wilson</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                                        Hello, this is Sarah from Acme Corp. Am I speaking{" "}
                                        <span className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200 px-1 rounded">with</span> Mr. Johnson?
                                    </td>
                                    <td className="px-6 py-4">
                                        <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                                    </td>
                                </tr>

                                {/* Example row 3 */}
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">1</td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                                        Profanity & Insults <span className="ml-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded text-xs">1</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">Alisher Toshmatov</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">2024-03-12 (10:15)</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Karim Karimov</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                                        E <span className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200 px-1 rounded">shit</span> ilmayapti, balandroq gapiring!
                                    </td>
                                    <td className="px-6 py-4">
                                        <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}