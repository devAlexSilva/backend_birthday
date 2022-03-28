//arquivo que faz o agendamento chamando os metodos que devem ser executados

import pkg from 'node-cron'
import email from './sendEmail.js'
import getDatas from '../controllers/emailController/getDataInDb.js'
import bodyHtml from '../controllers/emailController/bodyEmail.js'
import crawler from './crawler.js'


const { schedule } = pkg;
//const Timer = '1 0 * * *';
const Timer = '*/20 * * * * *';


// '*/5 * * * * *' example: every 5 seconds = */5 <(seconds){optional} (minutes) (hour) (days) (month) (day of week)>
//all day, all month, ever 0 hour and 1 minutes verify in DB if there is any message for the next day
const startSchedule = schedule(`${Timer}`, async () => {
    console.log('aaa')

    const matchMessage = await getDatas();
    if (matchMessage) {
        const { innerText, src } = await crawler();
        const bodyEmail = bodyHtml(innerText, src);

        matchMessage.map(async (data) => {

            const whoReceiveEmail = {
                subject: "Testando envio de email com signos",
                html: `${bodyEmail}`,
                to: data.user.email,
                from: process.env.USER_EMAIL
            }

            //await email(whoReceiveEmail);
        });
    }
},
    {
        scheduled: true,
        timezone: "America/Sao_Paulo",
    }
)

export default startSchedule