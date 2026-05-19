# Hooks

## useState

Se usa para guardar y actualizar valores dentro de un componente. Cuando el valor cambia, el componente se vuelve a renderizar con el nuevo valor. En la app se usa para guardar el estado del formulario, el modo de vista del gráfico, la categoría seleccionada en el filtro y los estados de carga y error.

## useEffect

Se ejecuta después de que el componente se renderiza. Se usa para hacer acciones que dependen de cambios externos, como llamadas a la API. En la app se usa en el hook personalizado `useExpenses` para cargar los gastos cuando cambian los filtros, y en el formulario para cargar los datos de un gasto cuando se va a editar.

## useMemo

Memoriza el resultado de un cálculo para no repetirlo en cada render si las dependencias no han cambiado. En la app se usa en el Resumen para calcular el total del periodo y el desglose por categoría a partir de la lista de gastos ya cargada.

## useCallback

Memoriza una función para que su referencia no cambie en cada render. Esto evita que los componentes hijos que la reciben como prop se vuelvan a renderizar sin necesidad. En la app se usa en `ExpenseRow` para las funciones de editar y eliminar, y en `useExpenses` para la función `load` que hace la petición a la API.

## useExpenses (custom hook)

Es el hook personalizado de la app. Encapsula toda la lógica de carga de gastos desde la API: gestiona los tres estados de red (loading, data y error), acepta filtros de fecha y categoría como parámetros, y expone también una función `refetch` para recargar los datos manualmente. Se usa en la pantalla de Resumen y en la de Gastos.
