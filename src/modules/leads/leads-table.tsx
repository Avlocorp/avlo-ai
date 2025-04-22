import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Lead } from "services/api/leads/leads.types";

interface IProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  perPage: number;
  data: Lead[];
  isLoading: boolean;
  isFetching: boolean;
  handlePageChange: (page: number) => void;
}

const LeadsTable = (props: IProps) => {
  const {
    currentPage,
    setCurrentPage,
    perPage,
    data,
    isLoading,
    isFetching,
    handlePageChange,
  } = props;
  const columns: ColumnsType<Lead> = [
    {
      title: "No",
      dataIndex: "id",
      render: (_, __, index) => (currentPage - 1) * perPage + index + 1,
    },
    {
      title: "Title",
      dataIndex: "TITLE",
      key: "TITLE",
    },
    {
      title: "Created at",
      dataIndex: "DATE_CREATE",
      key: "DATE_CREATE",
      render: (value) => {
        const date = new Date(value);
        const humanReadable = date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        });

        return humanReadable;
      },
    },
    {
      title: "Assigned to",
      dataIndex: "assigned_by",
      key: "assigned_by",
      render: (value) => {
        return value && `${value.name} ${value.last_name}`;
      },
    },
    {
      title: "Scoring",
      dataIndex: "lead_score",
      key: "lead_score",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        // total: data?.total,
        pageSize: perPage,
        current: currentPage,
        showSizeChanger: false,
        onChange: (page) => {
          setCurrentPage(page);
          handlePageChange(page);
        },
        showTotal: (total, range) =>
          `Page ${Math.ceil(range[0] / perPage)} of ${Math.ceil(
            total / perPage
          )}`,
      }}
      loading={isLoading || isFetching}
    />
  );
};

export default LeadsTable;
