export interface Operator {
  id: number;
  name: string;
  last_name: string;
  email: string;
  all_calls?: number;
  avarege_score?: {
    successfully_calls?: number;
    unsuccessfully_calls?: number;
    overall_performance_score?: number;
  };
}

export interface TableData {
  totalLeads: number | string;
  agreedPrice: number | string;
  remainingPrice: number | string;
  totalPrice: number | string;
  isLoading: boolean;
  hasError: boolean;
}

export interface DashboardData {
  data: any;
  operatorId: number | null;
  isLoading: boolean;
  error: any;
}
