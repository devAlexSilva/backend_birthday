import pkg from 'node-cron'
import email from './sendEmail.js'
import getDatas from '../controllers/emailController/getDataInDb.js'


const { schedule } = pkg;
const productionTimer = '1 0 * * *';
let testTimer = '*/10 * * * * *';


// '*/5 * * * * *' example: every 5 seconds = */5 <(seconds){optional} (minutes) (hour) (days) (month) (day of week)>
//all day, all month, ever 0 hour and 1 minutes verify in DB if there is any message for the next day
const startSchedule = schedule(`${testTimer}`, async () => {
    //const matchMessage = await getDatas();
    console.log('ddd');

    //await email();
},
    {
        scheduled: true,
        timezone: "America/Sao_Paulo",
    }
)

export default startSchedule