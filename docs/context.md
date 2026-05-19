# Context y estado global

## Cuándo usar Context API

Context API es útil cuando varios componentes que no están directamente relacionados entre sí necesitan acceder al mismo dato. Sin contexto, habría que pasar ese dato de componente en componente por props, lo que se vuelve incómodo cuando hay muchos niveles. Con contexto, cualquier componente puede leer o actualizar ese valor directamente.

## FilterContext

Guarda el rango de fechas (desde y hasta) que el usuario selecciona. Este filtro lo usan tanto la pantalla de Resumen como la de Gastos, y al estar en un contexto se mantiene sincronizado entre las dos. Si cambias las fechas en el Resumen y luego vas a Gastos, los filtros siguen siendo los mismos.

Contiene:
- `from`: fecha de inicio del periodo
- `to`: fecha de fin del periodo
- `setFrom` y `setTo`: funciones para actualizarlas

## ThemeContext

Guarda el tema visual de la app, que puede ser `light` o `dark`. Al cambiar el tema se añade o quita la clase `dark` en el elemento `html`, lo que activa o desactiva los estilos de modo oscuro de Tailwind. La preferencia se guarda en `localStorage` para que se recuerde al recargar la página.

Contiene:
- `theme`: valor actual (`'light'` o `'dark'`)
- `toggle`: función que alterna entre los dos modos

## Cómo se usa en la app

Ambos contextos tienen su propio `Provider` que envuelve la aplicación en `App.tsx`. Cualquier componente o página puede acceder a sus valores usando los hooks `useFilter` y `useTheme` sin necesidad de pasar props.
