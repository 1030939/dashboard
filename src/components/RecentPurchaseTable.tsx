import { useMemo, useState } from 'react';
import type { RecentPurchase } from '../../data/kpiData';
import { formatNumber } from '../utils/formatters';
import './RecentPurchaseTable.css';

const PAGE_SIZE = 5;

type SortKey = keyof RecentPurchase;
type SortDirection = 'asc' | 'desc';
type CategoryFilter = 'all' | 'monthlyPass' | 'package' | 'paidCurrency';

export interface RecentPurchaseTableProps {
  data: RecentPurchase[];
}

type ColumnConfig = {
  key: SortKey;
  label: string;
  align: 'left' | 'center' | 'right';
  width: string;
};

const COLUMNS: ColumnConfig[] = [
  { key: 'id', label: '거래 ID', align: 'center', width: '15%' },
  { key: 'userName', label: '유저명', align: 'left', width: '20%' },
  { key: 'item', label: '상품명', align: 'left', width: '30%' },
  { key: 'amount', label: '결제 금액', align: 'right', width: '15%' },
  { key: 'date', label: '결제 일시', align: 'center', width: '20%' },
];

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'monthlyPass', label: '월간 패스' },
  { value: 'package', label: '패키지' },
  { value: 'paidCurrency', label: '유료 재화' },
];

const matchesCategory = (item: string, category: CategoryFilter): boolean => {
  if (category === 'all') return true;
  if (category === 'monthlyPass') return item.includes('패스');
  if (category === 'package') return item.includes('패키지');
  return !item.includes('패스') && !item.includes('패키지');
};

const compareValues = (
  a: RecentPurchase,
  b: RecentPurchase,
  key: SortKey,
  direction: SortDirection,
): number => {
  const multiplier = direction === 'asc' ? 1 : -1;

  if (key === 'amount') {
    return (a.amount - b.amount) * multiplier;
  }

  if (key === 'date') {
    return a.date.localeCompare(b.date) * multiplier;
  }

  return String(a[key]).localeCompare(String(b[key]), 'ko') * multiplier;
};

type SortIndicatorProps = {
  isActive: boolean;
  direction: SortDirection;
};

const SortIndicator = ({ isActive, direction }: SortIndicatorProps) => (
  <span className="purchase-table__sort-icons" aria-hidden="true">
    {isActive ? (
      <span className="purchase-table__sort-icon purchase-table__sort-icon--active">
        {direction === 'asc' ? '▲' : '▼'}
      </span>
    ) : (
      <span className="purchase-table__sort-icon purchase-table__sort-icon--hint">⇅</span>
    )}
  </span>
);

export const RecentPurchaseTable = ({ data }: RecentPurchaseTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSorted = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = data.filter((row) => {
      const matchesSearch =
        !query ||
        row.userName.toLowerCase().includes(query) ||
        row.item.toLowerCase().includes(query);
      const matchesCat = matchesCategory(row.item, categoryFilter);
      return matchesSearch && matchesCat;
    });

    return filtered.sort((a, b) => compareValues(a, b, sortKey, sortDirection));
  }, [data, searchQuery, categoryFilter, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));

  const safePage = Math.min(currentPage, totalPages);

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredAndSorted.slice(start, start + PAGE_SIZE);
  }, [filteredAndSorted, safePage]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection(key === 'date' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: CategoryFilter) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="purchase-table">
      <div className="purchase-table__toolbar">
        <h3 className="purchase-table__title">최근 구매 기록</h3>
        <div className="purchase-table__filters">
          <label className="purchase-table__category">
            <span className="purchase-table__filter-label">카테고리</span>
            <select
              className="purchase-table__category-select"
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value as CategoryFilter)}
              aria-label="상품 카테고리 필터"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="purchase-table__search">
            <span className="purchase-table__filter-label">검색</span>
            <input
              type="search"
              className="purchase-table__search-input"
              placeholder="유저명 또는 상품명"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="유저명 또는 상품명 검색"
            />
          </label>
        </div>
      </div>

      <div className="purchase-table__scroll">
        <table className="purchase-table__table">
          <colgroup>
            {COLUMNS.map((column) => (
              <col key={column.key} style={{ width: column.width }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {COLUMNS.map((column) => {
                const isActive = sortKey === column.key;
                return (
                  <th
                    key={column.key}
                    className={`purchase-table__th purchase-table__th--${column.align}`}
                  >
                    <button
                      type="button"
                      className={`purchase-table__sort-btn ${
                        isActive ? 'purchase-table__sort-btn--active' : ''
                      }`}
                      onClick={() => handleSort(column.key)}
                      aria-sort={
                        isActive
                          ? sortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                    >
                      {column.label}
                      <SortIndicator isActive={isActive} direction={sortDirection} />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.length > 0 ? (
              pageRows.map((row) => (
                <tr key={row.id} className="purchase-table__row">
                  <td className="purchase-table__td purchase-table__td--center">{row.id}</td>
                  <td className="purchase-table__td purchase-table__td--left">{row.userName}</td>
                  <td className="purchase-table__td purchase-table__td--left">{row.item}</td>
                  <td className="purchase-table__td purchase-table__td--right">
                    {formatNumber(row.amount)}
                  </td>
                  <td className="purchase-table__td purchase-table__td--center">{row.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="purchase-table__empty" colSpan={COLUMNS.length}>
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className="purchase-table__pagination" aria-label="페이지 이동">
        <button
          type="button"
          className="purchase-table__page-btn"
          onClick={() => goToPage(safePage - 1)}
          disabled={safePage <= 1}
        >
          이전
        </button>
        <div className="purchase-table__page-numbers">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                type="button"
                className={`purchase-table__page-num ${
                  page === safePage ? 'purchase-table__page-num--active' : ''
                }`}
                onClick={() => goToPage(page)}
                aria-current={page === safePage ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="purchase-table__page-btn"
          onClick={() => goToPage(safePage + 1)}
          disabled={safePage >= totalPages}
        >
          다음
        </button>
      </nav>
    </div>
  );
};
