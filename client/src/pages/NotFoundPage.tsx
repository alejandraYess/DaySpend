import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-7xl font-bold text-gray-200 dark:text-zinc-800">404</p>
      <p className="text-gray-500 dark:text-zinc-500 text-sm">Esta página no existe</p>
      <Link
        to="/"
        className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
