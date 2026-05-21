import { randomUUID } from 'crypto'
import { TicketRepository } from '../../../domain/repositories/TicketRepository'
import { Ticket, TicketStatus, TicketType } from '../../../domain/entities/Ticket'

type CreateTicketInput = {
  name: string
  number?: string
  drawDate: string
  amount?: number
  place: string
  type: TicketType
  status: TicketStatus
  notes?: string
  userId: string
}

export class CreateTicket {
  constructor(private ticketRepository: TicketRepository) {}

  async execute(input: CreateTicketInput): Promise<Ticket> {
    const ticket = new Ticket(
      randomUUID(),
      input.name,
      input.number || null,
      new Date(input.drawDate),
      input.amount ?? null,
      input.place,
      input.type,
      input.status,
      input.notes ?? null,
      input.userId
    )

    return this.ticketRepository.create(ticket)
  }
}
