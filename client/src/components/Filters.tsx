import { CATEGORIES } from '../types';
import type { Category } from '../types';

interface Props {
  from: string;
  to: string;
  category: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

const inputClass =
  'bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-gray-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors w-full';

export default function Filters({
  from,
  to,
  category,
  onFromChange,
  onToChange,
  onCategoryChange,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-zinc-500">Desde</label>
        <input
          type="date"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-zinc-500">Hasta</label>
        <input
          type="date"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
        <label className="text-xs text-gray-500 dark:text-zinc-500">Categoría</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Todas</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value as Category}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
