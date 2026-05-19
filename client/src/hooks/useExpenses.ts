import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/client';
import type { Expense } from '../types';

interface UseExpensesState {
  data: Expense[];
  loading: boolean;
  error: string | null;
}

export function useExpenses(from?: string, to?: string, category?: string) {
  const [state, setState] = useState<UseExpensesState>({
    data: [],
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    api
      .getExpenses({ from, to, category })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: [], loading: false, error: err.message }));
  }, [from, to, category]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, refetch: load };
}
