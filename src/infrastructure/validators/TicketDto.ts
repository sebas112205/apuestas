import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { TicketStatus, TicketType } from '../../domain/entities/Ticket'

export class TicketDto {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsOptional()
  @IsString()
  number?: string

  @IsDateString()
  drawDate!: string

  @IsOptional()
  amount?: number

  @IsNotEmpty()
  @IsString()
  place!: string

  @IsEnum(['Lotería', 'Rifa', 'Sorteo', 'Boleta', 'Juego ocasional', 'Diferenciador'])
  type!: TicketType

  @IsEnum(['Pendiente', 'Ganado', 'Perdido'])
  status!: TicketStatus

  @IsOptional()
  @IsString()
  notes?: string
}
