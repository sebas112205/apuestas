import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_CONFIG } from '../../infrastructure/config/jwt'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  const token = authHeader.replace('Bearer ', '')
  try {
    const payload = jwt.verify(token, JWT_CONFIG.secret) as { sub: string; role: string }
    req.userId = payload.sub
    req.userRole = payload.role
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
