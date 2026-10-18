import { useState } from 'react'
import Button from './Button.jsx'
import Card from './Card.jsx'

function TaskForm({ onCreate, operations }) {
  const [title, setTitle] = useState('')
  const [validationError, setValidationError] = useState('')
  const busy = Boolean(operations.nueva)

  async function handleSubmit(event) {
    event.preventDefault()
    const normalizedTitle = title.trim()

    if (!normalizedTitle) {
      setValidationError('Escribe un título para la tarea.')
      return
    }

    const created = await onCreate(normalizedTitle)
    if (created) {
      setTitle('')
      setValidationError('')
    }
  }

  return (
    <Card className="task-form-card">
      <h2 className="section-title">Crear una tarea</h2>
      <form className="task-form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="task-title">Título de la tarea</label>
        <input
          autoComplete="off"
          id="task-title"
          maxLength={120}
          onChange={(event) => {
            setTitle(event.target.value)
            setValidationError('')
          }}
          placeholder="Ej.: Estudiar para el examen"
          value={title}
        />
        {validationError && (
          <p className="field-error" role="alert">
            {validationError}
          </p>
        )}
        <Button disabled={busy} type="submit">
          {busy ? 'Guardando…' : 'Agregar tarea'}
        </Button>
      </form>
    </Card>
  )
}

export default TaskForm
