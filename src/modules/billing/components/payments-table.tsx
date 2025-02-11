import type React from "react";
import { Table, Button, Typography, Card } from "antd";
import { FilePdfOutlined, ExportOutlined } from "@ant-design/icons";
import type { PaymentRecord } from "../types/billing";

const { Text } = Typography;

interface PaymentsTableProps {
  data: PaymentRecord[];
  loading?: boolean;
  onDownload: (record: PaymentRecord) => void;
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({
  data,
  loading,
  onDownload,
}) => {
  const columns = [
    {
      title: "Executed by",
      key: "invoice",
      render: (record: PaymentRecord) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FilePdfOutlined style={{ color: "#ff4d4f" }} />
          <Text>{record.invoiceId}</Text>
        </div>
      ),
    },
    {
      title: "Amount (UZS)",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <Text>{new Intl.NumberFormat().format(amount)}</Text>
      ),
    },
    {
      title: "Delivery date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Status",
      key: "status",
      render: (record: PaymentRecord) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#52c41a",
            }}
          />
          <Text style={{ color: "#52c41a" }}>{record.status}</Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: PaymentRecord) => (
        <Button type="link" onClick={() => onDownload(record)}>
          Download
        </Button>
      ),
    },
  ];

  return (
    <Card className="bg-[#343436]">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text strong style={{ fontSize: 18 }}>
          All payments
        </Text>
        <Button
          type="primary"
          icon={<ExportOutlined />}
          className="bg-[#139a51] shadow-none"
        >
          Export
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          total: 10,
          current: 1,
          pageSize: 6,
          showSizeChanger: false,
        }}
      />
    </Card>
  );
};
