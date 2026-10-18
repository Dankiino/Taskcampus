const API_URL = 'https://jsonplaceholder.typicode.com/todos'

async function request(url, options) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`)
  }

  if (response.status === 204 || options?.method === 'DELETE') {
    return null
  }

  return response.json()
}

export async function obtenerTareas(signal) {
  const tareas = await request(`${API_URL}?_limit=10`, { signal })

  if (!Array.isArray(tareas)) {
    throw new Error('La respuesta de la API no contiene una lista de tareas.')
  }

  return tareas
}

export async function crearTarea(titulo) {
  return request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
  })
}

export async function actualizarTarea(remoteId, cambios) {
  await request(`${API_URL}/${remoteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(cambios),
  })
  return true
}

export async function eliminarTarea(remoteId) {
  await request(`${API_URL}/${remoteId}`, { method: 'DELETE' })
  return true
}
