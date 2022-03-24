import { Schedule } from "../controllers/emailController/schedule.js"
import { SendEmail } from "../controllers/emailController/sendEmail.js"


const sedex = new SendEmail;
export const setSchedule = () => {

    Schedule.init();
}