import { useMemo } from 'react';
import type { ChartData30Days } from '../../data/kpiData';
import { deriveKpiSummary } from '../utils/deriveKpiSummary';
import { KpiCard } from './KpiCard';

export interface KpiSummarySectionProps {
  revenueTrend: ChartData30Days[];
}

export const KpiSummarySection = ({ revenueTrend }: KpiSummarySectionProps) => {
  const summary = useMemo(() => deriveKpiSummary(revenueTrend), [revenueTrend]);

  return (
    <div className="dashboard__kpi-row">
      {summary.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
};
