import type Mail from "nodemailer/lib/mailer/index.js";

import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'



export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "fawals98@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    },
})

export async function sendMail(to: string, subject: string, text?: string, html?: string) {
    try {
        transporter.sendMail({
            from: 'MinhTien Organization',
            to: to,
            subject: subject,
            text: text ?? 'congratulation!',
            html: html ?? '<h1>congratulation!</h1>'
        })
    } catch (error) {
        console.error(error)
    }

} 