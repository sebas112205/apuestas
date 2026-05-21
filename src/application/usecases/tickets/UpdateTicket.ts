import { TicketRepository } from '../../../domain/repositories/TicketRepository'
import { Ticket } from '../../../domain/entities/Ticket'
import { DomainError } from '../../../domain/errors/DomainError'

export class UpdateTicket {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(ticket: Ticket): Promise<Ticket> {
    const existing = await this.ticketRepository.findById(ticket.id)
    if (!existing || existing.userId !== ticket.userId) {
      throw new DomainError('Ticket no encontrado')
    }

    ticket.updatedAt = new Date()
    return this.ticketRepository.update(ticket)
  }
}
