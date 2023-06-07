export const checkNullish = (test: any) => {
  if (!!test && test !== 'undefined' && test !== 'null') return test;
  else return undefined;
};
