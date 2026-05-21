import { Router } from 'express'
import { register, login } from '../controllers/authController'
import { create, list, getById, update, remove } from '../controllers/ticketsController'
import { getTickets as getAdminTickets } from '../controllers/adminController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validateDto } from '../middlewares/validateDto'
import { UserRegisterDto } from '../../infrastructure/validators/UserRegisterDto'
import { UserLoginDto } from '../../infrastructure/validators/UserLoginDto'
import { TicketDto } from '../../infrastructure/validators/TicketDto'

const router = Router()

router.post('/auth/register', validateDto(UserRegisterDto), register)
router.post('/auth/login', validateDto(UserLoginDto), login)

router.use(authMiddleware)

router.post('/tickets', validateDto(TicketDto), create)
router.get('/tickets', list)
router.get('/tickets/:id', getById)
router.put('/tickets/:id', validateDto(TicketDto), update)
router.delete('/tickets/:id', remove)

router.get('/admin/tickets', getAdminTickets)

export default router
