import nodemailer from 'nodemailer'

const conect = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com", //smtp.mailtrap.io
        port: 465, // 2525
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL
        }
    });

    const mailOptions = {
        from: '"teste de envio" <birthdaywebxyz@gmail.com>',
        to: 'eoqalex@gmail.com',
        subject: 'testando os envios de emails',
        text: 'For clients with plaintext support only',
        html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
        amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        <p>GIF (requires "amp-anim" script in header):<br/>
          <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
      </body>
    </html>`,
        /*attachments: [
            {
                filename: 'mailtrap.png',
                path: __dirname + '/mailtrap.png',
                cid: 'uniq-mailtrap.png'
            }
        ]*/
    };

    const result = transport.sendMail(mailOptions, (error, info) => {
        error ? console.log(error)
            : console.log('Message sent: ', info.messageId);
    });
    return result
}
export { conect }