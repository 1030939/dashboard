import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { CountryRevenue } from '../../../data/kpiData';
import { COUNTRY_LABELS, CHART_COLORS, PIE_CHART_MARGIN } from './chartTheme';
import './charts.css';

export interface CountryRatioChartProps {
  data: CountryRevenue[];
}

export const CountryRatioChart = ({ data }: CountryRatioChartProps) => {
  return (
    <div className="chart-panel">
      <h3 className="chart-panel__title chart-panel__title--solo">국가별 매출 비율</h3>
      <div className="chart-panel__body">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={PIE_CHART_MARGIN}>
            <Pie
              data={data}
              dataKey="ratio"
              nameKey="country"
              cx="50%"
              cy="50%"
              innerRadius="54%"
              outerRadius="80%"
              paddingAngle={2}
              label={(props) => {
                const entry = props.payload as CountryRevenue;
                return `${entry.country} ${entry.ratio}%`;
              }}
              labelLine={{ stroke: 'var(--text)', strokeWidth: 1 }}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.country}
                  fill={CHART_COLORS.country[index % CHART_COLORS.country.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, _name, item) => [
                `${value}%`,
                COUNTRY_LABELS[String(item.payload.country)] ??
                  String(item.payload.country),
              ]}
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value) => COUNTRY_LABELS[String(value)] ?? String(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
