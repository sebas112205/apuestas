import api from './api'

type LoginPayload = {
  email: string
  password: string
}

type RegisterPayload = {
  name: string
  email: string
  password: string
}

export async function login(payload: LoginPayload) {
  const response = await api.post('/auth/login', payload)
  const { token, user } = response.data.data
  localStorage.setItem('authToken', token)
  localStorage.setItem('authUser', JSON.stringify(user))
  return user
}

export async function register(payload: RegisterPayload) {
  const response = await api.post('/auth/register', payload)
  return response.data.data
}

export async function promoteToAdmin() {
  const response = await api.post('/admin/promote')
  const user = response.data.data.user
  localStorage.setItem('authUser', JSON.stringify(user))
  return user
}
