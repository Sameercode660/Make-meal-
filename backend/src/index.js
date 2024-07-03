import {config} from 'dotenv'
config()

import { connectDB } from './db/connection.db.js'
import { app } from './app.js'

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server is listening on ', process.env.PORT)
    })
}).catch((error) => {
    console.log('Unable to start the server', error)
})