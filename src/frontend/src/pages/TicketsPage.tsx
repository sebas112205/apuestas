import { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Link } from 'react-router-dom'
import { EditableTicketCard } from '../components/EditableTicketCard'
import { AdminTicketRow } from '../components/AdminTicketRow'
import type { Ticket } from '../services/tickets'
import { getAllTickets } from '../services/tickets'
import api from '../services/api'

export function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const user = localStorage.getItem('authUser')
      if (user) {
        const userData = JSON.parse(user)
        setIsAdmin(userData.role === 'admin' || userData.isAdmin)
      }
    } catch (err) {
      console.error('Error checking admin status:', err)
    }
  }

  const handleLoadTickets = async () => {
    setIsLoading(true)
    try {
      if (isAdmin) {
        const data = await getAllTickets()
        console.log('Tickets loaded:', data)
        setTickets(Array.isArray(data) ? data : [])
        setShowTable(true)
      }
    } catch (err: any) {
      console.error('Error loading tickets:', err)
      alert(`Error al cargar boletas: ${err?.response?.data?.error || err?.message || 'Error desconocido'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = (updatedTicket: Ticket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
    )
  }

  const defaultTickets = [
    {
      name: 'Mega Lotería',
      number: '12-08-33',
      drawDate: '2026-05-30',
      amount: 20,
      place: 'Kiosko Central',
      type: 'Lotería',
      status: 'Pendiente' as const,
      notes: 'Sorteo semanal',
    },
    {
      name: 'Rifa solidaria',
      number: '47',
      drawDate: '2026-05-21',
      amount: 10,
      place: 'Tienda Azul',
      type: 'Rifa',
      status: 'Perdido' as const,
      notes: 'No olvides revisar resultados',
    },
    {
      name: 'Boleta festival',
      number: '98',
      drawDate: '2026-06-03',
      amount: 35,
      place: 'Plaza Verde',
      type: 'Boleta',
      status: 'Pendiente' as const,
      notes: 'Premio grande',
    },
    {
      name: 'Boleto diferenciador',
      number: '00',
      drawDate: '2026-06-10',
      amount: 50,
      place: 'Club Especial',
      type: 'Diferenciador',
      status: 'Pendiente' as const,
      notes: 'Nueva categoría diferenciadora',
    },
  ]

  return (
    <main className="page">
      <NavBar />
      <div className="page-actions">
        <div>
          <h1 className="page-title">{isAdmin ? 'Todas las boletas' : 'Mis boletas'}</h1>
          <p className="subtitle">
            {isAdmin
              ? 'Visualiza y gestiona boletas de todos los usuarios.'
              : 'Haz clic en el estado de una boleta para cambiarla.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {isAdmin && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleLoadTickets}
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Cargar todas las boletas'}
            </button>
          )}
          {!isAdmin && (
            <Link to="/tickets/new">
              <button type="button">Agregar boleta</button>
            </Link>
          )}
        </div>
      </div>

      {isAdmin && showTable ? (
        <div className="card" style={{ marginTop: '24px', overflowX: 'auto' }}>
          <h2 className="page-title" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>
            Administración de boletas ({tickets.length})
          </h2>
          {tickets.length === 0 ? (
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
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#cbd5e1',
                    }}
                  >
                    Número
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#cbd5e1',
                    }}
                  >
                    Tipo
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#cbd5e1',
                    }}
                  >
                    Tienda
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#cbd5e1',
                    }}
                  >
                    Fecha de sorteo
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#cbd5e1',
                    }}
                  >
                    Valor
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#cbd5e1',
                    }}
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
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
      ) : (
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '20px' }}>
            💡 Haz clic en el estado (badge) de cualquier boleta para cambiarla
          </p>
          <div className="ticket-grid">
            {defaultTickets.map((ticket) => (
              <EditableTicketCard
                key={`${ticket.name}-${ticket.drawDate}`}
                ticket={ticket}
                isEditable={true}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
