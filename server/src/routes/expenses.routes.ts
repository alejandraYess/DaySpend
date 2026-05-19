import { Router } from 'express';
import * as ctrl from '../controllers/expenses.controller';

const router = Router();

router.get('/', ctrl.listExpenses);
router.get('/:id', ctrl.getExpense);
router.post('/', ctrl.createExpense);
router.patch('/:id', ctrl.updateExpense);
router.delete('/:id', ctrl.deleteExpense);

export default router;
