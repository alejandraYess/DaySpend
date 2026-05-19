# Backend y API

El backend está en la carpeta `server/` del mismo repositorio. Usa Node.js con Express. Los gastos se guardan en un archivo JSON en disco, sin base de datos.

Está organizado en capas: las rutas reciben las peticiones HTTP, los controladores las procesan y los servicios hacen el trabajo con los datos.

## Endpoints

Todos empiezan por `/api/v1/expenses`.

**GET /api/v1/expenses**
Devuelve todos los gastos. Se puede filtrar por fecha y categoría con parámetros en la URL.

**GET /api/v1/expenses/:id**
Devuelve un gasto concreto por su id.

**POST /api/v1/expenses**
Crea un gasto nuevo. Hay que enviar el importe, la categoría y la fecha. La descripción es opcional. Devuelve el gasto creado.

**PATCH /api/v1/expenses/:id**
Actualiza los datos de un gasto existente.

**DELETE /api/v1/expenses/:id**
Elimina un gasto por su id.

## Códigos de respuesta

- 200: todo fue bien
- 201: gasto creado correctamente
- 400: los datos enviados no son válidos
- 404: el gasto no existe
- 500: error del servidor
