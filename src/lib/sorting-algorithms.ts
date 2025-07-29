
import type { AnimationStep } from './types';

export function generateBubbleSortAnimation(array: number[]): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ comparison: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        animations.push({ swap: [j, j + 1] });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    animations.push({ sorted: [n - 1 - i] });
  }
  if (n > 0) {
    animations.push({ sorted: [0] });
  }
  return animations;
}

export function generateMergeSortAnimation(array: number[]): AnimationStep[] {
  const animations: AnimationStep[] = [];
  if (array.length <= 1) {
    if (array.length === 1) animations.push({ sorted: [0] });
    return animations;
  };
  const auxiliaryArray = array.slice();
  const mainArray = array.slice();
  mergeSortHelper(mainArray, 0, mainArray.length - 1, auxiliaryArray, animations);
  for (let i = 0; i < mainArray.length; i++) {
    animations.push({ sorted: [i] });
  }
  return animations;
}

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: AnimationStep[],
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: AnimationStep[],
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push({ comparison: [i, j] });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ overwrite: [k, auxiliaryArray[i]] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ overwrite: [k, auxiliaryArray[j]] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({ comparison: [i, i] });
    animations.push({ overwrite: [k, auxiliaryArray[i]] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ comparison: [j, j] });
    animations.push({ overwrite: [k, auxiliaryArray[j]] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function generateQuickSortAnimation(array: number[]): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSortHelper(array: number[], low: number, high: number, animations: AnimationStep[]) {
  if (low >= high) {
    if (low <= high) {
        const finalSorted = Array.from({length: high - low + 1}, (_, i) => low + i);
        if (finalSorted.length > 0) {
            animations.push({ sorted: finalSorted });
        }
    }
    return;
  }
  
  if (low < high) {
    const pi = partition(array, low, high, animations);
    animations.push({ sorted: [pi] });
    quickSortHelper(array, low, pi - 1, animations);
    quickSortHelper(array, pi + 1, high, animations);
  }
}


function partition(array: number[], low: number, high: number, animations: AnimationStep[]): number {
  const pivot = array[high];
  animations.push({ pivot: high });
  let i = low - 1;

  for (let j = low; j < high; j++) {
    animations.push({ comparison: [j, high] });
    if (array[j] < pivot) {
      i++;
      if (i !== j) {
        animations.push({ swap: [i, j] });
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  if (i + 1 !== high) {
    animations.push({ swap: [i + 1, high] });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
  }
  animations.push({ pivot: null });
  return i + 1;
}

export function generateSelectionSortAnimation(array: number[]): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    animations.push({ pivot: minIdx });
    for (let j = i + 1; j < n; j++) {
      animations.push({ comparison: [minIdx, j] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        animations.push({ pivot: minIdx });
      }
    }
    animations.push({ pivot: null });
    if (minIdx !== i) {
      animations.push({ swap: [i, minIdx] });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    animations.push({ sorted: [i] });
  }
  if (n > 0) {
    animations.push({ sorted: [n - 1] });
  }
  return animations;
}

export function generateInsertionSortAnimation(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    const arr = [...array];
    const n = arr.length;
    
    if (n > 0) {
      animations.push({ sorted: [0] });
    }

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        animations.push({ pivot: i });
        
        while (j >= 0 && arr[j] > key) {
            animations.push({ comparison: [j, i], overwrite: [j + 1, arr[j]] });
            arr[j + 1] = arr[j];
            j--;
        }
        
        animations.push({ overwrite: [j + 1, key] });
        arr[j + 1] = key;
        animations.push({ pivot: null });
        
        const sortedSoFar = Array.from({length: i + 1}, (_, k) => k);
        animations.push({ sorted: sortedSoFar });
    }
    return animations;
}
