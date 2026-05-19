import { createContext, useContext, useState } from 'react';

interface FilterContextValue {
  from: string;
  to: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function firstOfMonthISO(): string {
  return todayISO().slice(0, 7) + '-01';
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [from, setFrom] = useState(firstOfMonthISO());
  const [to, setTo] = useState(todayISO());

  return (
    <FilterContext.Provider value={{ from, to, setFrom, setTo }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter(): FilterContextValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilter debe usarse dentro de FilterProvider');
  return ctx;
}
