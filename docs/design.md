# Arquitectura de DaySpend

Este documento resume cómo está pensada la aplicación en frontend, backend y comunicación entre ambos. Sirve de guía antes de implementar el detalle en código.

## Visión general

El navegador ejecuta el cliente React en la carpeta `client`. Las operaciones sobre gastos pasan por HTTP hacia un servidor Node con Express en `server` (pendiente de implementar según el mismo repo). Los gastos son la fuente de verdad en el servidor; el cliente solo muestra y envía cambios.

## Flujo de datos (simple)

```
Usuario → pantallas React → cliente API (fetch) → rutas Express → controladores → servicios → almacenamiento (archivo JSON u otra persistencia simple)
                ↑                                                                  |
                └──────────────── JSON respuestas ─────────────────────────────────┘
```

Las flechas son peticiones y respuestas HTTP en JSON. No hay base de datos obligatoria en el primer alcance: el servicio puede leer y escribir un fichero en disco con la lista de gastos.

## Backend y API REST

Prefijo propuesto: `/api/v1`. Recurso principal: gastos (`expenses`).

Modelo de gasto (conceptual):

- `id`: string generado en servidor
- `amount`: número positivo (importe)
- `category`: una de las categorías cerradas del dominio (alimentación, transporte, salud o farmacia, hogar o servicios, ocio o salidas, ropa y cuidado personal, educación, otros)
- `date`: fecha en formato ISO (`YYYY-MM-DD` o instante ISO8601, se unifica en implementación)
- `description`: string opcional, puede ir vacío

Endpoints previstos:

| Método | Ruta | Uso |
|--------|------|-----|
| GET | `/api/v1/expenses` | Lista gastos. Query opcional: `from`, `to` (fechas), `category` |
| GET | `/api/v1/expenses/:id` | Un gasto por id |
| POST | `/api/v1/expenses` | Crear gasto. Cuerpo JSON con amount, category, date, description opcional |
| PATCH | `/api/v1/expenses/:id` | Actualizar campos permitidos |
| DELETE | `/api/v1/expenses/:id` | Eliminar |

Códigos HTTP previstos: 200 en lecturas y actualización exitosa, 201 en creación, 400 si falla validación (campos mal tipados, categoría inválida, importe no positivo), 404 si no existe el id, 500 en error no controlado.

Ejemplo de respuesta para GET lista exitoso: array de objetos gasto. Ejemplo de POST exitoso: objeto gasto creado con `id` asignado.

Capas en servidor: `routes` enlazan URL con métodos HTTP; `controllers` traducen req/res y códigos; `services` contienen la lógica y el acceso al almacenamiento; `config` concentra puerto, ruta del fichero de datos y CORS si hace falta. La validación de entrada se hace en la frontera (controlador o middleware) antes de llamar al servicio.

## Qué se guarda dónde

En servidor: todos los gastos expuestos por la API (lista persistente entre reinicios según el modo de almacenamiento elegido).

En cliente: preferencias puramente de interfaz si hace falta (por ejemplo último rango de fechas seleccionado) pueden vivir en `localStorage`, pero los gastos no se duplican ahí como única fuente: para datos de negocio la API manda.

## Frontend: pantallas y componentes

Páginas previstas bajo `src/pages` (nombres orientativos):

- Inicio o panel con resumen del periodo y reparto por categoría (y hueco para gráfico simple).
- Lista de gastos con filtros por fechas y categoría.
- Formulario de alta (y posiblemente misma vista u otra para edición).

Componentes reutilizables previstos bajo `src/components`:

- Layout común con cabecera y enlaces de navegación cuando exista React Router.
- Tarjeta o fila de gasto para la lista.
- Filtros de periodo y categoría (pueden ser un bloque compuesto).
- Botones o enlaces coherentes con Tailwind.
- Mensajes de carga, error y lista vacía para la capa de red.

Los formularios serán controlados en React con validación básica en el cliente además de lo que devuelva la API.

## Estado en React

Estado local con `useState` y `useEffect` para cargas desde la API y efectos ligados a filtros.

Cálculos costosos sobre listas ya cargadas (totales por categoría, total del periodo) pueden ir con `useMemo` para no recalcular en cada render si las dependencias no cambian.

Callbacks que se pasan a listas hijas pueden usar `useCallback` cuando ayude a estabilizar referencias.

Estado global con Context API para algo que deban compartir varias pantallas sin prop drilling constante; por ejemplo el rango de fechas del resumen y de la lista, o un tema visual si se unifica más adelante.

## Tipos y capa de red

En `src/types` irán interfaces alineadas con el JSON del backend (gasto, errores comunes si se estandarizan).

En `src/api` un cliente tipado (funciones que llaman a `fetch` y devuelven datos o lanzan errores manejables). Las pantallas mostrarán explícitamente loading, datos correctos y error con posibilidad de reintentar donde tenga sentido.

## Decisiones que pueden afinarse en implementación

La forma exacta del campo fecha y el formato de error 400 pueden cerrarse cuando se escriba el código del servidor y del cliente para que los tipos coincidan. El gráfico puede ser una librería pequeña o una vista tabular si el tiempo es justo; la arquitectura anterior no depende de esa elección.
