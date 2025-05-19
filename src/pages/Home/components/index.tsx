// // components/CardWithIndicator.tsx
// import React from 'react';

// interface CardProps {
//     title: string;
//     value: string;
//     change: number;
//     isPositive: boolean;
//     changeText: string;
// }

// const CardWithIndicator: React.FC<CardProps> = ({
//     title,
//     value,
//     change,
//     isPositive,
//     changeText,
// }) => {
//     return (
//         <div className="flex rounded-xl shadow-sm overflow-hidden max-h-[140px]">
//             <div className={`w-1 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} />
//             <div className="w-full bg-white">
//                 <MetricCard
//                     title={title}
//                     value={value}
//                     change={change}
//                     isPositive={isPositive}
//                     changeText={changeText}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CardWithIndicator;
