import type { ChartData30Days, KPISummary } from '../../data/kpiData';

const dayTotalRevenue = (day: ChartData30Days): number =>
  day.newUserRevenue + day.existingUserRevenue;

/** 최신 일자 기준 DAU / MAU (차트 데이터에서 모킹) */
const deriveDauFromDay = (day: ChartData30Days): number =>
  Math.round(38000 + day.existingUserRevenue * 2.2);

const deriveMauFromDay = (day: ChartData30Days): number =>
  Math.round(100000 + day.newUserRevenue * 28);

const calcChangeRate = (current: number, previous: number): number =>
  previous > 0 ? Math.round(((current - previous) / previous) * 1000) / 10 : 0;

export const deriveKpiSummary = (revenueTrend: ChartData30Days[]): KPISummary[] => {
  const periodRevenue = revenueTrend.reduce((sum, day) => sum + dayTotalRevenue(day), 0);

  const latest = revenueTrend.at(-1);
  const previous = revenueTrend.at(-2);

  const latestDayRevenue = latest ? dayTotalRevenue(latest) : 0;
  const previousDayRevenue = previous ? dayTotalRevenue(previous) : latestDayRevenue;

  const dau = latest ? deriveDauFromDay(latest) : 0;
  const mau = latest ? deriveMauFromDay(latest) : 0;

  const previousDau = previous ? deriveDauFromDay(previous) : dau;
  const previousMau = previous ? deriveMauFromDay(previous) : mau;

  return [
    {
      title: '매출',
      value: periodRevenue,
      changeRate: calcChangeRate(latestDayRevenue, previousDayRevenue),
    },
    {
      title: 'DAU',
      value: dau,
      changeRate: calcChangeRate(dau, previousDau),
    },
    {
      title: 'MAU',
      value: mau,
      changeRate: calcChangeRate(mau, previousMau),
    },
  ];
};
