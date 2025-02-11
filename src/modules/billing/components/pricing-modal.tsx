import React from "react";
import { Modal, Switch, Button, Typography, Card, Space } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { PricingPlan } from "../types/billing";

const { Title, Text } = Typography;

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans: PricingPlan[] = [
  {
    title: "Free plan",
    description: "Explore our AI",
    price: 0,
    features: [
      "1 user in workspace",
      "Workflow automations",
      "Monthly Billing",
      "Collaborative work",
      "10 GB in cloud storage",
    ],
    buttonText: "Your current plan",
    buttonType: "default",
  },
  {
    title: "Basic plan",
    description: "Our most popular plan for small teams.",
    price: 100000,
    features: [
      "10 users in workspace",
      "Workflow automations",
      "Weekly Billing",
      "Collaborative work",
      "15 GB in cloud storage",
    ],
    buttonText: "Get started",
    buttonType: "primary",
    popular: true,
  },
  {
    title: "Company plan",
    description: "Plan for huge companies",
    price: 500000,
    features: [
      "20 users in workspace",
      "Workflow automations",
      "Daily Billing",
      "Collaborative work",
      "20 GB in cloud storage",
    ],
    buttonText: "Get started",
    buttonType: "primary",
  },
];

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [isYearly, setIsYearly] = React.useState(false);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width="100%"
      style={{ maxWidth: "100vw", margin: 0, top: 0, padding: 0 }}
      className="!p-0"
      rootClassName="[&_.ant-modal-content]:!p-0"
      bodyStyle={{
        background: "#1E1E1E",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
      closable
      closeIcon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}
    >
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <Title style={{ color: "white", marginBottom: "16px" }}>
          Upgrade your plan
        </Title>
        <Text
          style={{
            color: "#999",
            fontSize: "16px",
            display: "block",
            marginBottom: "32px",
          }}
        >
          Choose the plan that fits your needs and gain access to tools that
          help automate processes, boost efficiency, and scale your business.
        </Text>

        <Space align="center" style={{ marginBottom: "48px" }}>
          <Text style={{ color: "white" }}>Monthly</Text>
          <Switch
            checked={isYearly}
            onChange={setIsYearly}
            style={{ backgroundColor: isYearly ? "#1890ff" : "#666" }}
          />
          <Text style={{ color: "white" }}>
            Yearly
            <span
              style={{
                marginLeft: "8px",
                backgroundColor: "rgba(24, 144, 255, 0.1)",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#1890ff",
              }}
            >
              SAVE 20%
            </span>
          </Text>
        </Space>

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {plans.map((plan) => (
            <Card
              key={plan.title}
              style={{
                background: plan.popular ? "#2A2A2A" : "transparent",
                borderRadius: "12px",
                border: plan.popular ? "none" : "1px solid #4A554F",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(24, 144, 255, 0.1)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    color: "#1890ff",
                    fontSize: "12px",
                  }}
                >
                  POPULAR
                </div>
              )}
              <Title level={3} style={{ color: "white", marginBottom: "8px" }}>
                {plan.title}
              </Title>
              <Text
                style={{
                  color: "#999",
                  display: "block",
                  marginBottom: "24px",
                }}
              >
                {plan.description}
              </Text>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 24px 0",
                  color: "white",
                }}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckOutlined style={{ color: "#1890ff" }} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Title level={2} style={{ color: "white", marginBottom: "24px" }}>
                {plan.price.toLocaleString()} UZS
                <span style={{ fontSize: "16px", color: "#999" }}>/mo</span>
              </Title>
              <Button
                type={plan.buttonType}
                block
                size="large"
                style={{
                  height: "48px",
                  fontSize: "16px",
                  ...(plan.buttonType === "default" && {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderColor: "transparent",
                    color: "white",
                  }),
                }}
                className="!shadow-none"
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PricingModal;
