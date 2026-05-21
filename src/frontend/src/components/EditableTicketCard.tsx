import { useState } from 'react'
import { updateTicketStatus } from '../services/tickets'

interface EditableTicketCardProps {
  ticket: {
    name: string
    number: string
    drawDate: string
    amount: number
    place: string
    type: string
    status: 'Pendiente' | 'Ganado' | 'Perdido'
    notes: string
    id?: string
  }
  isEditable?: boolean
  onStatusUpdate?: (updatedStatus: 'Pendiente' | 'Ganado' | 'Perdido') => void
}

export function EditableTicketCard({ ticket, isEditable = false, onStatusUpdate }: EditableTicketCardProps) {
  const [status, setStatus] = useState(ticket.status)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStatusChange = async (newStatus: 'Pendiente' | 'Ganado' | 'Perdido') => {
    if (!ticket.id) {
      setStatus(newStatus)
      onStatusUpdate?.(newStatus)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      await updateTicketStatus(ticket.id, newStatus)
      setStatus(newStatus)
      onStatusUpdate?.(newStatus)
      setIsEditing(false)
    } catch (err) {
      setError('Error al actualizar')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Ganado':
        return '#16a34a'
      case 'Perdido':
        return '#dc2626'
      case 'Pendiente':
      default:
        return '#f59e0b'
    }
  }

  return (
    <div className="ticket-card">
      <div className="ticket-card-header">
        <div>
          <h3>{ticket.name}</h3>
          <p className="ticket-subtitle">
            {ticket.type} · {ticket.place}
          </p>
        </div>
        {isEditing ? (
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as any)}
            disabled={isLoading}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: `1px solid ${getStatusColor(status)}`,
              background: `${getStatusColor(status)}20`,
              color: getStatusColor(status),
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Ganado">Ganado</option>
            <option value="Perdido">Perdido</option>
          </select>
        ) : (
          <span
            className="ticket-badge"
            style={{
              background: getStatusColor(status),
              cursor: isEditable ? 'pointer' : 'default',
            }}
            onClick={() => isEditable && setIsEditing(true)}
          >
            {status}
          </span>
        )}
      </div>
      <div className="ticket-card-body">
        <div>
          <p className="ticket-label">Número</p>
          <p>{ticket.number}</p>
        </div>
        <div>
          <p className="ticket-label">Fecha</p>
          <p>{new Date(ticket.drawDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="ticket-label">Valor</p>
          <p>${ticket.amount}</p>
        </div>
      </div>
      <div className="ticket-note">
        <p>
          <strong>Notas:</strong> {ticket.notes}
        </p>
      </div>
      {isEditing && (
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              flex: 1,
              borderRadius: '6px',
              background: '#475569',
              color: '#f1f5f9',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          {isLoading && (
            <span style={{ color: '#60a5fa', fontSize: '0.85rem', alignSelf: 'center' }}>
              Guardando...
            </span>
          )}
        </div>
      )}
      {error && (
        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '8px' }}>{error}</p>
      )}
    </div>
  )
}
