export const universe = (sets: string[][]) => {
  const elements: string[] = [];
  sets.forEach((set) => {
    set.forEach((item) => {
      elements.push(item);
    });
  });

  const universe = new Set([...elements]);
  return Array.from(universe);
};

export const union = (firstSet: string[], secondSet: string[]) => {
  const union = new Set([...firstSet, ...secondSet]);
  return Array.from(union);
};

export const intersection = (firstSet: string[], secondSet: string[]) => {
  const intersection = new Set(
    [...firstSet].filter((x) => secondSet.includes(x))
  );
  return Array.from(intersection);
};

export const complement = (sets: string[][], set: string[]) => {
  const complement = difference(universe(sets), set);
  return Array.from(complement);
};

export const difference = (firstSet: string[], secondSet: string[]) => {
  const difference = new Set(
    [...firstSet].filter((x) => !secondSet.includes(x))
  );
  return Array.from(difference);
};

export const powerset = (set: string[]) => {
  const powerset = set.reduce(
    (subsets: any, value: any) =>
      subsets.concat(subsets.map((set: any) => [...set, value])),
    [[]]
  );
  return Array.from(powerset as any[]);
};
