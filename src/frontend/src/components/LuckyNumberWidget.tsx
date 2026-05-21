import { useState } from 'react'

const luckyMessages = [
  'Hoy es tu día de suerte 🎉',
  'Este número vibra positivo ✨',
  'Tal vez este sea el ganador 🏆',
  'Prueba esta apuesta con buena energía 💫',
]

export function LuckyNumberWidget() {
  const [number, setNumber] = useState<number | null>(null)
  const [message, setMessage] = useState('¿Listo para descubrir tu número de la suerte?')

  const generateNumber = () => {
    const nextNumber = Math.floor(Math.random() * 100) + 1
    setNumber(nextNumber)
    setMessage(luckyMessages[Math.floor(Math.random() * luckyMessages.length)])
  }

  return (
    <section className="lucky-card">
      <div>
        <p className="lucky-label">Generador de número de la suerte</p>
        <h2 className="lucky-number">{number ?? '--'}</h2>
        <p className="lucky-message">{message}</p>
      </div>
      <button type="button" onClick={generateNumber}>Descubrir mi número</button>
    </section>
  )
}
