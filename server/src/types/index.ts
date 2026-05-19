export type Category =
  | 'alimentacion'
  | 'transporte'
  | 'salud'
  | 'hogar'
  | 'ocio'
  | 'ropa'
  | 'educacion'
  | 'otros';

export const CATEGORIES: Category[] = [
  'alimentacion',
  'transporte',
  'salud',
  'hogar',
  'ocio',
  'ropa',
  'educacion',
  'otros',
];

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: string;
  description: string;
}

export interface CreateExpenseDto {
  amount: number;
  category: Category;
  date: string;
  description?: string;
}

export interface UpdateExpenseDto {
  amount?: number;
  category?: Category;
  date?: string;
  description?: string;
}
