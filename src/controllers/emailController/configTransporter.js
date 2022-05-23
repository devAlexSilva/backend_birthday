//cria o transporter com a configuração de quem envia o email

import nodemailer from 'nodemailer'
import pkg from 'googleapis'

const { google } = pkg;
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_OAUTH,
        process.env.CHAVE_OAUTH,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });
    //criando função pra gerar o refresh token

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
        //config para teste no mailtrap
        /*
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: process.env.USER_EMAIL_TRAP,
                    pass: process.env.PASS_EMAIL_TRAP
                },
               */

        //config oficial
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.USER_EMAIL,
            accessToken,
            clientId: process.env.CLIENT_OAUTH,
            clientSecret: process.env.CHAVE_OAUTH,
            refreshToken: process.env.REFRESH_TOKEN
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    return transporter
};


export default createTransporter
