import { useEffect } from 'react'
import Button from './Button.jsx'

function Modal({ open, title, children, onCancel, onConfirm, busy = false }) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape' && !busy) {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, busy, onCancel])

  if (!open) {
    return null
  }

  return (
    <div className="modal-backdrop">
      <section
        aria-labelledby="confirmation-title"
        aria-modal="true"
        className="modal"
        role="dialog"
      >
        <h2 id="confirmation-title">{title}</h2>
        <div className="modal__message">{children}</div>
        <div className="modal__actions">
          <Button disabled={busy} onClick={onCancel} variant="secondary">
            Cancelar
          </Button>
          <Button disabled={busy} onClick={onConfirm} variant="danger">
            {busy ? 'Eliminando…' : 'Eliminar'}
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Modal
