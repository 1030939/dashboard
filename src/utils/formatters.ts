const COMPACT_THRESHOLD = 1_000_000;
const MAN = 10_000;
const EOK = 100_000_000;

export const formatNumber = (value: number): string =>
  value.toLocaleString('ko-KR');

/** 100만 이상이면 '1억 2,500만' 형태로 축약 표시 */
export const formatKpiValue = (value: number): string => {
  if (Math.abs(value) < COMPACT_THRESHOLD) {
    return formatNumber(value);
  }
  return formatCompactKorean(value);
};

const formatCompactKorean = (value: number): string => {
  const sign = value < 0 ? '-' : '';
  let remaining = Math.abs(value);
  const parts: string[] = [];

  const eok = Math.floor(remaining / EOK);
  if (eok > 0) {
    parts.push(`${eok.toLocaleString('ko-KR')}억`);
    remaining %= EOK;
  }

  const man = Math.floor(remaining / MAN);
  if (man > 0) {
    parts.push(`${man.toLocaleString('ko-KR')}만`);
    remaining %= MAN;
  }

  if (remaining > 0) {
    parts.push(formatNumber(remaining));
  }

  return parts.length > 0 ? sign + parts.join(' ') : formatNumber(value);
};
