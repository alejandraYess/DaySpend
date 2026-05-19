import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100'
    }`;

  return (
    <div className="min-h-dvh">
      <header className="bg-white dark:bg-[#161b22] border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-emerald-500 text-2xl">◈</span>
            <span className="text-3xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">
              DaySpend
            </span>
          </div>
          <nav className="flex items-center gap-3 sm:gap-5">
            <NavLink to="/" end className={linkClass}>
              Resumen
            </NavLink>
            <NavLink to="/expenses" className={linkClass}>
              Gastos
            </NavLink>
            <NavLink
              to="/expenses/new"
              className="text-xs sm:text-sm font-semibold bg-emerald-600 text-white px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-emerald-500 transition-colors whitespace-nowrap"
            >
              + Añadir
            </NavLink>
            <button
              onClick={toggle}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="flex items-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span className="text-xs text-gray-900 dark:text-white">☀</span>
              <div className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-600' : 'bg-emerald-500'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${theme === 'dark' ? 'translate-x-0.5' : 'translate-x-4'}`} />
              </div>
              <span className="text-xs text-gray-900 dark:text-white">☽</span>
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-6 sm:py-8">{children}</main>
    </div>
  );
}
