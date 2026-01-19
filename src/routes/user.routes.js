import { Router } from 'express'
import {
  registerUserByPhone,
  loginUserByPhone,
} from '../controllers/user.controller.js'

const router = Router()

router.route('/register').post(registerUserByPhone)
router.route('/login').post(loginUserByPhone)

export default router
