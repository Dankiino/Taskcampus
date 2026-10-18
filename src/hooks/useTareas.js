import { useCallback, useEffect, useState } from 'react'
import {
  actualizarTarea,
  crearTarea as crearTareaEnApi,
  eliminarTarea as eliminarTareaEnApi,
  obtenerTareas,
} from '../services/tareasService.js'

const titulosIniciales = [
  'Repasar los apuntes de la clase',
  'Completar el ejercicio de JSX',
  'Practicar componentes y props',
  'Preparar el formulario de tareas',
  'Repasar eventos y estado en React',
  'Implementar filtros por estado',
  'Probar la carga de tareas con fetch',
  'Documentar los avances del proyecto',
  'Revisar los estilos de TaskCampus',
  'Preparar la entrega del laboratorio',
]

function mensajeDeError(error) {
  return error instanceof Error
    ? error.message
    : 'Ocurrió un error inesperado al comunicarse con la API.'
}

function crearIdLocal() {
  return crypto.randomUUID()
}

function normalizarTareas(resultados) {
  return resultados.map((tarea, index) => ({
    id: `remota-${tarea.id}`,
    remoteId: tarea.id,
    title: titulosIniciales[index] ?? tarea.title,
    completed: tarea.completed,
    creadaEnEstaSesion: false,
  }))
}

function useTareas() {
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [errorDeCarga, setErrorDeCarga] = useState('')
  const [operaciones, setOperaciones] = useState({})

  const cargarTareas = useCallback(async (signal) => {
    try {
      const resultados = await obtenerTareas(signal)
      if (!signal?.aborted) {
        setTareas(normalizarTareas(resultados))
        setErrorDeCarga('')
      }
    } catch (loadError) {
      if (!signal?.aborted) {
        setErrorDeCarga(mensajeDeError(loadError))
      }
    } finally {
      if (!signal?.aborted) {
        setCargando(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    obtenerTareas(controller.signal)
      .then((resultados) => {
        if (!controller.signal.aborted) {
          setTareas(normalizarTareas(resultados))
          setErrorDeCarga('')
        }
      })
      .catch((loadError) => {
        if (!controller.signal.aborted) {
          setErrorDeCarga(mensajeDeError(loadError))
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCargando(false)
        }
      })

    return () => controller.abort()
  }, [])

  function reintentarCarga() {
    setCargando(true)
    setErrorDeCarga('')
    return cargarTareas()
  }

  async function ejecutarOperacion(id, accion) {
    setOperaciones((actuales) => ({ ...actuales, [id]: true }))
    setError('')

    try {
      const resultado = await accion()
      return resultado
    } catch (operationError) {
      setError(mensajeDeError(operationError))
      return null
    } finally {
      setOperaciones((actuales) => {
        const siguientes = { ...actuales }
        delete siguientes[id]
        return siguientes
      })
    }
  }

  async function agregarTarea(title) {
    const result = await ejecutarOperacion('nueva', () =>
      crearTareaEnApi(title),
    )

    if (!result || result.id === undefined || result.id === null) {
      if (result) {
        setError('La API no devolvió el identificador de la tarea creada.')
      }
      return false
    }

    const tareaNueva = {
      id: `local-${crearIdLocal()}`,
      remoteId: result.id,
      title,
      completed: false,
      creadaEnEstaSesion: true,
    }

    setTareas((anteriores) => [tareaNueva, ...anteriores])
    return true
  }

  async function cambiarEstado(id) {
    const tarea = tareas.find((item) => item.id === id)

    if (!tarea) {
      setError('No se encontró la tarea que intentas actualizar.')
      return false
    }
    if (tarea.creadaEnEstaSesion) {
      const completed = !tarea.completed
      setTareas((anteriores) =>
        anteriores.map((item) =>
          item.id === id ? { ...item, completed } : item,
        ),
      )
      return true
    }

    const completed = !tarea.completed
    const result = await ejecutarOperacion(id, () =>
      actualizarTarea(tarea.remoteId, { completed }),
    )

    if (!result) {
      return false
    }

    setTareas((anteriores) =>
      anteriores.map((item) =>
        item.id === id ? { ...item, completed } : item,
      ),
    )
    return true
  }

  async function editarTitulo(id, title) {
    const tarea = tareas.find((item) => item.id === id)

    if (!tarea) {
      setError('No se encontró la tarea que intentas editar.')
      return false
    }
    if (tarea.creadaEnEstaSesion) {
      setTareas((anteriores) =>
        anteriores.map((item) => (item.id === id ? { ...item, title } : item)),
      )
      return true
    }

    const result = await ejecutarOperacion(id, () =>
      actualizarTarea(tarea.remoteId, { title }),
    )

    if (!result) {
      return false
    }

    setTareas((anteriores) =>
      anteriores.map((item) => (item.id === id ? { ...item, title } : item)),
    )
    return true
  }

  async function quitarTarea(id) {
    const tarea = tareas.find((item) => item.id === id)

    if (!tarea) {
      setError('No se encontró la tarea que intentas eliminar.')
      return false
    }
    if (tarea.creadaEnEstaSesion) {
      setTareas((anteriores) => anteriores.filter((item) => item.id !== id))
      return true
    }

    const result = await ejecutarOperacion(id, () =>
      eliminarTareaEnApi(tarea.remoteId),
    )

    if (result === null) {
      return false
    }

    setTareas((anteriores) => anteriores.filter((item) => item.id !== id))
    return true
  }

  return {
    tareas,
    cargando,
    error,
    errorDeCarga,
    operaciones,
    reintentarCarga,
    agregarTarea,
    cambiarEstado,
    editarTitulo,
    quitarTarea,
  }
}

export default useTareas
