import 'dotenv/config'
import helmet from 'helmet'
import cors from 'cors'
import express from "express"
import allRoutes from './routes/index.js'
import startSchedule from './schedule.js'
//auto exec schedule if acctive the import

const app = express();
let port = process.env.PORT || 4001;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`server on 🤍 in port ${port}`));
app.get("/", async(request, response) => response.send("Welcome to the Birthday Admin 👨🏾‍💻") );

app.use(allRoutes);
