import pkg from 'node-cron'

const { schedule } = pkg;

const Schedule = {

    create: () => {
        let count = 0;
        
        schedule(`*/5 * * * * *`, () => { // '*/5 * * * * *' a cada 5s <(seconds) (minutes) (hour) (days) (month) (day of week)>
            console.log(count++);
        },
            {
                scheduled: true,
                timezone: "America/Sao_Paulo"
            }
        )
    },

}


export { Schedule }