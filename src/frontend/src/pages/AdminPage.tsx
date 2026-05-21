import { NavBar } from '../components/NavBar'

export function AdminPage() {
  return (
    <main className="page">
      <NavBar />
      <div className="page-actions">
        <div>
          <h1 className="page-title">Panel de administrador</h1>
          <p className="subtitle">Filtra, busca y revisa boletas de todos los usuarios.</p>
        </div>
        <button type="button" className="secondary-button">Ver reportes</button>
      </div>

      <div className="card">
        <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Búsqueda rápida</h2>
        <p className="subtitle">Usa filtros para localizar sorteos por nombre, número o estado.</p>
        <div className="form-grid">
          <div className="form-control">
            <label>Buscar por nombre</label>
            <input placeholder="Ej. Mega Lotería" />
          </div>
          <div className="form-control">
            <label>Buscar por número</label>
            <input placeholder="Ej. 42" />
          </div>
          <div className="form-control">
            <label>Filtrar por estado</label>
            <select>
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Ganado</option>
              <option>Perdido</option>
            </select>
          </div>
          <div className="form-control">
            <label>Filtrar por tipo</label>
            <select>
              <option>Todos</option>
              <option>Lotería</option>
              <option>Rifa</option>
              <option>Sorteo</option>
              <option>Boleta</option>
              <option>Juego ocasional</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  )
}
