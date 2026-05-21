import { Link, useNavigate } from 'react-router-dom'

export function NavBar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    navigate('/login')
  }

  return (
    <nav className="card" style={{ marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/tickets">Boletas</Link>
      <Link to="/tickets/new">Nuevo</Link>
      <Link to="/admin">Admin</Link>
      <button type="button" onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  )
}
