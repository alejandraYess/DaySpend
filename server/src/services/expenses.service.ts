import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { DATA_FILE } from '../config';
import type { Expense, CreateExpenseDto, UpdateExpenseDto } from '../types';

function readAll(): Expense[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Expense[];
}

function writeAll(expenses: Expense[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2), 'utf-8');
}

export function getExpenses(from?: string, to?: string, category?: string): Expense[] {
  let list = readAll();
  if (from) list = list.filter((e) => e.date >= from);
  if (to) list = list.filter((e) => e.date <= to);
  if (category) list = list.filter((e) => e.category === category);
  return list;
}

export function getExpenseById(id: string): Expense | undefined {
  return readAll().find((e) => e.id === id);
}

export function createExpense(dto: CreateExpenseDto): Expense {
  const list = readAll();
  const expense: Expense = { id: uuidv4(), ...dto, description: dto.description ?? '' };
  list.push(expense);
  writeAll(list);
  return expense;
}

export function updateExpense(id: string, dto: UpdateExpenseDto): Expense | null {
  const list = readAll();
  const idx = list.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...dto };
  writeAll(list);
  return list[idx];
}

export function deleteExpense(id: string): boolean {
  const list = readAll();
  const idx = list.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  list.splice(idx, 1);
  writeAll(list);
  return true;
}
