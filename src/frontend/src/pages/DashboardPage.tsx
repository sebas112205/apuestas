import { NavBar } from '../components/NavBar'
import { LuckyNumberWidget } from '../components/LuckyNumberWidget'

export function DashboardPage() {
  return (
    <main className="page">
      <NavBar />
      <div className="page-actions">
        <div>
          <h1 className="page-title">Tu panel de boletas</h1>
          <p className="subtitle">Revisa tus apuestas, próximos sorteos y resultados en un solo lugar.</p>
        </div>
        <button type="button" className="secondary-button">Ver estadísticas</button>
      </div>

      <div className="hero-banner">
        <div>
          <h2>Organiza tus boletas. Sigue tu suerte.</h2>
          <p>Guarda tus juegos favoritos y descubre un número de suerte cada día para inspirarte.</p>
          <button type="button">Ver próxima apuesta</button>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <h3>Boletas registradas</h3>
          <p>18</p>
        </div>
        <div className="metric-card">
          <h3>Próximos sorteos</h3>
          <p>6</p>
        </div>
        <div className="metric-card">
          <h3>Boletas pendientes</h3>
          <p>4</p>
        </div>
      </div>

      <div className="page-actions">
        <div>
          <h2 className="page-title" style={{ fontSize: '1.65rem' }}>Últimas boletas</h2>
          <p className="subtitle">Tus últimas entradas cargadas en la aplicación.</p>
        </div>
      </div>

      <div className="ticket-grid">
        <div className="ticket-card">
          <div className="ticket-card-header">
            <div>
              <h3>Sorteo nocturno</h3>
              <p className="ticket-subtitle">Lotería · Tienda Luna</p>
            </div>
            <span className="ticket-badge" style={{ background: '#f59e0b' }}>Pendiente</span>
          </div>
          <div className="ticket-card-body">
            <div>
              <p className="ticket-label">Número</p>
              <p>24-18-09</p>
            </div>
            <div>
              <p className="ticket-label">Fecha</p>
              <p>2026-05-27</p>
            </div>
            <div>
              <p className="ticket-label">Valor</p>
              <p>$15</p>
            </div>
          </div>
        </div>
        <div className="ticket-card">
          <div className="ticket-card-header">
            <div>
              <h3>Rifa del barrio</h3>
              <p className="ticket-subtitle">Rifa · Kiosko Sol</p>
            </div>
            <span className="ticket-badge" style={{ background: '#16a34a' }}>Ganado</span>
          </div>
          <div className="ticket-card-body">
            <div>
              <p className="ticket-label">Número</p>
              <p>81</p>
            </div>
            <div>
              <p className="ticket-label">Fecha</p>
              <p>2026-05-14</p>
            </div>
            <div>
              <p className="ticket-label">Valor</p>
              <p>$40</p>
            </div>
          </div>
        </div>
        <LuckyNumberWidget />
      </div>
    </main>
  )
}
