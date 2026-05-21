import { Ticket } from '../entities/Ticket'

export interface TicketRepository {
  create(ticket: Ticket): Promise<Ticket>
  findById(id: string): Promise<Ticket | null>
  findByUserId(userId: string): Promise<Ticket[]>
  update(ticket: Ticket): Promise<Ticket>
  deleteById(id: string): Promise<void>
  findAll(filters?: {
    userId?: string
    status?: string
    type?: string
    search?: string
    page?: number
    limit?: number
  }): Promise<{ tickets: Ticket[]; total: number }>
}
