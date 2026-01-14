import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

// routes import
import userRouter from './routes/user.routes.js'
import incomeRouter from './routes/income.routes.js'
import savingRouter from './routes/saving.routes.js'

// routes declaration
app.use('/api/v1/users', userRouter)
app.use('/api/v1/incomes', incomeRouter)
app.use('/api/v1/savings', savingRouter)

export { app }
