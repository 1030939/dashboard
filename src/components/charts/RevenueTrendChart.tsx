import { useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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

export interface RevenueTrendChartProps {
  data: ChartData30Days[];
  titlePrefix: string;
}

export const RevenueTrendChart = ({ data, titlePrefix }: RevenueTrendChartProps) => {
  const calculatedTicks = useMemo(() => getCalculatedTicks(data), [data]);

  return (
    <div className="chart-panel">
      <h3 className="chart-panel__title chart-panel__title--solo">
        {titlePrefix} 매출 변화 (상품별)
      </h3>
      <div className="chart-panel__body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={CARTESIAN_CHART_MARGIN}>
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
            <Line
              type="monotone"
              dataKey="monthlyPass"
              name="월간 패스"
              stroke={CHART_COLORS.monthlyPass}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="package"
              name="패키지"
              stroke={CHART_COLORS.package}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="paidCurrency"
              name="유료 재화"
              stroke={CHART_COLORS.paidCurrency}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
