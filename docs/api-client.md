# Capa de red en el frontend

## Cliente de API

En `src/api/client.ts` están todas las funciones que se comunican con el backend. En vez de escribir el fetch en cada componente, se hace desde aquí y cada función devuelve los datos ya tipados con TypeScript.

Las funciones disponibles son: obtener todos los gastos, obtener uno por id, crear, actualizar y eliminar.

## Tipos

En `src/types/index.ts` están definidas las interfaces de los datos: qué campos tiene un gasto, qué se necesita para crearlo y qué se puede cambiar al editarlo. Están alineados con lo que devuelve el backend para que no haya diferencias entre los dos lados.

## Estados de red

Cada vez que se piden datos a la API se gestionan tres situaciones:

- **Cargando**: se muestra un spinner mientras llega la respuesta
- **Éxito**: se muestran los datos en pantalla
- **Error**: se muestra un mensaje con opción de reintentar

Esto lo gestiona el hook `useExpenses`, que expone `loading`, `data` y `error`.

## Fuente de verdad

Los gastos solo viven en el servidor. El frontend siempre consulta la API y no guarda datos de negocio en el navegador.
