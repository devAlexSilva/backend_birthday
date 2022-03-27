import 'dotenv/config'
import cors from 'cors'
import express from "express"
import allRoutes from './routes/index.js'
import crowler from './crowler.js'

const app = express();
let port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`i'm 🤍 in port ${port}`));
//app.get("/", (request, response) => response.send("Welcome to the Birthday Admin 👨🏾‍💻") );
app.get("/", async (request, response) => {
    console.log(await crowler());
        response.send("Welcome to the Birthday Admin 👨🏾‍💻"); 
});

app.use(allRoutes);
