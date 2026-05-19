# Componentes

## Layout

Es el componente que envuelve toda la aplicación. Contiene la cabecera con el logo, los enlaces de navegación y el botón para añadir un gasto. También incluye el switch de modo claro y oscuro. Todas las páginas se renderizan dentro de él.

## CategoryBadge

Muestra la categoría de un gasto como una pequeña etiqueta de color. Recibe la categoría como prop y según su valor aplica un color diferente. Se usa en las filas de gastos y en el gráfico circular.

## ExpenseRow

Representa una fila de la lista de gastos. Muestra la categoría, la fecha, la descripción opcional y el importe. Incluye botones para editar y eliminar el gasto. Recibe el objeto gasto y una función onDelete como props.

## Filters

Bloque de filtros con tres campos: fecha de inicio, fecha de fin y categoría. Se usa tanto en la pantalla de Resumen como en la de Gastos para filtrar los datos que se muestran.

## StatusMessage

Componente reutilizable que muestra tres estados posibles: carga (con spinner), error (con mensaje y botón de reintentar) y lista vacía (con mensaje informativo). Se usa en todas las pantallas que hacen peticiones a la API.

## DonutChart

Gráfico circular que muestra el desglose de gastos por categoría. Está hecho con SVG sin ninguna librería externa. Recibe el total y el mapa de importes por categoría. Cada sector tiene el color de su categoría y hay una leyenda con el porcentaje e importe al lado.
