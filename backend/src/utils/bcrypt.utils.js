import bcrypt from 'bcrypt'

async function encryptPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function comparePassword(plainPassword, hash) {
    return await bcrypt.compare(plainPassword, hash)
}

export {
    encryptPassword,
    comparePassword
}