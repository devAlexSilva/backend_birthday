import 'dotenv/config'
import cors from 'cors'
import express from "express"
import allRoutes from './routes/index.js'

import { setSchedule } from './sendEmail.js'
const app = express();
let port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`i'm 🤍 in port ${port}`));
//app.get("/", (request, response) => response.send("Welcome to the Birthday Admin 👨🏾‍💻"));
app.get("/", (request, response) => {
    setSchedule();
    response.send('start watch')
});

app.use(allRoutes);
