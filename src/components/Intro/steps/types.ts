export type StepsComponentType = {
  currentStep: number;
  stepLocks: number[];
  setStepLocks: (param: number[]) => void;
};
