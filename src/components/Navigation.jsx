import Button from './Button.jsx'

const views = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'tareas', label: 'Tareas' },
  { id: 'nueva', label: 'Nueva tarea' },
]

function Navigation({ activeView, onChangeView }) {
  return (
    <nav aria-label="Navegación principal" className="navigation">
      {views.map((view) => (
        <Button
          aria-current={activeView === view.id ? 'page' : undefined}
          className={activeView === view.id ? 'navigation__active' : ''}
          key={view.id}
          onClick={() => onChangeView(view.id)}
          variant={activeView === view.id ? 'primary' : 'secondary'}
        >
          {view.label}
        </Button>
      ))}
    </nav>
  )
}

export default Navigation
