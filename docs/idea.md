# DaySpend

Aplicación web fullstack para registrar gastos personales, ordenarlos por categorías fijas y ver un resumen claro del periodo que el usuario elija (totales y reparto por categoría).

## Descripción del proyecto

El usuario anota cada gasto con categoría, importe, fecha y una descripción corta opcional. Los gastos se guardan tras una API REST propia; el frontend muestra listas filtrables, formularios para alta y edición, un panel de resumen y una visualización sencilla del reparto (por ejemplo por categorías). Las categorías son una lista cerrada para que comparar semanas o meses sea directo: alimentación, transporte, salud o farmacia, hogar o servicios, ocio o salidas, ropa y cuidado personal, educación y otros.

## Problema que intenta resolver

El dinero suele quedar repartido entre banco, efectivo y comercios y clasificar después cansa; las etiquetas del banco no siempre ayudan y una hoja de cálculo exige constancia. La app concentra lo esencial en un solo lugar, con corrección y borrado cuando haga falta. No garantiza que se anote todo lo gastado; igual sirve para ver tendencias cuando se usa con regularidad.

## Usuarios objetivo

- Estudiantes y personas jóvenes con presupuesto ajustado que quieren control básico sin complicarse.
- Quienes usan tarjeta o efectivo a menudo y al cerrar el mes no tienen claro en qué se fue sobre todo el dinero.
- Perfiles que prefieren lista, filtros y un resumen legible frente a herramientas muy técnicas.

## Funcionalidades principales

- Registrar gasto con categoría, importe, fecha y descripción opcional; validación básica en formulario.
- Listar gastos con filtro por fechas y por categoría.
- Editar y eliminar gastos existentes.
- Resumen del periodo elegido: total gastado y desglose por categorías; gráfico o vista simple del reparto según el tiempo disponible.
- API REST con Express (consultar, crear, actualizar, eliminar), arquitectura por capas y persistencia simple sin obligar a base de datos en el primer alcance si el enunciado lo permite.
- Frontend con React, TypeScript y Tailwind; navegación entre pantallas; cliente de API tipado; en interfaz, estados de red de carga, éxito y error.

## Funcionalidades opcionales

- Límite o meta por categoría o mes con aviso al superarlo.
- Búsqueda por texto en descripciones.
- Exportar listado filtrado a CSV o JSON.

## Posibles mejoras futuras

- Registro e inicio de sesión para separar datos por usuario.
- Presupuestos o etiquetas extra (trabajo, ocio, etc.).
- Ingresos además de gastos para aproximar saldo o ahorro.
- Importación o conexión con bancos u otros servicios, como evolución posterior del proyecto.

## Repositorio en GitHub

https://github.com/alejandraYess/DaySpend
