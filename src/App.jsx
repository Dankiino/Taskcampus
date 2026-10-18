import { useEffect, useState } from 'react'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import useTareas from './hooks/useTareas.js'
import NewTaskView from './views/NewTaskView.jsx'
import Overview from './views/Overview.jsx'
import TasksView from './views/TasksView.jsx'
import './App.css'

const viewTitles = {
  resumen: 'Resumen',
  tareas: 'Tareas',
  nueva: 'Nueva tarea',
}

function App() {
  const {
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
  } = useTareas()
  const [activeView, setActiveView] = useState('resumen')
  const [filter, setFilter] = useState('todas')
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = `TaskCampus | ${viewTitles[activeView]}`
  }, [activeView])

  const pending = tareas.filter((task) => !task.completed).length
  const completed = tareas.length - pending
  const normalizedSearch = search.trim().toLocaleLowerCase()
  const visibleTasks = tareas.filter((task) => {
    const matchesFilter =
      filter === 'todas' ||
      (filter === 'pendientes' && !task.completed) ||
      (filter === 'completadas' && task.completed)
    const matchesSearch = task.title
      .toLocaleLowerCase()
      .includes(normalizedSearch)

    return matchesFilter && matchesSearch
  })

  async function handleCreateTask(title) {
    const created = await agregarTarea(title)
    if (created) {
      setActiveView('tareas')
    }
    return created
  }

  function renderActiveView() {
    if (activeView === 'tareas') {
      return (
        <TasksView
          filter={filter}
          onDelete={quitarTarea}
          onEdit={editarTitulo}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
          onToggle={cambiarEstado}
          operations={operaciones}
          search={search}
          tasks={visibleTasks}
        />
      )
    }

    if (activeView === 'nueva') {
      return (
        <NewTaskView onCreate={handleCreateTask} operations={operaciones} />
      )
    }

    return (
      <Overview
        completed={completed}
        pending={pending}
        total={tareas.length}
        visible={visibleTasks.length}
      />
    )
  }

  return (
    <main className="app">
      <Header
        description="Organiza tus pendientes académicos"
        title="TaskCampus"
      />
      <Navigation activeView={activeView} onChangeView={setActiveView} />

      <div className="content">
        {errorDeCarga && (
          <div className="message message--error" role="alert">
            <p>No se pudieron cargar las tareas: {errorDeCarga}</p>
            <Button
              disabled={cargando}
              onClick={reintentarCarga}
              variant="secondary"
            >
              {cargando ? 'Cargando…' : 'Reintentar'}
            </Button>
          </div>
        )}
        {error && (
          <p className="message message--error" role="alert">
            No se completó la operación: {error}
          </p>
        )}
        {cargando ? (
          <p className="message message--info" role="status">
            Cargando las tareas…
          </p>
        ) : (
          renderActiveView()
        )}
      </div>

      <Footer course="Aplicaciones y Tecnologías de la Web" />
    </main>
  )
}

export default App
