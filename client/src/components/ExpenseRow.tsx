import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Expense } from '../types';
import { formatAmount, formatDate } from '../utils/format';
import CategoryBadge from './CategoryBadge';

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseRow({ expense, onDelete }: Props) {
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    navigate(`/expenses/${expense.id}/edit`);
  }, [navigate, expense.id]);

  const handleDelete = useCallback(() => {
    if (window.confirm('¿Eliminar este gasto?')) {
      onDelete(expense.id);
    }
  }, [onDelete, expense.id]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3.5 border-b border-gray-100 dark:border-zinc-800 last:border-0 gap-2">
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2">
          <CategoryBadge category={expense.category} />
          <span className="text-xs text-gray-400 dark:text-zinc-500">{formatDate(expense.date)}</span>
        </div>
        {expense.description && (
          <span className="text-sm text-gray-500 dark:text-zinc-400 truncate">{expense.description}</span>
        )}
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:ml-4 shrink-0">
        <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
          {formatAmount(expense.amount)}
        </span>
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="text-xs text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            type="button"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="text-xs text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
