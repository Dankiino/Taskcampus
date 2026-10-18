import TaskForm from '../components/TaskForm.jsx'

function NewTaskView({ onCreate, operations }) {
  return (
    <div className="view">
      <p className="view__intro">
        Agrega una tarea académica. El título no puede estar vacío.
      </p>
      <TaskForm onCreate={onCreate} operations={operations} />
    </div>
  )
}

export default NewTaskView
