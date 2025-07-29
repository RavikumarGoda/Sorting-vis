
'use client';

import type { FC } from 'react';
import { Play, Pause, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { SortingAlgorithmType } from '@/lib/types';
import { MIN_ARRAY_SIZE, MAX_ARRAY_SIZE } from '@/lib/config';

interface HeaderProps {
  algorithm: SortingAlgorithmType;
  setAlgorithm: (algo: SortingAlgorithmType) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  onPlayPause: () => void;
  onReset: () => void;
  isSorting: boolean;
  isPaused: boolean;
  isFinished: boolean;
}

const Header: FC<HeaderProps> = ({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  onPlayPause,
  onReset,
  isSorting,
  isPaused,
  isFinished,
}) => {
  const disableControls = isSorting;

  const getButtonText = () => {
    if (isFinished) return 'Sorted';
    if (isSorting) return 'Pause';
    if (isPaused) return 'Resume';
    return 'Sort';
  };
  
  const arraySizeOptions = Array.from({ length: (MAX_ARRAY_SIZE - MIN_ARRAY_SIZE) / 5 + 1 }, (_, i) => MIN_ARRAY_SIZE + i * 5);
  const speedOptions = Array.from({ length: 10 }, (_, i) => ({ value: (i + 1) * 10, label: `${i + 1}x` }));

  return (
    <header className="bg-card border-b border-border shadow-md">
      <div className="container mx-auto px-2 sm:px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 self-start md:self-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M15 13L15 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 16L6 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 13L18 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Sorting Visualizer</h1>
          </div>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6">
            <div className="w-full sm:w-auto flex items-center justify-between gap-4">
              <Select
                value={algorithm}
                onValueChange={(value) => setAlgorithm(value as SortingAlgorithmType)}
                disabled={disableControls || isFinished}
              >
                <SelectTrigger className="w-full sm:w-[150px] bg-background">
                  <SelectValue placeholder="Algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bubble">Bubble Sort</SelectItem>
                  <SelectItem value="merge">Merge Sort</SelectItem>
                  <SelectItem value="quick">Quick Sort</SelectItem>
                  <SelectItem value="selection">Selection Sort</SelectItem>
                  <SelectItem value="insertion">Insertion Sort</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-between gap-3">
              <Label htmlFor="array-size" className="whitespace-nowrap">Array Size</Label>
               <Select
                  value={String(arraySize)}
                  onValueChange={(value) => setArraySize(Number(value))}
                  disabled={disableControls || isFinished}
                >
                  <SelectTrigger className="w-[100px] bg-background">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {arraySizeOptions.map(size => (
                      <SelectItem key={size} value={String(size)}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            
            <div className="w-full sm:w-auto flex items-center justify-between gap-3">
              <Label htmlFor="speed" className="whitespace-nowrap">Speed</Label>
              <Select
                value={String(speed)}
                onValueChange={(value) => setSpeed(Number(value))}
              >
                <SelectTrigger className="w-[100px] bg-background">
                  <SelectValue placeholder="Speed" />
                </SelectTrigger>
                <SelectContent>
                  {speedOptions.map(option => (
                    <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator orientation="vertical" className="h-8 hidden md:block" />

            <div className="w-full sm:w-auto flex items-center justify-center gap-2">
              <Button onClick={onPlayPause} className="w-[100px]" disabled={isFinished && algorithm === 'quick'}>
                {isSorting ? <Pause /> : <Play />}
                {getButtonText()}
              </Button>
              <Button onClick={onReset} variant="outline" disabled={isSorting}>
                Generate array
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
