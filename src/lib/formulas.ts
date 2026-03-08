
export const calculateRetirementExpense = (
  currentExpense: number,
  inflationRate: number,
  yearsToRetirement: number
): number => {
  return currentExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement);
};


export const calculateRetirementCorpus = (
  annualExpense: number,
  postRetirementReturn: number,
  retirementDuration: number
): number => {
  const r = postRetirementReturn / 100;
  const t = retirementDuration;
  
  if (r === 0) return annualExpense * t; 
  
  return annualExpense * ((1 - Math.pow(1 + r, -t)) / r);
};



export const calculateRequiredSIP = (
  targetCorpus: number,
  preRetirementReturn: number,
  yearsToRetirement: number
): number => {
  const r = (preRetirementReturn / 100) / 12; 
  const n = yearsToRetirement * 12; 
  
  if (r === 0) return targetCorpus / n;

  return (targetCorpus * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
};