import type { Category } from '../types';
import { CATEGORIES } from '../types';

const COLOR_MAP: Record<Category, string> = {
  alimentacion: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 dark:ring-1 dark:ring-emerald-700',
  transporte:   'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 dark:ring-1 dark:ring-blue-700',
  salud:        'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 dark:ring-1 dark:ring-red-700',
  hogar:        'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300 dark:ring-1 dark:ring-orange-700',
  ocio:         'bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-300 dark:ring-1 dark:ring-violet-700',
  ropa:         'bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-300 dark:ring-1 dark:ring-pink-700',
  educacion:    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-300 dark:ring-1 dark:ring-yellow-700',
  otros:        'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-1 dark:ring-zinc-600',
};

interface Props {
  category: Category;
}

export default function CategoryBadge({ category }: Props) {
  const label = CATEGORIES.find((c) => c.value === category)?.label ?? category;
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${COLOR_MAP[category]}`}>
      {label}
    </span>
  );
}
