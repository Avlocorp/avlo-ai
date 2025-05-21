import { useState } from "react"
import { Search, Filter, User, Users, Mic } from "lucide-react"
import { ChevronDown } from "lucide-react"

export default function OffensiveWordsTab() {
    const [showResults, setShowResults] = useState(false)
    const [dateRange, setDateRange] = useState("Apr 19, 2025 - May 19, 2025")
    const [speaker, setSpeaker] = useState("All")

    return (
        <div className="p-6">
            <div className="bg-white border rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Date Range Filter */}
                    <div>
                        <div className="font-medium mb-2">Date Range</div>
                        <input
                            type="text"
                            className="w-full border rounded p-2 mb-2"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        />
                        <div className="flex flex-wrap gap-2">
                            <button className="bg-gray-100 text-sm px-3 py-1 rounded">Last 7 days</button>
                            <button className="bg-gray-100 text-sm px-3 py-1 rounded">Last 30 days</button>
                            <button className="bg-gray-100 text-sm px-3 py-1 rounded">This month</button>
                            <button className="bg-gray-100 text-sm px-3 py-1 rounded">Last month</button>
                        </div>
                    </div>

                    {/* Speaker Filter */}
                    <div>
                        <div className="font-medium mb-2">Speaker</div>
                        <div className="flex gap-4">
                            {[
                                { label: "Client", value: "Client", icon: <User /> },
                                { label: "Sales Rep", value: "SalesRep", icon: <Mic /> },
                                { label: "All", value: "All", icon: <Users /> },
                            ].map((option) => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="speaker"
                                        className="mr-2 "
                                        value={option.value}
                                        checked={speaker === option.value}
                                        onChange={() => setSpeaker(option.value)}
                                    />
                                    <span className="flex items-center">
                                        {option.icon}
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Dictionaries Filter */}
                    <div>
                        <div className="font-medium mb-2">Dictionaries</div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded">Profanity & Insults</span>
                            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded">Connection Issues</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="text-indigo-600 text-sm">Select All</button>
                            <button className="text-gray-500 text-sm">Clear</button>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-end mt-6">
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center"
                        onClick={() => setShowResults(!showResults)}
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </button>
                </div>
            </div>

            {/* Results */}
            {!showResults ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <Filter className="w-16 h-16 text-gray-300 mb-4" />
                    <div className="text-lg font-medium mb-2">No offensive words found</div>
                    <div className="text-gray-500">Try adjusting your filters or selecting different dictionaries</div>
                </div>
            ) : (
                <div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-xs uppercase tracking-wider text-gray-600 bg-gray-50">
                                <th className="px-6 py-3 font-medium">Hit Count</th>
                                <th className="px-6 py-3 font-medium">Word Types</th>
                                <th className="px-6 py-3 font-medium">Lead</th>
                                <th className="px-6 py-3 font-medium">Conversation Snippet</th>
                                <th className="px-6 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {/* Example row 1 */}
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4">
                                    Profanity & Insults <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded text-xs">1</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">Alex Smith</div>
                                    <div className="text-sm text-gray-500">2024-03-15 (15:30)</div>
                                    <div className="text-sm text-gray-500">John Meyer</div>
                                </td>
                                <td className="px-6 py-4">
                                    Well, this happens every time I call. You guys need to fix your{" "}
                                    <span className="bg-yellow-200">damn</span> system.
                                </td>
                                <td className="px-6 py-4">
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </td>
                            </tr>

                            {/* Example row 2 */}
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4">
                                    Profanity & Insults <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded text-xs">1</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">Robert Johnson</div>
                                    <div className="text-sm text-gray-500">2024-03-14 (08:45)</div>
                                    <div className="text-sm text-gray-500">Sarah Wilson</div>
                                </td>
                                <td className="px-6 py-4">
                                    Hello, this is Sarah from Acme Corp. Am I speaking{" "}
                                    <span className="bg-yellow-200">with</span> Mr. Johnson?
                                </td>
                                <td className="px-6 py-4">
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </td>
                            </tr>

                            {/* Example row 3 */}
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4">
                                    Profanity & Insults <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded text-xs">1</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">Alisher Toshmatov</div>
                                    <div className="text-sm text-gray-500">2024-03-12 (10:15)</div>
                                    <div className="text-sm text-gray-500">Karim Karimov</div>
                                </td>
                                <td className="px-6 py-4">
                                    E <span className="bg-yellow-200">shit</span> ilmayapti, balandroq gapiring!
                                </td>
                                <td className="px-6 py-4">
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

