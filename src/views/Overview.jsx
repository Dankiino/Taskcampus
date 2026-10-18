import Card from '../components/Card.jsx'
import TaskSummary from '../components/TaskSummary.jsx'

function Overview({ total, pending, completed, visible }) {
  return (
    <div className="view">
      <Card className="welcome-card">
        <p className="eyebrow">Tu espacio de estudio</p>
        <h2>Resumen académico</h2>
        <p>Organiza tus tareas y lleva un seguimiento de tu progreso.</p>
      </Card>
      <TaskSummary
        completed={completed}
        pending={pending}
        total={total}
        visible={visible}
      />
    </div>
  )
}

export default Overview
