import { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { useExpenses } from '../hooks/useExpenses';
import { deleteExpense } from '../api/client';
import ExpenseRow from '../components/ExpenseRow';
import Filters from '../components/Filters';
import StatusMessage from '../components/StatusMessage';

export default function ExpensesPage() {
  const { from, to, setFrom, setTo } = useFilter();
  const [category, setCategory] = useState('');
  const { data, loading, error, refetch } = useExpenses(from, to, category || undefined);

  async function handleDelete(id: string) {
    try {
      await deleteExpense(id);
      refetch();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100">Gastos</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">Filtra y gestiona tus gastos</p>
      </div>

      <Filters
        from={from}
        to={to}
        category={category}
        onFromChange={setFrom}
        onToChange={setTo}
        onCategoryChange={setCategory}
      />

      {loading && <StatusMessage variant="loading" />}
      {error && <StatusMessage variant="error" message={error} onRetry={refetch} />}

      {!loading && !error && data.length === 0 && (
        <StatusMessage variant="empty" message="Sin gastos con estos filtros." />
      )}

      {!loading && !error && data.length > 0 && (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-zinc-800 px-5 shadow-sm">
          {data.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
