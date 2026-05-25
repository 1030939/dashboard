import type { KPISummary } from '../../data/kpiData';
import { formatKpiValue, formatNumber } from '../utils/formatters';
import './KpiCard.css';

export type KpiCardProps = KPISummary;

export const KpiCard = ({ title, value, changeRate }: KpiCardProps) => {
  const isPositive = changeRate >= 0;

  return (
    <article className="kpi-card">
      <h3 className="kpi-card__title">{title}</h3>
      <p className="kpi-card__value" title={formatNumber(value)}>
        {formatKpiValue(value)}
      </p>
      <p
        className={`kpi-card__change ${isPositive ? 'kpi-card__change--up' : 'kpi-card__change--down'}`}
      >
        {isPositive ? '+' : ''}
        {changeRate}% <span className="kpi-card__change-label">전일 대비</span>
      </p>
    </article>
  );
};
