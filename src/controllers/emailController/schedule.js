import pkg from 'node-cron'
import prisma from '../../prisma/prismaClient.js'

//set timer
//search messages in db 
//return for the services
const { schedule } = pkg;
const productionTimer = '1 0 * * *';
let testTimer = '*/10 * * * * *';

const Schedule = {

    init: () => {
        let count = 0;
        // '*/5 * * * * *' example: every 5 seconds = */5 <(seconds){optional} (minutes) (hour) (days) (month) (day of week)>
        //all day, all month, ever 0 hour and 1 minutes verify in DB if there is any message for the next day
        schedule(`${testTimer}`, () => {
            Schedule.getDatas();

        },
            {
                scheduled: true,
                timezone: "America/Sao_Paulo",

            }
        )
    },

    getDatas: async () => {
        let dateLocal = new Date().toLocaleString('pt-BR', { timezone:'America/Sao_Paulo' });
        let currentData = dateLocal.slice(0, 10);
        try {
            const allMessage = await prisma.message.findMany({
                where: { dateBirthday: currentData },
            });
            return allMessage;

        } catch (err) {
            return err
        }
    }

}


export { Schedule }