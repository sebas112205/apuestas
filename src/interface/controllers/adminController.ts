import { NextFunction, Request, Response } from 'express'
import { PrismaTicketRepository } from '../../infrastructure/repositories/PrismaTicketRepository'
import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository'
import { GetAllTickets } from '../../application/usecases/tickets/GetAllTickets'

const ticketRepository = new PrismaTicketRepository()
const userRepository = new PrismaUserRepository()
const getAllTickets = new GetAllTickets(ticketRepository)

export async function getTickets(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' })
    }

    const page = Number(req.query.page ?? 1)
    const limit = Number(req.query.limit ?? 20)

    const result = await getAllTickets.execute({
      status: req.query.status as string,
      type: req.query.type as string,
      search: req.query.search as string,
      page,
      limit,
    })

    res.json({ data: result.tickets, meta: { total: result.total, page, limit } })
  } catch (error) {
    next(error)
  }
}

export async function promoteToAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'No autorizado' })
    }

    await userRepository.promoteToAdmin(req.userId)
    const user = await userRepository.findById(req.userId)

    res.json({ data: { user: user?.toPublic() } })
  } catch (error) {
    next(error)
  }
}
