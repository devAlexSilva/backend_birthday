import 'dotenv/config' 
import express from "express"
import { router } from './routes.js'
import cors from 'cors'

let port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`i'm ok in port ${port}`));
app.get("/", (request, response) => response.send("hello, bye"));

