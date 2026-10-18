import Card from './Card.jsx'

function TaskSummary({ total, pending, completed, visible }) {
  return (
    <Card className="summary-card">
      <h2 className="section-title">Resumen de tareas</h2>
      <dl className="summary-grid">
        <div className="summary-stat">
          <dt>Total</dt>
          <dd>{total}</dd>
        </div>
        <div className="summary-stat">
          <dt>Pendientes</dt>
          <dd>{pending}</dd>
        </div>
        <div className="summary-stat">
          <dt>Completadas</dt>
          <dd>{completed}</dd>
        </div>
        <div className="summary-stat">
          <dt>Mostrando con los filtros actuales</dt>
          <dd>{visible}</dd>
        </div>
      </dl>
    </Card>
  )
}

export default TaskSummary
