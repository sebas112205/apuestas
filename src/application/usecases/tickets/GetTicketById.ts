import { TicketRepository } from '../../../domain/repositories/TicketRepository'
import { Ticket } from '../../../domain/entities/Ticket'
import { DomainError } from '../../../domain/errors/DomainError'

export class GetTicketById {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(id: string, userId: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findById(id)
    if (!ticket || ticket.userId !== userId) {
      throw new DomainError('Ticket no encontrado')
    }

    return ticket
  }
}
