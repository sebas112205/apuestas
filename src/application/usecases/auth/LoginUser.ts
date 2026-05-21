import { UserRepository } from '../../../domain/repositories/UserRepository'
import { PasswordHasher } from '../../../domain/services/PasswordHasher'
import { PublicUser } from '../../dtos/PublicUser'
import { DomainError } from '../../../domain/errors/DomainError'

type LoginInput = {
  email: string
  password: string
}

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async execute(input: LoginInput): Promise<{ user: PublicUser }> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) {
      throw new DomainError('Credenciales inválidas')
    }

    const validPassword = await this.passwordHasher.compare(
      input.password,
      user.passwordHash
    )
    if (!validPassword) {
      throw new DomainError('Credenciales inválidas')
    }

    return { user: user.toPublic() }
  }
}
