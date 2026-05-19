import express from 'express';
import cors from 'cors';
import { PORT } from './config';
import expensesRouter from './routes/expenses.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/expenses', expensesRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
