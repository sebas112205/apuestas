import { NavBar } from '../components/NavBar'

export function DashboardPage() {
  return (
    <main className="page">
      <NavBar />
      <div className="card">
        <h1 className="page-title">Dashboard</h1>
        <p>Resumen rápido de tus boletas y próximos sorteos.</p>
        <ul>
          <li>Juegos registrados: 0</li>
          <li>Próximos sorteos: 0</li>
          <li>Juegos pendientes: 0</li>
        </ul>
      </div>
    </main>
  )
}
