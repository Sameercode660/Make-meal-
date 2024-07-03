import jwt from 'jsonwebtoken'


function jwtSign(data) {
    return jwt.sign({data}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN})
}

function verify(token) {
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return true
    } catch (error) {
        console.error('Error verifying token: ', error.message)       
        return false
    }
}


export {
    jwtSign,
    verify
}
