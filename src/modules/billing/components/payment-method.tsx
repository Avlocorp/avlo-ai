import type React from "react";
import { Card, Button, Space, Typography } from "antd";
import type { PaymentMethod as PaymentMethodType } from "../types/billing";

import UzcardImg from "assets/images/uzcard.png";

const { Title, Text } = Typography;

interface PaymentMethodProps {
  paymentMethod: PaymentMethodType;
  onEdit: () => void;
  onDelete: () => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="bg-[#2a2a2d]">
      <Title level={5} style={{ margin: 0 }}>
        Payment method
      </Title>
      <Text type="secondary">Change how you pay for your plan.</Text>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 16,
          padding: 16,
          background: "#141414",
          borderRadius: 8,
        }}
      >
        <div>
          <img
            src={UzcardImg}
            alt="Uzcard"
            width={50}
            height={40}
            className="w-[50px] h-10"
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Text>Uzcard ending in {paymentMethod.lastFour}</Text>
          <br />
          <Text type="secondary">Expiry {paymentMethod.expiryDate}</Text>
        </div>
        <Space>
          <Button type="link" onClick={onEdit}>
            Edit
          </Button>
          <Button onClick={onDelete} className="!bg-[#F91A00]">
            Delete
          </Button>
        </Space>
      </div>
    </Card>
  );
};
