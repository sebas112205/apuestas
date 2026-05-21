export type UserRole = 'user' | 'admin'

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: UserRole = 'user',
    public createdAt: Date = new Date()
  ) {}

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
    }
  }
}
