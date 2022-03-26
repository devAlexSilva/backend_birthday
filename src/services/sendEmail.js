import createTransporter from '../controllers/emailController/configTransporter.js'
import whoReceiveEmail from '../controllers/emailController/emailRecipient.js'


const email = async () => {    
    let emailTransporter = await createTransporter(); //retornando uma conexão segura com o Oauth2
    await emailTransporter.sendMail(whoReceiveEmail.options);
}


export default email