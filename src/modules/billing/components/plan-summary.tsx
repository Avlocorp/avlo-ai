import type React from "react";
import { Card, Progress, Tag, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import type { PlanDetails } from "../types/billing";
import { useState } from "react";
import PricingModal from "./pricing-modal";

const { Title, Text } = Typography;

interface PlanSummaryProps {
  plan: PlanDetails;
}

export const PlanSummary: React.FC<PlanSummaryProps> = ({ plan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usagePercentage = (plan.usersCount / plan.maxUsers) * 100;

  return (
    <Card className="bg-[#2a2a2d]">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div>
          <Title level={5} style={{ margin: 0 }}>
            {plan.name}
            <Tag color="white" className="ml-2 !bg-[#5b9bec]">
              {plan.type}
            </Tag>
          </Title>
          <Text type="secondary">Our most popular plan for small teams.</Text>
        </div>
        <Title level={2} style={{ margin: 0 }}>
          {new Intl.NumberFormat().format(plan.amountPerMonth)}
          <span
            style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.45)" }}
          >
            /mo
          </span>
        </Title>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text type="secondary">
          {plan.usersCount}/{plan.maxUsers} users
        </Text>
        <Progress
          percent={usagePercentage}
          showInfo={false}
          strokeColor="#1890ff"
          trailColor="#4B5563"
        />
      </div>

      <Button
        type="link"
        style={{ padding: 0 }}
        icon={<ArrowRightOutlined className="mb-2 rotate-[-45deg]" />}
        onClick={() => setIsModalOpen(true)}
      >
        Upgrade plan
      </Button>

      <PricingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
};
