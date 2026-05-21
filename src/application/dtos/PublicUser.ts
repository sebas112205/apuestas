import { UserRole } from '../../domain/entities/User'

export type PublicUser = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}
