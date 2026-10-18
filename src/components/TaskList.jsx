import { useState } from 'react'
import Card from './Card.jsx'
import Modal from './Modal.jsx'
import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, operations, onToggle, onEdit, onDelete }) {
  const [taskToDelete, setTaskToDelete] = useState(null)
  const deletionBusy = taskToDelete
    ? Boolean(operations[taskToDelete.id])
    : false

  async function confirmDelete() {
    if (!taskToDelete) {
      return
    }

    const deleted = await onDelete(taskToDelete.id)
    if (deleted) {
      setTaskToDelete(null)
    }
  }

  return (
    <Card className="task-list-card">
      <h2 className="section-title">Tareas</h2>
      {tasks.length === 0 ? (
        <p className="empty-message">
          No hay tareas que coincidan con los filtros actuales.
        </p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              busy={Boolean(operations[task.id])}
              key={task.id}
              onEdit={onEdit}
              onRequestDelete={setTaskToDelete}
              onToggle={onToggle}
              task={task}
            />
          ))}
        </ul>
      )}

      {taskToDelete && (
        <Modal
          busy={deletionBusy}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={confirmDelete}
          open
          title="Eliminar tarea"
        >
          <p>
            ¿Seguro que quieres eliminar “{taskToDelete.title}”? Esta acción no
            se puede deshacer.
          </p>
        </Modal>
      )}
    </Card>
  )
}

export default TaskList
