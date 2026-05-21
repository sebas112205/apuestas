import { NavBar } from '../components/NavBar'

export function AdminPage() {
  return (
    <main className="page">
      <NavBar />
      <div className="card">
        <h1 className="page-title">Panel de administrador</h1>
        <p>Filtrar y buscar sorteos, revisar estados y registros de todos los usuarios.</p>
      </div>
    </main>
  )
}
