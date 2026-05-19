export type Category =
  | 'alimentacion'
  | 'transporte'
  | 'salud'
  | 'hogar'
  | 'ocio'
  | 'ropa'
  | 'educacion'
  | 'otros';

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'alimentacion', label: 'Alimentación' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'salud', label: 'Salud / Farmacia' },
  { value: 'hogar', label: 'Hogar / Servicios' },
  { value: 'ocio', label: 'Ocio / Salidas' },
  { value: 'ropa', label: 'Ropa / Personal' },
  { value: 'educacion', label: 'Educación' },
  { value: 'otros', label: 'Otros' },
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
