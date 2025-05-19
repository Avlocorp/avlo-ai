"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { ChevronDown } from "lucide-react"

export default function OffensiveWordsTab() {
    const [showResults, setShowResults] = useState(false)
    const [dateRange, setDateRange] = useState("Apr 19, 2025 - May 19, 2025")

    return (
        <div className="p-6">
            <div className="bg-white border rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                    <div>
                        <div className="font-medium mb-2">Speaker</div>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input type="radio" name="speaker" className="mr-2" />
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Client
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="speaker" className="mr-2" />
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M16 8V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6V8"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 18C9 16.9391 9.42143 15.9217 10.1716 15.1716C10.9217 14.4214 11.9391 14 13 14H19C20.0609 14 21.0783 14.4214 21.8284 15.1716C22.5786 15.9217 23 16.9391 23 18V20C23 20.5304 22.7893 21.0391 22.4142 21.4142C22.0391 21.7893 21.5304 22 21 22H11C10.4696 22 9.96086 21.7893 9.58579 21.4142C9.21071 21.0391 9 20.5304 9 20V18Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M3 18C3 16.9391 3.42143 15.9217 4.17157 15.1716C4.92172 14.4214 5.93913 14 7 14H8"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Sales Rep
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="speaker" className="mr-2" checked />
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    All
                                </span>
                            </label>
                        </div>
                    </div>

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
                                    Hello, this is Sarah from Acme Corp. Am I speaking <span className="bg-yellow-200">with</span> Mr.
                                    Johnson?
                                </td>
                                <td className="px-6 py-4">
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </td>
                            </tr>
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
