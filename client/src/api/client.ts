import type { Expense, CreateExpenseDto, UpdateExpenseDto } from '../types';

const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3001/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data: unknown = await res.json();
  if (!res.ok) throw new Error((data as { error: string }).error ?? 'Error desconocido');
  return data as T;
}

export function getExpenses(params?: {
  from?: string;
  to?: string;
  category?: string;
}): Promise<Expense[]> {
  const entries = Object.entries(params ?? {}).filter(([, v]) => !!v) as [string, string][];
  const qs = entries.length ? '?' + new URLSearchParams(entries).toString() : '';
  return request<Expense[]>(`/expenses${qs}`);
}

export function getExpense(id: string): Promise<Expense> {
  return request<Expense>(`/expenses/${id}`);
}

export function createExpense(dto: CreateExpenseDto): Promise<Expense> {
  return request<Expense>('/expenses', { method: 'POST', body: JSON.stringify(dto) });
}

export function updateExpense(id: string, dto: UpdateExpenseDto): Promise<Expense> {
  return request<Expense>(`/expenses/${id}`, { method: 'PATCH', body: JSON.stringify(dto) });
}

export function deleteExpense(id: string): Promise<void> {
  return request<void>(`/expenses/${id}`, { method: 'DELETE' });
}
