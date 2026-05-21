import { randomUUID } from 'crypto'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { PasswordHasher } from '../../../domain/services/PasswordHasher'
import { User } from '../../../domain/entities/User'
import { PublicUser } from '../../dtos/PublicUser'
import { DomainError } from '../../../domain/errors/DomainError'

type RegisterInput = {
  name: string
  email: string
  password: string
}

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async execute(input: RegisterInput): Promise<PublicUser> {
    if (input.password.length < 8) {
      throw new DomainError('La contraseña debe tener al menos 8 caracteres')
    }

    const existingUser = await this.userRepository.findByEmail(input.email)
    if (existingUser) {
      throw new DomainError('El email ya está registrado')
    }

    const passwordHash = await this.passwordHasher.hash(input.password)
    const user = new User(
      randomUUID(),
      input.name,
      input.email,
      passwordHash
    )

    const createdUser = await this.userRepository.create(user)
    return createdUser.toPublic()
  }
}
