import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/auth'

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      await register({ name, email, password })
      navigate('/login')
    } catch (err) {
      setError('No se pudo crear la cuenta. Intenta de nuevo.')
    }
  }

  return (
    <main className="page">
      <div className="card">
        <h1 className="page-title">Registro</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre completo
            <input value={name} onChange={(event) => setName(event.target.value)} required minLength={2} />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            Contraseña
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Crear cuenta</button>
        </form>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </main>
  )
}
