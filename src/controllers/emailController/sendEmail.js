import nodemailer from 'nodemailer'
import pkg from 'googleapis'

const { google } = pkg;
const OAuth2 = google.auth.OAuth2;


/*
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        type: 'OAuth2',
        accessUrl: true,
        clientId: process.env.CLIENT_OAUTH,
        clientSecret: process.env.CHAVE_OAUTH
    }
});
*/
const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_OAUTH,
        process.env.CHAVE_OAUTH,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject();
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
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

const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
}

sendEmail({
    subject: "Test",
    text: "I am sending an email from nodemailer!",
    to: "eoqalex@gmail.com",
    from: process.env.USER_EMAIL
});



export { createTransporter }
