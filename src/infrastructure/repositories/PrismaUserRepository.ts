import { UserRepository } from '../../domain/repositories/UserRepository'
import { User, UserRole } from '../../domain/entities/User'
import prisma from '../prisma/client'

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return null
    }

    return new User(user.id, user.name, user.email, user.passwordHash, user.role as UserRole, user.createdAt)
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return null
    }

    return new User(user.id, user.name, user.email, user.passwordHash, user.role as UserRole, user.createdAt)
  }

  async create(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
      },
    })

    return new User(created.id, created.name, created.email, created.passwordHash, created.role as UserRole, created.createdAt)
  }

  async promoteToAdmin(id: string): Promise<void> {
    await prisma.user.update({ where: { id }, data: { role: 'admin' } })
  }
}
