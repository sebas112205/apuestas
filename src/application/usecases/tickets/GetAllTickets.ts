import { TicketRepository } from '../../../domain/repositories/TicketRepository'

export type TicketFilter = {
  userId?: string
  status?: string
  type?: string
  search?: string
  page?: number
  limit?: number
}

export class GetAllTickets {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(filters?: TicketFilter) {
    return this.ticketRepository.findAll(filters)
  }
}
