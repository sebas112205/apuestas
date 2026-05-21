import { TicketRepository } from '../../../domain/repositories/TicketRepository'
import { DomainError } from '../../../domain/errors/DomainError'

export class DeleteTicket {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const ticket = await this.ticketRepository.findById(id)
    if (!ticket || ticket.userId !== userId) {
      throw new DomainError('Ticket no encontrado')
    }

    await this.ticketRepository.deleteById(id)
  }
}
