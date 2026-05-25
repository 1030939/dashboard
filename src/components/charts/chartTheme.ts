export const CHART_HEIGHT = 350;

/** X축 라벨: '2024-05-01' → '05-01' (MM-DD) */
export const formatChartDate = (date: string): string => date.slice(5);

type DateSeriesItem = { date: string };

/** 기간별 X축 tick — 7일 이하 전체 / 30일 5개 / 90일 7개 */
export const getCalculatedTicks = (data: DateSeriesItem[]): string[] => {
  if (data.length <= 7) {
    return data.map((item) => item.date);
  }

  if (data.length === 30) {
    const last = data.length - 1;
    const indices = [
      0,
      Math.round(last / 4),
      Math.round(last / 2),
      Math.round((last * 3) / 4),
      last,
    ];
    return indices.map((index) => data[index].date);
  }

  const step = (data.length - 1) / 6;
  return Array.from({ length: 7 }, (_, i) => {
    const index = i === 6 ? data.length - 1 : Math.round(i * step);
    return data[index].date;
  });
};

export const CHART_COLORS = {
  monthlyPass: '#aa3bff',
  package: '#3b82f6',
  paidCurrency: '#14b8a6',
  newUserRevenue: '#f59e0b',
  existingUserRevenue: '#6366f1',
  country: ['#aa3bff', '#3b82f6', '#14b8a6', '#94a3b8'],
} as const;

export const COUNTRY_LABELS: Record<string, string> = {
  KR: '한국 (KR)',
  US: '미국 (US)',
  JP: '일본 (JP)',
  ETC: '기타',
};

const axisLabelStyle = { fontSize: 12, fill: 'var(--text)' };

export const X_AXIS_LABEL = {
  value: '날짜',
  position: 'insideBottom' as const,
  offset: 0,
  style: axisLabelStyle,
};

export const Y_AXIS_LABEL = {
  value: '일 매출',
  position: 'top' as const,
  offset: 20,
  angle: 0,
  fill: '#666',
  fontSize: 12,
};

/** Line · Bar — Y축 라벨·최상단 눈금 겹침 방지 */
export const CARTESIAN_CHART_MARGIN = {
  top: 45,
  right: 30,
  left: 20,
  bottom: 5,
};

/** Pie — 우측 슬라이스 라벨 잘림 방지 (크기 유지) */
export const PIE_CHART_MARGIN = {
  top: 4,
  right: 40,
  left: 18,
  bottom: 24,
};

export const CHART_LEGEND_PROPS = {
  verticalAlign: 'top' as const,
  align: 'right' as const,
  height: 24,
  wrapperStyle: { paddingBottom: 0 },
};
