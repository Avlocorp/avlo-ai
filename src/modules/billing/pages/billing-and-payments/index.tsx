import type React from "react";
import { Typography, ConfigProvider } from "antd";
import { PlanSummary } from "../../components/plan-summary";
import { PaymentMethod } from "../../components/payment-method";
import { PaymentsTable } from "../../components/payments-table";
import type {
  PlanDetails,
  PaymentMethod as PaymentMethodType,
  PaymentRecord,
} from "../../types/billing";
import { theme } from "../../theme";

const { Title, Text } = Typography;

const planDetails: PlanDetails = {
  name: "Basic plan",
  type: "Monthly",
  usersCount: 14,
  maxUsers: 20,
  amountPerMonth: 100000,
};

const paymentMethod: PaymentMethodType = {
  cardType: "Uzcard",
  lastFour: "1234",
  expiryDate: "06/2025",
};

const paymentRecords: PaymentRecord[] = Array(6)
  .fill(null)
  .map((_, index) => ({
    key: index.toString(),
    invoiceId: "Invoice #007 - Dec 2022",
    amount: 100000,
    deliveryDate: "Jan 13, 2022",
    plan: "Basic plan",
    status: "Paid",
  }));

const BillingPage: React.FC = () => {
  const handleEdit = () => {
    console.log("Edit payment method");
  };

  const handleDelete = () => {
    console.log("Delete payment method");
  };

  const handleDownload = (record: PaymentRecord) => {
    console.log("Download invoice:", record.invoiceId);
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="px-6 pb-9">
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: "#fff" }}>
            Billing
          </Title>
          <Text type="secondary" className="!text-white">
            Manage your billing and payment details.
          </Text>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <PlanSummary plan={planDetails} />
          <PaymentMethod
            paymentMethod={paymentMethod}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <PaymentsTable data={paymentRecords} onDownload={handleDownload} />
      </div>
    </ConfigProvider>
  );
};

export default BillingPage;
