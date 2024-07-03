import mongoose from 'mongoose'

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Db is connected to ', connectionInstance.connection.host)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export {
    connectDB
}