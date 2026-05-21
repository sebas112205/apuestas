import { NavBar } from '../components/NavBar'
import { Link } from 'react-router-dom'

export function TicketsPage() {
  return (
    <main className="page">
      <NavBar />
      <div className="card">
        <h1 className="page-title">Mis boletas / sorteos</h1>
        <p>Aquí verás la lista de tus tickets registrados.</p>
        <Link to="/tickets/new">
          <button type="button">Crear nuevo sorteo</button>
        </Link>
      </div>
    </main>
  )
}
