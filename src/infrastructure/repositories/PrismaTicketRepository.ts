import { TicketRepository } from '../../domain/repositories/TicketRepository'
import { Ticket } from '../../domain/entities/Ticket'
import prisma from '../prisma/client'

export class PrismaTicketRepository implements TicketRepository {
  async create(ticket: Ticket): Promise<Ticket> {
    const created = await prisma.ticket.create({
      data: {
        id: ticket.id,
        name: ticket.name,
        number: ticket.number,
        drawDate: ticket.drawDate,
        amount: ticket.amount,
        place: ticket.place,
        type: ticket.type,
        status: ticket.status,
        notes: ticket.notes,
        userId: ticket.userId,
      },
    })

    return new Ticket(
      created.id,
      created.name,
      created.number,
      created.drawDate,
      created.amount,
      created.place,
      created.type,
      created.status,
      created.notes,
      created.userId,
      created.createdAt,
      created.updatedAt
    )
  }

  async findById(id: string): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findUnique({ where: { id } })
    if (!ticket) {
      return null
    }

    return new Ticket(
      ticket.id,
      ticket.name,
      ticket.number,
      ticket.drawDate,
      ticket.amount,
      ticket.place,
      ticket.type,
      ticket.status,
      ticket.notes,
      ticket.userId,
      ticket.createdAt,
      ticket.updatedAt
    )
  }

  async findByUserId(userId: string): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
      where: { userId },
      orderBy: { drawDate: 'desc' },
    })

    return tickets.map(
      (ticket) =>
        new Ticket(
          ticket.id,
          ticket.name,
          ticket.number,
          ticket.drawDate,
          ticket.amount,
          ticket.place,
          ticket.type,
          ticket.status,
          ticket.notes,
          ticket.userId,
          ticket.createdAt,
          ticket.updatedAt
        )
    )
  }

  async update(ticket: Ticket): Promise<Ticket> {
    const updated = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        name: ticket.name,
        number: ticket.number,
        drawDate: ticket.drawDate,
        amount: ticket.amount,
        place: ticket.place,
        type: ticket.type,
        status: ticket.status,
        notes: ticket.notes,
        updatedAt: new Date(),
      },
    })

    return new Ticket(
      updated.id,
      updated.name,
      updated.number,
      updated.drawDate,
      updated.amount,
      updated.place,
      updated.type,
      updated.status,
      updated.notes,
      updated.userId,
      updated.createdAt,
      updated.updatedAt
    )
  }

  async deleteById(id: string): Promise<void> {
    await prisma.ticket.delete({ where: { id } })
  }

  async findAll(filters?: {
    userId?: string
    status?: string
    type?: string
    search?: string
    page?: number
    limit?: number
  }): Promise<{ tickets: Ticket[]; total: number }> {
    const where: any = {}
    if (filters?.userId) where.userId = filters.userId
    if (filters?.status) where.status = filters.status
    if (filters?.type) where.type = filters.type
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { place: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    const page = filters?.page ?? 1
    const limit = filters?.limit ?? 20

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { drawDate: 'desc' },
      }),
      prisma.ticket.count({ where }),
    ])

    return {
      tickets: tickets.map(
        (ticket) =>
          new Ticket(
            ticket.id,
            ticket.name,
            ticket.number,
            ticket.drawDate,
            ticket.amount,
            ticket.place,
            ticket.type,
            ticket.status,
            ticket.notes,
            ticket.userId,
            ticket.createdAt,
            ticket.updatedAt
          )
      ),
      total,
    }
  }
}
