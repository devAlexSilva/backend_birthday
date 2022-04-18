//arquivo que faz o agendamento chamando os metodos que devem ser executados
import pkg from 'node-cron'
import email from './sendEmail.js'
import getDatas from '../controllers/emailController/getDataInDb.js'
import bodyHtml from '../controllers/emailController/bodyEmail.js'
import { crawler, sign } from './crawler.js'


const { schedule } = pkg;
const Timer = '0 5 * * *';
//const Timer = '29 21 * * *';// timer to test every 20 seconds call the scheduler

// '*/5 * * * * *' example: every 5 seconds = */5 <(seconds){optional} (minutes) (hour) (days) (month) (day of week)>
//all day, all month, ever 3 hour verify in DB if there is any message for the next day
const startSchedule = schedule(`${Timer}`, async () => {
    const matchMessage = await getDatas();

    if (matchMessage) {
        const obj = await crawler();
        const currentSign = obj[sign];
        const bodyEmail = bodyHtml(currentSign.textOfSign, currentSign.imgOfSign);

        matchMessage.map(async (data) => {
            const whoReceiveEmail = {
                subject: "Lembrete de Aniversário",
                html: `${bodyEmail}`,
                to: data.user.email,
                from: process.env.USER_EMAIL
            }

            await email(whoReceiveEmail);
        });
    }
},
    {
        scheduled: true,
        timezone: "America/Sao_Paulo",
    }
)

export default startSchedule