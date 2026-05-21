import { useState } from 'react'
import { NavBar } from '../components/NavBar'

export function TicketFormPage() {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [place, setPlace] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ name, number, date, amount, place })
  }

  return (
    <main className="page">
      <NavBar />
      <div className="card">
        <h1 className="page-title">Agregar boleta / sorteo</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre del sorteo
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label>
            Número jugado
            <input value={number} onChange={(event) => setNumber(event.target.value)} />
          </label>
          <label>
            Fecha del sorteo
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </label>
          <label>
            Valor apostado
            <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>
          <label>
            Lugar donde se compró
            <input value={place} onChange={(event) => setPlace(event.target.value)} required />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </main>
  )
}
