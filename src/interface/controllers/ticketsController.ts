import { NextFunction, Request, Response } from 'express'
import { PrismaTicketRepository } from '../../infrastructure/repositories/PrismaTicketRepository'
import { CreateTicket } from '../../application/usecases/tickets/CreateTicket'
import { GetTickets } from '../../application/usecases/tickets/GetTickets'
import { GetTicketById } from '../../application/usecases/tickets/GetTicketById'
import { UpdateTicket } from '../../application/usecases/tickets/UpdateTicket'
import { DeleteTicket } from '../../application/usecases/tickets/DeleteTicket'
import { Ticket } from '../../domain/entities/Ticket'

const ticketRepository = new PrismaTicketRepository()
const createTicket = new CreateTicket(ticketRepository)
const getTickets = new GetTickets(ticketRepository)
const getTicketById = new GetTicketById(ticketRepository)
const updateTicket = new UpdateTicket(ticketRepository)
const deleteTicket = new DeleteTicket(ticketRepository)

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const ticket = await createTicket.execute({ ...req.body, userId: req.userId! })
    res.status(201).json({ data: ticket })
  } catch (error) {
    next(error)
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const tickets = await getTickets.execute(req.userId!)
    res.json({ data: tickets })
  } catch (error) {
    next(error)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const ticket = await getTicketById.execute(req.params.id, req.userId!)
    res.json({ data: ticket })
  } catch (error) {
    next(error)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const ticket = new Ticket(
      req.params.id,
      req.body.name,
      req.body.number || null,
      new Date(req.body.drawDate),
      req.body.amount ?? null,
      req.body.place,
      req.body.type,
      req.body.status,
      req.body.notes ?? null,
      req.userId!,
      new Date(req.body.createdAt ?? Date.now())
    )

    const updated = await updateTicket.execute(ticket)
    res.json({ data: updated })
  } catch (error) {
    next(error)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteTicket.execute(req.params.id, req.userId!)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
