import path from 'path';

export const PORT = process.env.PORT ?? 3001;
export const DATA_FILE = path.join(__dirname, '../../data/expenses.json');
