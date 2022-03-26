import bodyHtml from './bodyEmail.js'
import getDatas from './getDataInDb.js'

//a função desse arquivo é montar a menssagem:
/**
 * recebe o body da menssagem
 * recebe do DB os dados que batem com a data
 * de acordo com a data puxa as informações da api de signos
 * filtra as informações pra montar a menssagem
 */


    const whoReceiveEmail = {
        subject: "Testando envio de html",
        html: bodyHtml,
        to: "eoqalex@gmail.com",
        from: process.env.USER_EMAIL
    }

export default whoReceiveEmail