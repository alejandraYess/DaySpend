import type { Request, Response } from 'express';
import * as service from '../services/expenses.service';
import { CATEGORIES } from '../types';
import type { CreateExpenseDto, UpdateExpenseDto } from '../types';

export function listExpenses(req: Request, res: Response): void {
  const { from, to, category } = req.query as Record<string, string | undefined>;
  res.json(service.getExpenses(from, to, category));
}

export function getExpense(req: Request, res: Response): void {
  const expense = service.getExpenseById(req.params['id'] as string);
  if (!expense) {
    res.status(404).json({ error: 'Gasto no encontrado' });
    return;
  }
  res.json(expense);
}

export function createExpense(req: Request, res: Response): void {
  const { amount, category, date, description } = req.body as CreateExpenseDto;

  if (!amount || amount <= 0) {
    res.status(400).json({ error: 'amount debe ser un número positivo' });
    return;
  }
  if (!category || !CATEGORIES.includes(category)) {
    res.status(400).json({ error: 'category no válida' });
    return;
  }
  if (!date || !/^\d{4}-\d{2}-\d{2}/.test(date)) {
    res.status(400).json({ error: 'date debe tener formato YYYY-MM-DD' });
    return;
  }

  const expense = service.createExpense({ amount, category, date, description });
  res.status(201).json(expense);
}

export function updateExpense(req: Request, res: Response): void {
  const dto = req.body as UpdateExpenseDto;

  if (dto.amount !== undefined && dto.amount <= 0) {
    res.status(400).json({ error: 'amount debe ser un número positivo' });
    return;
  }
  if (dto.category !== undefined && !CATEGORIES.includes(dto.category)) {
    res.status(400).json({ error: 'category no válida' });
    return;
  }

  const updated = service.updateExpense(req.params['id'] as string, dto);
  if (!updated) {
    res.status(404).json({ error: 'Gasto no encontrado' });
    return;
  }
  res.json(updated);
}

export function deleteExpense(req: Request, res: Response): void {
  const deleted = service.deleteExpense(req.params['id'] as string);
  if (!deleted) {
    res.status(404).json({ error: 'Gasto no encontrado' });
    return;
  }
  res.status(200).json({ message: 'Gasto eliminado' });
}
