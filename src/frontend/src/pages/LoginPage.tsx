import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError('No se pudo iniciar sesión. Revisa tus credenciales.')
    }
  }

  return (
    <main className="page">
      <div className="card">
        <h1 className="page-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            Contraseña
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Entrar</button>
        </form>
        <p>
          ¿No tienes cuenta?
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/register')}
            style={{ marginLeft: '8px' }}
          >
            Regístrate
          </button>
        </p>
      </div>
    </main>
  )
}
