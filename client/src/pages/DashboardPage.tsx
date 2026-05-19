import { useMemo, useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { useExpenses } from '../hooks/useExpenses';
import { CATEGORIES } from '../types';
import { formatAmount } from '../utils/format';
import { CATEGORY_COLORS } from '../utils/colors';
import Filters from '../components/Filters';
import StatusMessage from '../components/StatusMessage';
import DonutChart from '../components/DonutChart';

type ViewMode = 'bars' | 'donut';

export default function DashboardPage() {
  const { from, to, setFrom, setTo } = useFilter();
  const { data, loading, error, refetch } = useExpenses(from, to);
  const [viewMode, setViewMode] = useState<ViewMode>('bars');

  const total = useMemo(() => data.reduce((sum, e) => sum + e.amount, 0), [data]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of data) {
      map[e.category] = (map[e.category] ?? 0) + e.amount;
    }
    return map;
  }, [data]);

  const categoriesWithData = CATEGORIES.filter((c) => byCategory[c.value]);

  const tabClass = (mode: ViewMode) =>
    `text-xs px-3 py-1 rounded-md font-medium transition-colors ${
      viewMode === mode
        ? 'bg-gray-200 text-gray-900 dark:bg-zinc-700 dark:text-zinc-100'
        : 'text-gray-500 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300'
    }`;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100">Resumen</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">Tus gastos en el periodo seleccionado</p>
      </div>

      {loading && <StatusMessage variant="loading" />}
      {error && <StatusMessage variant="error" message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            {/* Tarjeta total */}
            <div className="relative bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-zinc-800 p-5 sm:p-6 shadow-md overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-2xl" />
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💰</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                  Total gastado
                </span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                {formatAmount(total)}
              </p>
              <p className="text-xs text-gray-400 dark:text-zinc-600 mt-3">
                {data.length} {data.length === 1 ? 'gasto registrado' : 'gastos registrados'}
              </p>
            </div>

            {/* Tarjeta periodo */}
            <div className="lg:col-span-2 bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-zinc-800 p-5 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">📅</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                  Selecciona el periodo
                </span>
              </div>
              <Filters
                from={from}
                to={to}
                category=""
                onFromChange={setFrom}
                onToChange={setTo}
                onCategoryChange={() => undefined}
              />
            </div>
          </div>

          {data.length === 0 ? (
            <StatusMessage variant="empty" message="Sin gastos en este periodo." />
          ) : (
            <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-md">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                    Desglose por categoría
                  </span>
                </div>
                <div className="flex gap-1 bg-gray-100 dark:bg-zinc-900 rounded-lg p-0.5">
                  <button className={tabClass('bars')} onClick={() => setViewMode('bars')}>
                    Barras
                  </button>
                  <button className={tabClass('donut')} onClick={() => setViewMode('donut')}>
                    Circular
                  </button>
                </div>
              </div>

              {viewMode === 'bars' && (
                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {categoriesWithData.map((c) => {
                    const amount = byCategory[c.value] ?? 0;
                    const pct = total > 0 ? Math.round((amount / total) * 100) : 0;
                    return (
                      <div key={c.value} className="flex items-center gap-3 px-4 sm:px-5 py-3.5">
                        <span className="text-sm text-gray-700 dark:text-zinc-300 w-28 sm:w-36 shrink-0 truncate">
                          {c.label}
                        </span>
                        <div className="flex-1 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, backgroundColor: CATEGORY_COLORS[c.value] }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 dark:text-zinc-500 w-7 text-right shrink-0">{pct}%</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100 w-16 sm:w-20 text-right shrink-0">
                          {formatAmount(amount)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {viewMode === 'donut' && (
                <DonutChart byCategory={byCategory} total={total} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
