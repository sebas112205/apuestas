import { TicketRepository } from '../../../domain/repositories/TicketRepository'
import { Ticket } from '../../../domain/entities/Ticket'

export class GetTickets {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(userId: string): Promise<Ticket[]> {
    return this.ticketRepository.findByUserId(userId)
  }
}
