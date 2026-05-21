export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET ?? 'secret',
  expiresIn: '24h',
}
