import { NextFunction, Request, Response } from 'express'
import { DomainError } from '../../domain/errors/DomainError'

export function errorMiddleware(error: unknown, req: Request, res: Response, next: NextFunction) {
  if (error instanceof DomainError) {
    return res.status(400).json({ error: error.message })
  }

  if (error instanceof Error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(500).json({ error: 'Error interno del servidor' })
}
