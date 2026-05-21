import { useState } from 'react'
import type { Ticket } from '../services/tickets'
import { updateTicketStatus } from '../services/tickets'

interface AdminTicketRowProps {
  ticket: any
  onStatusUpdate: (updatedTicket: Ticket) => void
}

export function AdminTicketRow({ ticket, onStatusUpdate }: AdminTicketRowProps) {
  const [status, setStatus] = useState(ticket.status)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStatusChange = async (newStatus: 'Pendiente' | 'Ganado' | 'Perdido') => {
    setIsLoading(true)
    setError(null)
    try {
      const updated = await updateTicketStatus(ticket.id, newStatus)
      setStatus(newStatus)
      onStatusUpdate(updated)
    } catch (err) {
      setError('Error al actualizar el estado')
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

  // Mapeo de campos del backend
  const number = ticket.number || 'N/A'
  const type = ticket.type || 'N/A'
  const storeName = ticket.storeName || ticket.place || 'N/A'
  const drawDate = ticket.drawDate ? new Date(ticket.drawDate).toLocaleDateString() : 'N/A'
  const value = ticket.value || ticket.amount || 0

  return (
    <>
      <td>{number}</td>
      <td>{type}</td>
      <td>{storeName}</td>
      <td>{drawDate}</td>
      <td>${value}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as any)}
            disabled={isLoading}
            style={{
              padding: '6px 12px',
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
          {isLoading && <span style={{ color: '#60a5fa', fontSize: '0.8rem' }}>Guardando...</span>}
          {error && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</span>}
        </div>
      </td>
    </>
  )
}
