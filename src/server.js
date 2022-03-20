import 'dotenv/config' 
import app from "./app.js"

let port = process.env.PORT
app.listen(port, () => console.log("i'm ok"));