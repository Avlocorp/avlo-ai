export interface StatisticsResponse {
  speed_connection: SpeedConnection;
  communication_quality: CommunicationQuality;
  summary: Summary;
}

export interface SpeedConnection {
  first_contact_speed: FirstContactSpeed;
  first_success_speed: FirstSuccessSpeed;
  first_call_connection_ratio: FirstCallConnectionRatio;
  no_connection_rate: NoConnectionRate;
  pickup_rate: PickupRate;
  avg_attempts_to_connect: AvgAttemptsToConnect;
  avg_talk_timeavg_ring_count: AvgRingCount;
  avg_talk_time: AvgTalkTime;
  avg_ring_count: AvgRingCount;
}

export interface FirstContactSpeed {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface FirstSuccessSpeed {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface FirstCallConnectionRatio {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface NoConnectionRate {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface PickupRate {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface AvgAttemptsToConnect {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface AvgRingCount {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface AvgTalkTime {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface CommunicationQuality {
  silence_rate: SilenceRate;
  listening_rate: ListeningRate;
  avg_talk_time: AvgTalkTime2;
}

export interface SilenceRate {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface ListeningRate {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface AvgTalkTime2 {
  value: number;
  display: string;
  comparison: string;
  comparison_color: string;
  median: number;
}

export interface Summary {
  total_leads: number;
  total_calls: number;
  date_range: DateRange;
  total_talk_time: number;
}

export interface DateRange {
  start: any;
  end: any;
}
