export interface PieChartData {
  name: string;
  value: number;
}

export interface RadarChartData {
  metric: string;
  series1: number;
}

export interface ChartDataProps {
  pieData1: PieChartData[];
  pieData2: PieChartData[];
  pieData3: PieChartData[];
  pieData4: PieChartData[];
  pieData5: PieChartData[];
  dataRadar: RadarChartData[];
}
