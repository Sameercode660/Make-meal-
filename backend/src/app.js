import express from 'express'
import { userRouter } from './routes/user.routes.js'
import cors from 'cors'

const app = express()

app.use(cors({}))

app.use(express.json())
app.use('/user', userRouter)

export {
    app
}