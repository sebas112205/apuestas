import { useState } from 'react'
import { NavBar } from '../components/NavBar'

export function TicketFormPage() {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [place, setPlace] = useState('')
  const [type, setType] = useState('Lotería')
  const [status, setStatus] = useState('Pendiente')
  const [notes, setNotes] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ name, number, date, amount, place, type, status, notes })
    alert('¡Boleta guardada!')
  }

  return (
    <main className="page">
      <NavBar />
      <div className="card">
        <div className="page-actions">
          <div>
            <h1 className="page-title">Agregar boleta / sorteo</h1>
            <p className="subtitle">Registra tus juegos rápido y conserva tus apuestas favoritas.</p>
          </div>
          <button type="button" className="secondary-button">Ayuda</button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Nombre del sorteo</label>
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </div>

          <div className="form-control">
            <label>Número jugado</label>
            <input value={number} onChange={(event) => setNumber(event.target.value)} />
          </div>

          <div className="form-control">
            <label>Fecha del sorteo</label>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </div>

          <div className="form-control">
            <label>Valor apostado</label>
            <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} min="0" />
          </div>

          <div className="form-control">
            <label>Lugar donde se compró</label>
            <input value={place} onChange={(event) => setPlace(event.target.value)} required />
          </div>

          <div className="form-control">
            <label>Tipo de juego</label>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option>Lotería</option>
              <option>Rifa</option>
              <option>Sorteo</option>
              <option>Boleta</option>
              <option>Juego ocasional</option>
            </select>
          </div>

          <div className="form-control">
            <label>Estado</label>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>Pendiente</option>
              <option>Ganado</option>
              <option>Perdido</option>
            </select>
          </div>

          <div className="form-control" style={{ gridColumn: '1 / -1' }}>
            <label>Notas adicionales</label>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
          </div>

          <button type="submit">Guardar boleta</button>
        </form>
      </div>
    </main>
  )
}
