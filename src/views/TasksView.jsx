import Button from '../components/Button.jsx'
import TaskList from '../components/TaskList.jsx'

const filters = [
  { id: 'todas', label: 'Todas' },
  { id: 'pendientes', label: 'Pendientes' },
  { id: 'completadas', label: 'Completadas' },
]

function TasksView({
  tasks,
  filter,
  search,
  operations,
  onFilterChange,
  onSearchChange,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div className="view">
      <section aria-label="Filtros de tareas" className="filters">
        <div aria-label="Filtrar por estado" className="filter-buttons">
          {filters.map((option) => (
            <Button
              aria-pressed={filter === option.id}
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              variant={filter === option.id ? 'primary' : 'secondary'}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <label className="search-field" htmlFor="task-search">
          <span>Buscar por título</span>
          <input
            id="task-search"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Escribe para buscar…"
            type="search"
            value={search}
          />
        </label>
      </section>
      <TaskList
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
        operations={operations}
        tasks={tasks}
      />
    </div>
  )
}

export default TasksView
