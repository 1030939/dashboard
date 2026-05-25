export type DataPeriod = 'all' | 'today' | '7days' | '30days';

export const sliceByPeriod = <T,>(items: T[], period: DataPeriod): T[] => {
  switch (period) {
    case 'all':
      return items;
    case 'today':
      return items.slice(-1);
    case '7days':
      return items.slice(-7);
    case '30days':
      return items.slice(-30);
  }
};
