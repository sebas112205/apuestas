import { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { AdminTicketRow } from '../components/AdminTicketRow'
import type { Ticket } from '../services/tickets'
import { getAllTickets } from '../services/tickets'

export function AdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchName, setSearchName] = useState('')
  const [searchNumber, setSearchNumber] = useState('')
  const [filterStatus, setFilterStatus] = useState('Todos')
  const [filterType, setFilterType] = useState('Todos')

  useEffect(() => {
    fetchTickets()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [tickets, searchName, searchNumber, filterStatus, filterType])

  const fetchTickets = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setError('No autorizado. Inicia sesión primero.')
        return
      }
      const data = await getAllTickets()
      setTickets(Array.isArray(data) ? data : [])
    } catch (err: any) {
      const errorMessage = err?.response?.status === 403 
        ? 'No tienes permisos para acceder al panel de admin'
        : err?.response?.data?.message || 'Error al cargar las boletas'
      setError(errorMessage)
      console.error('Admin error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = tickets

    if (searchName) {
      filtered = filtered.filter((t) =>
        t.storeName.toLowerCase().includes(searchName.toLowerCase())
      )
    }

    if (searchNumber) {
      filtered = filtered.filter((t) => t.number.includes(searchNumber))
    }

    if (filterStatus !== 'Todos') {
      filtered = filtered.filter((t) => t.status === filterStatus)
    }

    if (filterType !== 'Todos') {
      filtered = filtered.filter((t) => t.type === filterType)
    }

    setFilteredTickets(filtered)
  }

  const handleStatusUpdate = (updatedTicket: Ticket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
    )
  }

  return (
    <main className="page">
      <NavBar />
      <div className="page-actions">
        <div>
          <h1 className="page-title">Panel de administrador</h1>
          <p className="subtitle">Filtra, busca y revisa boletas de todos los usuarios.</p>
        </div>
        <button type="button" className="secondary-button" onClick={fetchTickets}>
          Recargar
        </button>
      </div>

      {error && (
        <div style={{
          background: '#7f1d1d',
          color: '#fca5a5',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #dc2626'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="card">
        <h2 className="page-title" style={{ fontSize: '1.6rem' }}>Búsqueda rápida</h2>
        <p className="subtitle">Usa filtros para localizar sorteos por nombre, número o estado.</p>
        <div className="form-grid">
          <div className="form-control">
            <label>Buscar por nombre</label>
            <input
              placeholder="Ej. Mega Lotería"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Buscar por número</label>
            <input
              placeholder="Ej. 42"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Filtrar por estado</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Ganado</option>
              <option>Perdido</option>
            </select>
          </div>
          <div className="form-control">
            <label>Filtrar por tipo</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option>Todos</option>
              <option>Lotería</option>
              <option>Rifa</option>
              <option>Sorteo</option>
              <option>Boleta</option>
              <option>Juego ocasional</option>
              <option>Diferenciador</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px', overflowX: 'auto' }}>
        <h2 className="page-title" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>
          Boletas ({filteredTickets.length})
        </h2>
        {isLoading ? (
          <p style={{ color: '#94a3b8' }}>Cargando boletas...</p>
        ) : error ? (
          <p style={{ color: '#ef4444' }}>Mensaje de error mostrado arriba</p>
        ) : filteredTickets.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No hay boletas para mostrar</p>
        ) : (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.95rem',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#cbd5e1' }}>
                  Número
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#cbd5e1' }}>
                  Tipo
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#cbd5e1' }}>
                  Tienda
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#cbd5e1' }}>
                  Fecha de sorteo
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#cbd5e1' }}>
                  Valor
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#cbd5e1' }}>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  style={{
                    borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
                  }}
                >
                  <AdminTicketRow
                    ticket={ticket}
                    onStatusUpdate={handleStatusUpdate}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}
