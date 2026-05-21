import api from './api'

export interface Ticket {
  id: string
  number: string
  type: string
  status: 'Pendiente' | 'Ganado' | 'Perdido'
  value: number
  drawDate: string
  storeName: string
  userId: string
  createdAt: string
}

export interface TicketUpdatePayload {
  status: 'Pendiente' | 'Ganado' | 'Perdido'
}

export async function getAllTickets(): Promise<Ticket[]> {
  try {
    const response = await api.get('/admin/tickets')
    return response.data.data || response.data
  } catch (error) {
    console.error('Error fetching all tickets:', error)
    throw error
  }
}

export async function updateTicketStatus(
  ticketId: string,
  status: 'Pendiente' | 'Ganado' | 'Perdido'
): Promise<Ticket> {
  try {
    const response = await api.put(`/tickets/${ticketId}`, {
      status,
    })
    return response.data
  } catch (error) {
    console.error('Error updating ticket:', error)
    throw error
  }
}
