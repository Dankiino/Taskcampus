function Badge({ completed }) {
  return (
    <span className={`badge ${completed ? 'badge--completed' : 'badge--pending'}`}>
      {completed ? 'Completada' : 'Pendiente'}
    </span>
  )
}

export default Badge
