

function otpGenerator() {
    let otp = Math.floor(Math.random() * 9999)

    if(otp < 4) {
        otp = otp + '0'
    }
    return otp
}


export {
    otpGenerator
}