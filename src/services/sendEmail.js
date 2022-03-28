// arquivo para executar o envio de e-mails
import createTransporter from '../controllers/emailController/configTransporter.js'


const email = async (options) => {    
    let emailTransporter = await createTransporter(); //retornando uma conexão segura com o Oauth2
    await emailTransporter.sendMail(options);
    console.log('done');
}


export default email