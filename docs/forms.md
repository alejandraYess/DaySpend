# Formularios e interacción

## Formulario de gasto

Es el único formulario de la app y sirve tanto para crear un gasto nuevo como para editar uno existente. Tiene cuatro campos: importe, categoría, fecha y descripción (esta última es opcional).

## Formulario controlado

Todos los campos están controlados con `useState`. Esto significa que cada vez que el usuario escribe o selecciona algo, el estado se actualiza y React vuelve a renderizar el campo con el nuevo valor. El estado del formulario es un objeto con los cuatro campos.

## Validación

Antes de enviar el formulario se comprueba que el importe sea un número mayor que cero y que la fecha no esté vacía. Si algo falla, se muestra un mensaje de error debajo del campo correspondiente en rojo. El formulario no se envía hasta que todo esté correcto.

## Edición

Cuando se accede al formulario con el id de un gasto en la URL, se hace una petición a la API para cargar sus datos y rellenar los campos automáticamente. El botón de guardar en ese caso dice "Guardar cambios" en lugar de "Añadir gasto".

## Confirmación y errores

Si el formulario se envía correctamente, la app redirige a la lista de gastos. Si la API devuelve un error, se muestra un aviso con el mensaje recibido.
