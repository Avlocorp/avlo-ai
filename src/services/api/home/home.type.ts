export interface AIResponse {
  conversation_title: string;
  main_contents: string;
  essential_points: string[];
  caller_emotion: string;
  overall_performance_score: number;
  communication_skills_score: number;
  problem_handling_score: number;
  customer_management_score: number;
  protocol_adherence_score: number;
  resolution_status: string;
  resolution_quality: string;
  agent_development_opportunities: string[];
  process_improvement_suggestions: string[];
  resource_or_tool_recommendations: string[];
  notable_techniques: string[];
  successful_interaction_strategies: string[];
  examples_for_training: string[];
  conclusion: string;
  transcription: Transcription;
}

export type Transcription = {
  speaker: "customer" | "operator";
  text: string;
}[];

export interface TotalDuration {
  total_duration: number;
  anaylsed_data: number;

  // boshqa statistikalar bo‘lsa, shu yerga qo‘shing
}

export type DashboardStatistics = {
  overall_performance_score: number;
  communication_skills_score: number;
  problem_handling_score: number;
  customer_management_score: number;
  protocol_adherence_score: number;
  successfully_calls: number;
  unsuccessfully_calls: number;
  total_calls: number;
  members: number;
};
