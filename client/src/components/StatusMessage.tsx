interface LoadingProps {
  variant: 'loading';
}

interface ErrorProps {
  variant: 'error';
  message: string;
  onRetry?: () => void;
}

interface EmptyProps {
  variant: 'empty';
  message?: string;
}

type Props = LoadingProps | ErrorProps | EmptyProps;

export default function StatusMessage(props: Props) {
  if (props.variant === 'loading') {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-gray-400 dark:text-zinc-500 text-sm">
        <span className="inline-block w-4 h-4 border-2 border-gray-300 dark:border-zinc-600 border-t-emerald-500 rounded-full animate-spin" />
        Cargando...
      </div>
    );
  }

  if (props.variant === 'error') {
    return (
      <div className="flex flex-col items-center py-12 gap-3">
        <p className="text-red-500 dark:text-red-400 text-sm">{props.message}</p>
        {props.onRetry && (
          <button
            onClick={props.onRetry}
            className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            type="button"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center py-12 text-gray-400 dark:text-zinc-600 text-sm">
      {props.message ?? 'No hay datos.'}
    </div>
  );
}
