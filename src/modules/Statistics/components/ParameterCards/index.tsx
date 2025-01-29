import ArrowDown from 'assets/icons/arrow-down';
import ArrowUp from 'assets/icons/arrow-up';
import React from 'react';

interface ParameterCardProps {
    Icon?: React.ComponentType<any>;
    anmount?: string;
    title?: string;
    percentage?: string;
    Img?: string;
}

export default function ParameterCard({ Icon, anmount, title, percentage, Img }: ParameterCardProps) {
    function percentageCount(percentage: string) {
        const percentageValue = parseFloat(percentage);
        if (!isNaN(percentageValue)) {
            if (percentageValue >= 0) {
                return (
                    <div className="text-green-500 flex items-center gap-1">
                        <span>
                            {percentageValue}%
                        </span>
                        <ArrowUp />
                    </div>);
            } else {
                return (
                    <div className="text-red-500 flex items-center gap-1">
                        <span className='text-sm'>
                            {percentageValue}%
                        </span>
                        <ArrowDown />
                    </div>
                )
            }
        }
        return <span>{percentage}</span>;
    }

    return (
        <div className="p-6 gap-6 flex rounded-2xl bg-[#2A2A2D] w-full">
            {Img && <img src={Img} alt="" />}
            {Icon && <Icon className="w-12 h-12 text-primary-500" />}

            <div className='w-full'>
                <span className='text-[22px] text-white'>{anmount}</span>
                <div className='flex items-center justify-between'>
                    <span className='text-[14px] text-white'>{title}</span>
                    {percentage && percentageCount(percentage)}
                </div>
            </div>
        </div>
    );
}
