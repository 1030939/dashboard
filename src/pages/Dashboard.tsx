import { useEffect, useMemo, useState } from 'react';
import { mockData } from '../../data/kpiData';
import { CountryRatioChart } from '../components/charts/CountryRatioChart';
import { RevenueCompositionChart } from '../components/charts/RevenueCompositionChart';
import { RevenueTrendChart } from '../components/charts/RevenueTrendChart';
import { KpiSummarySection } from '../components/KpiSummarySection';
import { RecentPurchaseTable } from '../components/RecentPurchaseTable';
import { sliceByPeriod, type DataPeriod } from '../utils/filterByPeriod';
import './Dashboard.css';

export type PeriodFilter = DataPeriod | 'custom';

const PERIOD_OPTIONS: { value: PeriodFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'today', label: '오늘' },
  { value: '7days', label: '7일' },
  { value: '30days', label: '30일' },
  { value: 'custom', label: '커스텀' },
];

const PERIOD_TITLE_PREFIX: Record<DataPeriod, string> = {
  all: '전체',
  today: '오늘',
  '7days': '7일',
  '30days': '30일',
};

export const Dashboard = () => {
  const [period, setPeriod] = useState<DataPeriod>('all');
  const [isDark, setIsDark] = useState(false);

  const titlePrefix = PERIOD_TITLE_PREFIX[period];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const filteredData = useMemo(
    () => ({
      revenueTrend: sliceByPeriod(mockData.revenueTrend, period),
      recentPurchases: sliceByPeriod(mockData.recentPurchases, period),
      countryRatio: mockData.countryRatio,
    }),
    [period],
  );

  const handlePeriodClick = (value: PeriodFilter) => {
    if (value === 'custom') {
      window.alert('사용자 지정 기간 설정 달력 UI가 호출됩니다.');
      return;
    }
    setPeriod(value);
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header-main">
          <h1 className="dashboard__title">게임 서비스 KPI 대시보드</h1>
          <div className="dashboard__period-filter" role="group" aria-label="기간 선택">
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`dashboard__period-btn ${
                  period === option.value ? 'dashboard__period-btn--active' : ''
                }`}
                onClick={() => handlePeriodClick(option.value)}
                aria-pressed={period === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="dashboard__theme-toggle"
          onClick={() => setIsDark((prev) => !prev)}
          aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          title={isDark ? '라이트 모드' : '다크 모드'}
        >
          <span className="dashboard__theme-icon" aria-hidden="true">
            {isDark ? '☀️' : '🌙'}
          </span>
        </button>
      </header>

      <section className="dashboard__zone dashboard__zone--a" aria-label="Zone A">
        <KpiSummarySection revenueTrend={filteredData.revenueTrend} />
      </section>

      <section className="dashboard__zone dashboard__zone--b" aria-label="Zone B">
        <div className="dashboard__chart-row">
          <RevenueTrendChart data={filteredData.revenueTrend} titlePrefix={titlePrefix} />
          <RevenueCompositionChart data={filteredData.revenueTrend} titlePrefix={titlePrefix} />
          <CountryRatioChart data={filteredData.countryRatio} />
        </div>
      </section>

      <section className="dashboard__zone dashboard__zone--c" aria-label="Zone C">
        <RecentPurchaseTable data={filteredData.recentPurchases} />
      </section>
    </div>
  );
};
