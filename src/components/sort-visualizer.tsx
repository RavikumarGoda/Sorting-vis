'use client';

import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface SortVisualizerProps {
  array: number[];
  activeIndices: number[];
  pivotIndex: number | null;
  sortedIndices: number[];
}

const SortVisualizer: FC<SortVisualizerProps> = ({
  array,
  activeIndices,
  pivotIndex,
  sortedIndices,
}) => {
  return (
    <div className="w-full h-[50vh] md:h-[65vh] flex justify-center items-end gap-[1px] md:gap-[2px] p-2 md:p-4 bg-card rounded-lg shadow-inner">
      {array.map((value, index) => {
        const isPivot = index === pivotIndex;
        const isActive = activeIndices.includes(index);
        const isSorted = sortedIndices.includes(index);

        return (
          <div
            key={index}
            className={cn(
              'w-full rounded-t-sm transition-all duration-300 ease-in-out',
              {
                'bg-accent': isActive && !isPivot,
                'bg-destructive': isPivot,
                'bg-chart-2': isSorted,
                'bg-primary': !isActive && !isSorted && !isPivot,
              }
            )}
            style={{ height: `${value}%` }}
            data-ai-hint="bar chart"
          ></div>
        );
      })}
    </div>
  );
};

export default SortVisualizer;
