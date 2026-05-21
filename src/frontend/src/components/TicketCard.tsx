type TicketCardProps = {
  ticket: {
    name: string
    number?: string
    drawDate: string
    amount?: number
    place: string
    type: string
    status: string
    notes?: string
  }
}

const statusColors: Record<string, string> = {
  Pendiente: '#f59e0b',
  Ganado: '#16a34a',
  Perdido: '#dc2626',
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <article className="ticket-card">
      <div className="ticket-card-header">
        <div>
          <h3>{ticket.name}</h3>
          <p className="ticket-subtitle">{ticket.type} · {ticket.place}</p>
        </div>
        <span className="ticket-badge" style={{ background: statusColors[ticket.status] ?? '#64748b' }}>
          {ticket.status}
        </span>
      </div>
      <div className="ticket-card-body">
        <div>
          <p className="ticket-label">Número</p>
          <p>{ticket.number || '—'}</p>
        </div>
        <div>
          <p className="ticket-label">Fecha</p>
          <p>{ticket.drawDate}</p>
        </div>
        <div>
          <p className="ticket-label">Valor</p>
          <p>{ticket.amount ? `$${ticket.amount}` : 'No definido'}</p>
        </div>
      </div>
      {ticket.notes && (
        <div className="ticket-note">
          <strong>Notas:</strong> {ticket.notes}
        </div>
      )}
    </article>
  )
}
