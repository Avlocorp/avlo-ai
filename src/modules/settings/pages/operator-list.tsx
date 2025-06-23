import { Avatar, Input, Switch } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { Operator } from "services/api/settings/settings.types";
import { useEffect, useState } from "react";
import { useGetOperatorListQuery } from "services/api/settings";
import { ArrowDownAZ, ArrowDownUp, ArrowLeft, ArrowUpZA } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserManage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const navigate = useNavigate();
    const [sortField, setSortField] = useState<string | undefined>();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>();

    // debounce qilingan search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue);
            setPage(1);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue]);

    const toggleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const { data: syncData, isLoading } = useGetOperatorListQuery({
        page,
        per_page: pageSize,
        search: debouncedSearch,
        sort: sortField ? (sortOrder === "desc" ? `-${sortField}` : sortField) : undefined,
    });

    const columns: ColumnsType<Operator> = [


        {
            title: "ID",
            dataIndex: "id",
            render: (id: number) => <span className="text-zinc-500">{id}</span>,
        },
        {
            title: (
                <div className="flex items-center gap-2">
                    <button onClick={() => toggleSort("name")}>
                        {sortField === "name"
                            ? sortOrder === "asc"
                                ? <ArrowDownAZ />
                                : <ArrowUpZA />
                            : <ArrowDownAZ />}
                    </button>

                    <p>Name</p>
                </div>
            ),
            dataIndex: "name",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <Avatar src={record.photo} size={40} icon={<UserOutlined />} />
                    <div>
                        <div className="font-medium">
                            {(record.name || "-") + " " + (record.last_name || "")}
                        </div>
                        <div className="text-sm text-zinc-400">{record.email || "-"}</div>
                    </div>
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center gap-2">
                    <p>All calls</p>
                    <button onClick={() => toggleSort("all_calls")}>
                        <ArrowDownUp
                            className={`
                      transition-transform duration-300
                      ${sortField === "all_calls" && sortOrder === "desc" ? "rotate-180" : ""}
                    `}
                        />
                    </button>
                </div>
            ),
            dataIndex: "all_calls",
            render: (calls: number) => (
                <span className="text-zinc-500">
                    {calls ? calls.toLocaleString() : "0"}
                </span>
            ),
        },

        {
            title: (
                <div className="flex items-center gap-2">
                    <p>Overall Score</p>
                    <button onClick={() => toggleSort("overall_performance_score")}>
                        <ArrowDownUp
                            className={`
                      transition-transform duration-300
                      ${sortField === "overall_performance_score" && sortOrder === "desc" ? "rotate-180" : ""}
                    `}
                        />
                    </button>
                </div>
            ),
            dataIndex: "avarege_score",
            render: (score) => {
                if (!score) return "-";
                return (
                    <div className="text-sm space-y-1">
                        <div>{score.overall_performance_score ?? 0}</div>
                    </div>
                );
            },
        },

        {
            title: "Position",
            dataIndex: "work_position",
            render: (position: string) => <span>{position || "-"}</span>,
        },
        {
            title: "Phone number",
            dataIndex: "mobile_phone",
            render: (phone: string) => phone || "-",
        },
        {
            title: (
                <div className="flex items-center gap-2">
                    Status{" "}
                    <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
                </div>
            ),
            key: "actions",
            dataIndex: "id",
            render: () => <Switch defaultChecked />,
        },
    ];

    const handleBack = () => {
        navigate('/pm/settings');
    };
    return (
        <div className="min-h-screen p-6">
            <div className="flex items-center mb-8">
                <button
                    onClick={handleBack}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">User Management</h1>
            </div>
            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Search for members"
                    prefix={<SearchOutlined className="[&_svg]:w-6 [&_svg]:h-6 text-zinc-400" />}
                    className="w-[400px] h-10 placeholder-zinc-400"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    allowClear
                />
            </div>
            <div className="rounded-lg border mt-4">
                <Table
                    columns={columns}
                    dataSource={syncData?.data || []}
                    loading={isLoading}
                    rowKey="id"
                    pagination={{
                        current: page,
                        pageSize,
                        total: syncData?.all_data || 0,
                        onChange: (newPage, newSize) => {
                            setPage(newPage);
                            setPageSize(newSize);
                        },
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} operators`,
                    }}
                />
            </div>
        </div>
    );
}
