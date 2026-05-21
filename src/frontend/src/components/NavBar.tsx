import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { promoteToAdmin } from '../services/auth'

export function NavBar() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('authUser')
    if (user) {
      const userData = JSON.parse(user)
      setIsAdmin(userData.role === 'admin')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    navigate('/login')
  }

  const handlePromoteToAdmin = async () => {
    setIsLoading(true)
    try {
      await promoteToAdmin()
      setIsAdmin(true)
      window.location.reload()
    } catch (error) {
      console.error('Error promoting to admin:', error)
      alert('Error al promover a admin')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <nav className="card" style={{ marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/tickets">Boletas</Link>
      <Link to="/tickets/new">Nuevo</Link>
      {isAdmin && <Link to="/admin">Admin</Link>}
      {!isAdmin && (
        <button
          type="button"
          className="secondary-button"
          onClick={handlePromoteToAdmin}
          disabled={isLoading}
          style={{ fontSize: '0.85rem', padding: '6px 12px' }}
        >
          {isLoading ? 'Activando...' : 'Activar admin'}
        </button>
      )}
      <button type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  )
}
