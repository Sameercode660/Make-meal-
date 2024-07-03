import nodemailer from 'nodemailer'
import { otpGenerator } from './otpGenerator.utils.js'

const nodeMailer = async (email) => {
    
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'privatething789736@gmail.com',
            pass: 'ylpa stve wvnu tsly'
        }
    })

    const otp = otpGenerator()

    const mailOptions = {
        from:  '<privatething789736@gmail.com>',
        to: email,
        subject: 'verification',
        text: `Your otp interface is here: ${otp}`
    }

    transport.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log('Error is sending the mail',err)
        } else {
            console.log('Email is sent successfully : ', info)
        }
    })

    return otp

}

export {
    nodeMailer
}
