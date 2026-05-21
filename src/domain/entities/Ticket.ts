export type TicketStatus = 'Pendiente' | 'Ganado' | 'Perdido'
export type TicketType = 'Lotería' | 'Rifa' | 'Sorteo' | 'Boleta' | 'Juego ocasional'

export class Ticket {
  constructor(
    public id: string,
    public name: string,
    public number: string | null,
    public drawDate: Date,
    public amount: number | null,
    public place: string,
    public type: TicketType,
    public status: TicketStatus,
    public notes: string | null,
    public userId: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
