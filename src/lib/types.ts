export type SortingAlgorithmType = 'bubble' | 'merge' | 'quick' | 'selection' | 'insertion';

export type AnimationStep = {
  comparison?: [number, number];
  swap?: [number, number];
  overwrite?: [number, number]; // [index, value]
  pivot?: number;
  sorted?: number[];
};
