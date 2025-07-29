
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { FC } from 'react';
import { Github, Linkedin } from 'lucide-react';
import Header from '@/components/header';
import SortVisualizer from '@/components/sort-visualizer';
import type { SortingAlgorithmType, AnimationStep } from '@/lib/types';
import {
  generateBubbleSortAnimation,
  generateMergeSortAnimation,
  generateQuickSortAnimation,
  generateSelectionSortAnimation,
  generateInsertionSortAnimation,
} from '@/lib/sorting-algorithms';
import { MIN_ARRAY_SIZE, MAX_ARRAY_SIZE, DEFAULT_ARRAY_SIZE, DEFAULT_SPEED, DEFAULT_ALGORITHM } from '@/lib/config';

const generateRandomArray = (size: number): number[] => {
  if (size === 0) return [];
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
};

const Home: FC = () => {
  const [algorithm, setAlgorithm] = useState<SortingAlgorithmType>(DEFAULT_ALGORITHM);
  const [arraySize, setArraySize] = useState<number>(DEFAULT_ARRAY_SIZE);
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED);
  
  const [array, setArray] = useState<number[]>([]);
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isFinished = useMemo(() => currentStep >= animationSteps.length && animationSteps.length > 0, [currentStep, animationSteps.length]);
  const isSorting = useMemo(() => isPlaying && !isFinished, [isPlaying, isFinished]);
  const isPaused = useMemo(() => !isPlaying && currentStep > 0 && !isFinished, [isPlaying, currentStep, isFinished]);
  
  const resetAnimationState = useCallback(() => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
    setIsPlaying(false);
    setCurrentStep(0);
    setActiveIndices([]);
    setPivotIndex(null);
    setSortedIndices([]);
  }, []);

  const getAnimationSteps = useCallback((algo: SortingAlgorithmType, arr: number[]) => {
    switch (algo) {
      case 'bubble': return generateBubbleSortAnimation(arr);
      case 'merge': return generateMergeSortAnimation(arr);
      case 'quick': return generateQuickSortAnimation(arr);
      case 'selection': return generateSelectionSortAnimation(arr);
      case 'insertion': return generateInsertionSortAnimation(arr);
      default: return [];
    }
  }, []);

  const generateNewArray = useCallback((size: number) => {
    const newArray = generateRandomArray(size);
    setArray(newArray);
    resetAnimationState();
    const newSteps = getAnimationSteps(algorithm, newArray);
    setAnimationSteps(newSteps);
  }, [algorithm, resetAnimationState, getAnimationSteps]);

  useEffect(() => {
    generateNewArray(arraySize);
  }, [arraySize, generateNewArray]);

  const handleAlgorithmChange = useCallback((newAlgorithm: SortingAlgorithmType) => {
    setAlgorithm(newAlgorithm);
    resetAnimationState();
    const newArray = [...array];
    const newSteps = getAnimationSteps(newAlgorithm, newArray);
    setAnimationSteps(newSteps);
  }, [array, resetAnimationState, getAnimationSteps]);
  
  const timeoutDelay = useMemo(() => 500 / (speed / 10), [speed]);

  const stepForward = useCallback(() => {
    if (currentStep >= animationSteps.length) {
      setIsPlaying(false);
      setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
      setActiveIndices([]);
      setPivotIndex(null);
      return;
    }

    const step = animationSteps[currentStep];
    if (step) {
      setActiveIndices([]);
      setPivotIndex(null);

      if (step.comparison) {
        setActiveIndices(step.comparison);
      }
      if (step.swap) {
        setArray(prevArray => {
          const newArray = [...prevArray];
          const [i, j] = step.swap!;
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          return newArray;
        });
      }
      if (step.overwrite) {
        setArray(prevArray => {
          const newArray = [...prevArray];
          const [index, value] = step.overwrite!;
          newArray[index] = value;
          return newArray;
        });
        setActiveIndices([step.overwrite[0]]);
      }
      if(step.pivot !== undefined){
        setPivotIndex(step.pivot);
      }
      if (step.sorted) {
        setSortedIndices(prev => {
          const newSorted = new Set([...prev, ...step.sorted!]);
          return Array.from(newSorted);
        });
      }
    }
    setCurrentStep(prevStep => prevStep + 1);
  }, [animationSteps, currentStep, array.length]);

  const stepForwardRef = useRef(stepForward);
  useEffect(() => {
    stepForwardRef.current = stepForward;
  }, [stepForward]);

  useEffect(() => {
    if (isPlaying && !isFinished) {
      animationIntervalRef.current = setInterval(() => {
        stepForwardRef.current();
      }, timeoutDelay);
    } else {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    }
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [isPlaying, isFinished, timeoutDelay]);

  const handlePlayPause = useCallback(() => {
    if (isFinished) {
      generateNewArray(arraySize);
      setTimeout(() => {
          setIsPlaying(true);
      }, 50);
      return;
    }
    setIsPlaying(prev => !prev);
  }, [isFinished, arraySize, generateNewArray]);

  const handleReset = useCallback(() => {
    generateNewArray(arraySize);
  }, [arraySize, generateNewArray]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header
        algorithm={algorithm}
        setAlgorithm={handleAlgorithmChange}
        arraySize={arraySize}
        setArraySize={setArraySize}
        speed={speed}
        setSpeed={setSpeed}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        isSorting={isSorting}
        isPaused={isPaused}
        isFinished={isFinished}
      />
      <main className="flex-grow flex flex-col items-center justify-center p-2 md:p-4">
        <SortVisualizer
          array={array}
          activeIndices={activeIndices}
          pivotIndex={pivotIndex}
          sortedIndices={sortedIndices}
        />
        <p className="mt-4 text-center text-muted-foreground italic">
          "Just like sorting, success is about organizing chaos into clarity."
        </p>
        <div className="flex items-center gap-4 mt-4">
          <a href="https://github.com/RavikumarGoda" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/ravi-kumar-reddy-goda/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
