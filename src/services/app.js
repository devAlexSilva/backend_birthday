import 'dotenv/config' 
import cors from 'cors'
import express from "express"
import { login } from './routes/login.js'
import { routerUser } from './routes/routesUser.js'
import { routerMessage } from './routes/routerMessage.js'

const app = express();
let port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`i'm ok in port ${port}`));
app.get("/", (request, response) => response.send("hello, bye"));

app.use("/", login)
app.use("/user", routerUser);
app.use("/message", routerMessage)
