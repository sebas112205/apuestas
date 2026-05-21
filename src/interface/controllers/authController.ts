import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository'
import { BcryptPasswordHasher } from '../../infrastructure/security/BcryptPasswordHasher'
import { RegisterUser } from '../../application/usecases/auth/RegisterUser'
import { LoginUser } from '../../application/usecases/auth/LoginUser'
import { JWT_CONFIG } from '../../infrastructure/config/jwt'

const userRepository = new PrismaUserRepository()
const passwordHasher = new BcryptPasswordHasher()
const registerUser = new RegisterUser(userRepository, passwordHasher)
const loginUser = new LoginUser(userRepository, passwordHasher)

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await registerUser.execute(req.body)
    res.status(201).json({ data: user })
  } catch (error) {
    next(error)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await loginUser.execute(req.body)
    const token = jwt.sign({ sub: result.user.id, role: result.user.role }, JWT_CONFIG.secret, {
      expiresIn: JWT_CONFIG.expiresIn,
    })

    res.json({ data: { token, user: result.user } })
  } catch (error) {
    next(error)
  }
}
