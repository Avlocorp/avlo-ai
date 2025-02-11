export interface PaymentRecord {
  key: string;
  invoiceId: string;
  amount: number;
  deliveryDate: string;
  plan: string;
  status: "Paid" | "Pending";
}

export interface PlanDetails {
  name: string;
  type: string;
  usersCount: number;
  maxUsers: number;
  amountPerMonth: number;
}

export interface PaymentMethod {
  cardType: string;
  lastFour: string;
  expiryDate: string;
}

export interface PricingPlan {
  title: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  buttonType: "default" | "primary";
  popular?: boolean;
}
