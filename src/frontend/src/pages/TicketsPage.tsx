import { NavBar } from '../components/NavBar'
import { Link } from 'react-router-dom'
import { TicketCard } from '../components/TicketCard'

const tickets = [
  {
    name: 'Mega Lotería',
    number: '12-08-33',
    drawDate: '2026-05-30',
    amount: 20,
    place: 'Kiosko Central',
    type: 'Lotería',
    status: 'Pendiente',
    notes: 'Sorteo semanal',
  },
  {
    name: 'Rifa solidaria',
    number: '47',
    drawDate: '2026-05-21',
    amount: 10,
    place: 'Tienda Azul',
    type: 'Rifa',
    status: 'Perdido',
    notes: 'No olvides revisar resultados',
  },
  {
    name: 'Boleta festival',
    number: '98',
    drawDate: '2026-06-03',
    amount: 35,
    place: 'Plaza Verde',
    type: 'Boleta',
    status: 'Pendiente',
    notes: 'Premio grande',
  },
]

export function TicketsPage() {
  return (
    <main className="page">
      <NavBar />
      <div className="page-actions">
        <div>
          <h1 className="page-title">Mis boletas</h1>
          <p className="subtitle">Un vistazo rápido a tus últimos tickets y sorteos.</p>
        </div>
        <Link to="/tickets/new">
          <button type="button">Agregar boleta</button>
        </Link>
      </div>

      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <TicketCard key={`${ticket.name}-${ticket.drawDate}`} ticket={ticket} />
        ))}
      </div>
    </main>
  )
}
