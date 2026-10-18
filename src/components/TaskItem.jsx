import { useRef, useState } from 'react'
import Badge from './Badge.jsx'
import Button from './Button.jsx'

function TaskItem({ task, busy, onToggle, onEdit, onRequestDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const [validationError, setValidationError] = useState('')
  const cancelingEdit = useRef(false)

  function startEditing() {
    if (!busy) {
      setDraft(task.title)
      setValidationError('')
      setEditing(true)
    }
  }

  async function saveTitle() {
    const title = draft.trim()

    if (!title) {
      setValidationError('El título no puede quedar vacío.')
      return
    }

    if (title === task.title) {
      setEditing(false)
      setValidationError('')
      return
    }

    const saved = await onEdit(task.id, title)
    if (saved) {
      setEditing(false)
      setValidationError('')
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    } else if (event.key === 'Escape') {
      cancelingEdit.current = true
      setDraft(task.title)
      setValidationError('')
      setEditing(false)
    }
  }

  function handleBlur() {
    if (cancelingEdit.current) {
      cancelingEdit.current = false
      return
    }
    saveTitle()
  }

  return (
    <li className={`task-item ${busy ? 'task-item--busy' : ''}`}>
      <div className="task-item__main">
        <label className="task-item__check">
          <input
            checked={task.completed}
            disabled={busy}
            onChange={() => onToggle(task.id)}
            type="checkbox"
          />
          <span className="visually-hidden">
            Marcar {task.title} como {task.completed ? 'pendiente' : 'completada'}
          </span>
        </label>
        <div className="task-item__details">
          {editing ? (
            <input
              aria-label={`Editar título de ${task.title}`}
              autoFocus
              className="task-item__edit-input"
              disabled={busy}
              maxLength={120}
              onBlur={handleBlur}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              value={draft}
            />
          ) : (
            <button
              aria-label={`Doble clic para editar: ${task.title}`}
              className={`task-item__title ${task.completed ? 'task-item__title--completed' : ''}`}
              disabled={busy}
              onDoubleClick={startEditing}
              type="button"
            >
              {task.title}
            </button>
          )}
          <Badge completed={task.completed} />
          {validationError && (
            <p className="field-error" role="alert">
              {validationError}
            </p>
          )}
          {editing && (
            <span className="task-item__hint">
              Enter o salir del campo guarda; Escape cancela.
            </span>
          )}
        </div>
      </div>
      <Button
        disabled={busy}
        onClick={() => onToggle(task.id)}
        variant="secondary"
      >
        {task.completed ? 'Reabrir' : 'Completar'}
      </Button>
      <Button
        disabled={busy}
        onClick={() => onRequestDelete(task)}
        variant="danger"
      >
        Eliminar
      </Button>
    </li>
  )
}

export default TaskItem
