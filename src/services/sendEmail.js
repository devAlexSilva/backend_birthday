import { createTransporter } from '../controllers/emailController/sendEmail.js'

    /*
        mailOptions = {
            from: process.env.USER_EMAIL,
            to: 'eoqalex@gmail.com',
            subject: 'testando os envios de emails',
            text: 'For clients with plaintext support only',
            html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
            auth: {
                user: process.env.CLIENT_OAUTH,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.CHAVE_OAUTH,
                expires: 1484314697598
            }
        }
    
        sendEmail = async () => {
            await transporter.sendMail(this.mailOptions)
                .then(info => {
                    console.log('Message send: ', info.messageId);
                })
                .catch(err => console.log(err));
        }
    */

export { createTransporter }