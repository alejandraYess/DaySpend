import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createExpense, getExpense, updateExpense } from '../api/client';
import { CATEGORIES } from '../types';
import type { Category } from '../types';

interface FormState {
  amount: string;
  category: Category;
  date: string;
  description: string;
}

const DEFAULT_FORM: FormState = {
  amount: '',
  category: 'otros',
  date: new Date().toISOString().slice(0, 10),
  description: '',
};

const inputClass =
  'bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors w-full placeholder-gray-400 dark:placeholder-zinc-600';

export default function ExpenseFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<FormState>>({});

  useEffect(() => {
    if (!id) return;
    getExpense(id)
      .then((e) =>
        setForm({
          amount: String(e.amount),
          category: e.category,
          date: e.date,
          description: e.description,
        })
      )
      .catch((err: Error) => setLoadError(err.message));
  }, [id]);

  function validate(): boolean {
    const errors: Partial<FormState> = {};
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      errors.amount = 'Introduce un importe válido mayor que 0';
    }
    if (!form.date) errors.date = 'La fecha es obligatoria';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const dto = {
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        description: form.description || undefined,
      };
      if (isEdit && id) {
        await updateExpense(id, dto);
      } else {
        await createExpense(dto);
      }
      navigate('/expenses');
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadError) {
    return <p className="text-red-500 text-sm py-6">{loadError}</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100">
          {isEdit ? 'Editar gasto' : 'Nuevo gasto'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">
          {isEdit ? 'Modifica los datos del gasto' : 'Registra un nuevo gasto'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-zinc-800 p-5 sm:p-6 flex flex-col gap-5 shadow-sm"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Importe (€)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            className={inputClass}
            placeholder="0.00"
          />
          {fieldErrors.amount && (
            <span className="text-xs text-red-500">{fieldErrors.amount}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Categoría</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Fecha</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className={inputClass}
          />
          {fieldErrors.date && (
            <span className="text-xs text-red-500">{fieldErrors.date}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
            Descripción{' '}
            <span className="text-gray-400 dark:text-zinc-600 normal-case tracking-normal">(opcional)</span>
          </label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className={inputClass}
            placeholder="Ej: Supermercado Mercadona"
          />
        </div>

        <div className="flex items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="bg-emerald-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-emerald-500 disabled:opacity-40 transition-colors"
          >
            {submitting ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Añadir gasto'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
