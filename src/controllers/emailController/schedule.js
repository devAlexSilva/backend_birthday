import pkg from 'node-cron'
import prisma from '../../prisma/prismaClient.js'

//set timer
//search messages in db 
//return for the services
const { schedule } = pkg;
const productionTimer = '1 0 * * *';
let testTimer = '0 */1 * * * *';

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
                timezone: "America/Sao_Paulo"
            }
        )
    },

    getDatas: async () => {
        try {
            const allMessage = await prisma.message.findMany({
                where: {
                    date: Date.now()
                }
            });
            return console.log(allMessage);

        } catch (err) {
            throw new err;
        }
    }

}


export { Schedule }