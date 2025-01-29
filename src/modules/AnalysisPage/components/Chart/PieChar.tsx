import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface CustomPieChartProps {
    data: { name: string; value: number }[];
    colorEmpty: string;
    colorFilled: string;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
    data,
    colorEmpty,
    colorFilled,
}) => {
    const COLORS = [colorFilled, colorEmpty];
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const percentage = Math.round((data[0].value / total) * 100);

    return (
        <div className="relative">
            <PieChart width={280} height={170}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    innerRadius={90}
                    outerRadius={135}
                    paddingAngle={0}
                    endAngle={0}
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index]}
                            stroke="none"
                        />
                    ))}
                </Pie>
            </PieChart>
            <div
                className="absolute inset-0 flex items-center justify-center  mt-20"
                style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}
            >
                {percentage}%
            </div>
        </div>
    );
};

export default CustomPieChart;

