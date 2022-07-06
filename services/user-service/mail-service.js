const nodemailer = require('nodemailer');

class MailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.USER_LOGIN,
                pass: process.env.USER_PASS
            }

        })
    }
    async sendMailActivation(to, link) {
        await this.transporter.sendMail({
            from: process.env.USER_LOGIN,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html: 
            `
            <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href=${link}>${link}></a>
            </div>
            `
        })
    }
    async sendMailRecovery(to, link) {
        await this.transporter.sendMail({
            from: process.env.USER_LOGIN,
            to,
            subject: 'Восстановление пароля на ' + process.env.API_URL,
            text: '',
            html: 
            `
            <div>
            <h1>Для восстановления перейдите по ссылке</h1>
            <a href=${link}>${link}></a>
            </div>
            `
        })
    }
}
module.exports = new MailService();