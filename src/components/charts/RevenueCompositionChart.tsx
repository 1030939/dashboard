import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { BarRectangleItem } from 'recharts';
import type { ChartData30Days } from '../../../data/kpiData';
import { formatNumber } from '../../utils/formatters';
import {
  CARTESIAN_CHART_MARGIN,
  CHART_COLORS,
  CHART_LEGEND_PROPS,
  formatChartDate,
  getCalculatedTicks,
  X_AXIS_LABEL,
  Y_AXIS_LABEL,
} from './chartTheme';
import './charts.css';

export interface RevenueCompositionChartProps {
  data: ChartData30Days[];
  titlePrefix: string;
}

export const RevenueCompositionChart = ({
  data,
  titlePrefix,
}: RevenueCompositionChartProps) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const calculatedTicks = useMemo(() => getCalculatedTicks(data), [data]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleBarClick = useCallback((barItem: BarRectangleItem) => {
    const row = barItem.payload as ChartData30Days | undefined;
    if (!row?.date) return;

    const totalRevenue = row.newUserRevenue + row.existingUserRevenue;
    const newUserRatio =
      totalRevenue > 0 ? Math.round((row.newUserRevenue / totalRevenue) * 100) : 0;

    setToastMessage(
      `${row.date} 총 매출: ${formatNumber(totalRevenue)} (신규 유저 비중: ${newUserRatio}%)`,
    );
  }, []);

  return (
    <div className="chart-panel chart-panel--bar-clickable">
      <h3 className="chart-panel__title chart-panel__title--solo">
        {titlePrefix} 매출 구성 (유저 유형)
      </h3>
      <div className="chart-panel__body">
        {toastMessage && (
          <div className="chart-panel__toast" role="status" aria-live="polite">
            {toastMessage}
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={CARTESIAN_CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              ticks={calculatedTicks}
              tickFormatter={formatChartDate}
              interval={0}
              label={X_AXIS_LABEL}
            />
            <YAxis
              tickFormatter={(value) => formatNumber(Number(value))}
              label={Y_AXIS_LABEL}
            />
            <Tooltip
              labelFormatter={(label) => `날짜: ${label}`}
              formatter={(value, name) => [formatNumber(Number(value)), String(name)]}
            />
            <Legend {...CHART_LEGEND_PROPS} />
            <Bar
              dataKey="newUserRevenue"
              name="신규 유저"
              stackId="revenue"
              fill={CHART_COLORS.newUserRevenue}
              onClick={handleBarClick}
            />
            <Bar
              dataKey="existingUserRevenue"
              name="기존 유저"
              stackId="revenue"
              fill={CHART_COLORS.existingUserRevenue}
              radius={[4, 4, 0, 0]}
              onClick={handleBarClick}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
