# Rutas y navegación

La app usa React Router para moverse entre páginas sin que el navegador se recargue.

## Páginas

La ruta `/` muestra el Resumen, que es la pantalla principal con el total gastado y el desglose por categoría.

La ruta `/expenses` muestra la lista de gastos con los filtros de fecha y categoría.

La ruta `/expenses/new` abre el formulario para añadir un gasto nuevo.

La ruta `/expenses/:id/edit` abre el mismo formulario pero con los datos del gasto ya cargados para editarlo.

Cualquier ruta que no exista muestra la página 404 con un enlace para volver al inicio.

## Navegación

La cabecera tiene los enlaces principales. El que corresponde a la página activa se muestra en verde. El botón "+ Añadir" lleva directamente al formulario de nuevo gasto.

Desde la lista, el botón "Editar" de cada fila navega al formulario de edición con el id del gasto en la URL. Cuando se guarda el formulario, la app redirige automáticamente a la lista de gastos.
