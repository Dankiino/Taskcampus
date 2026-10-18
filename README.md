# TaskCampus

Esta aplicación sirve para organizar tareas académicas. Está desarrollada con
React y Vite siguiendo los tutoriales y los requisitos del laboratorio.

## Versiones utilizadas

- Node.js 24.20.0
- npm 11.19.0
- React 19.2
- Vite 8.3

## Cómo ejecutar el proyecto

Abrir una terminal en esta carpeta y ejecutar:

```bash
npm ci
npm run dev
```

Para revisar la compilación y el lint:

```bash
npm run lint
npm run build
```

## Qué hace la aplicación

- Carga diez tareas de JSONPlaceholder.
- Tiene las vistas Resumen, Tareas y Nueva tarea.
- Permite buscar y filtrar tareas.
- Permite completar, editar y eliminar las tareas cargadas desde la API.
- Las tareas nuevas también se pueden completar, editar y eliminar durante la sesión.
- Muestra mensajes de carga, error y lista vacía.

Los cambios se mantienen mientras la aplicación está abierta. JSONPlaceholder es
una API de práctica y no guarda los cambios al recargar la página; las operaciones
con tareas nuevas se aplican localmente en la sesión.

## Archivos principales

- `src/App.jsx`: organiza las vistas y guarda la navegación y los filtros.
- `src/components/`: componentes de la interfaz.
- `src/views/`: las tres vistas de la aplicación.
- `src/hooks/useTareas.js`: estado y operaciones de las tareas.
- `src/services/tareasService.js`: peticiones a la API.
- `src/App.css`: estilos de la aplicación.

## Comparación con la base

La base tenía tres tareas escritas directamente en el componente y botones que
mostraban alertas. En esta versión, las tareas se cargan desde una API y se
pueden crear, filtrar, buscar, completar, editar y eliminar.

## Temas investigados

| Tema | Aplicación en el proyecto | Archivos y cómo probarlo |
|---|---|---|
| Navegación con estado | `useState` guarda qué vista está abierta. Al cambiar la vista no se recarga la página. | `src/App.jsx`, `src/components/Navigation.jsx`. Cambiar de vista y volver a Tareas; el filtro y la búsqueda siguen seleccionados. |
| Estado derivado | Los contadores y la lista visible se calculan desde las tareas y los filtros, sin guardar una copia aparte. | `src/App.jsx`, `src/components/TaskSummary.jsx`, `src/views/TasksView.jsx`. Completar una tarea y cambiar el filtro; revisar el resumen. |
| Actualización funcional | `setTareas(anteriores => ...)` usa `map` y `filter` para crear una lista nueva al agregar, cambiar o quitar una tarea. | `src/hooks/useTareas.js`. Agregar, completar y eliminar tareas y comprobar que se actualizan la lista y el resumen. |
| Identificadores y API | Cada tarea tiene un ID local y uno remoto. JSONPlaceholder simula las escrituras y no guarda los cambios al recargar. | `src/hooks/useTareas.js`, `src/services/tareasService.js`. El ID local se genera con `crypto.randomUUID()`. Las tareas nuevas se completan, editan y eliminan localmente para no usar un ID remoto simulado que podría repetirse. |

Fuentes consultadas:

- [Compartir estado en React](https://react.dev/learn/sharing-state-between-components)
- [Actualizar listas en React](https://react.dev/learn/updating-arrays-in-state)
- [Efectos en React](https://react.dev/learn/you-might-not-need-an-effect)
- [API JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/)
- [crypto.randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)

## Pruebas

| Caso probado | Pasos | Resultado esperado | Resultado obtenido | Evidencia |
|---|---|---|---|---|
| Carga de tareas | Abrir la página con Internet. | Aparecen diez tareas. | Aparecieron diez tareas de la API. | Aplicación abierta en el navegador. |
| Navegación, filtros y búsqueda | Filtrar y buscar; cambiar de vista y volver. | Se mantienen los filtros y se actualiza el resumen. | El filtro y la búsqueda se conservaron; la búsqueda `DELECTUS` encontró la tarea. | Vista Tareas y Resumen en el navegador. |
| Crear y validar | Agregar una tarea y luego enviar el formulario vacío. | La tarea válida aparece; el título vacío no se guarda. | La lista pasó de diez a once; el título vacío mostró un mensaje. | Formulario y lista en el navegador. |
| Completar y editar | Completar una tarea y editar un título con Enter. | Se actualizan el estado y el título. | El estado y el título cambiaron en la lista. | Lista de tareas en el navegador. |
| Edición con doble clic | Hacer un clic sencillo y luego doble clic en el título. | El clic sencillo no abre el editor; el doble clic sí. | El editor solo se abrió con doble clic. | Lista de tareas en el navegador. |
| Eliminar | Abrir el modal; cancelar y luego confirmar la eliminación. | Cancelar conserva la tarea y confirmar la elimina. | Cancelar la conservó; confirmar la quitó de la lista. | Modal y lista en el navegador. |
| Error de conexión | Bloquear la carga de la API y luego volver a permitirla. | Se informa el error y se pueden cargar de nuevo las tareas. | Se mostró el error; al reintentar se cargaron otra vez diez tareas. | Mensaje de error y resumen en el navegador. |
| Tareas nuevas | Crear dos tareas diferentes; completar, editar y eliminar una. | Las operaciones funcionan en la lista y la otra tarea permanece. Los cambios no se guardan al recargar. | Las tareas aparecieron separadas; se completó, editó y eliminó A, y B permaneció en la lista. | Lista de Tareas en el navegador. |
| Lint y compilación | Ejecutar `npm run lint` y `npm run build`. | Ambos terminan sin errores. | Los dos comandos terminaron correctamente. | Salida de la terminal. |

## Entrega

Para Canvas hay que subir un solo archivo `.txt` con los nombres completos de
los integrantes y el enlace al repositorio público. El equipo debe completar
esos datos.
