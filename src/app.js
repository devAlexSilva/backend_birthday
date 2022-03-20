import express from "express"
import routes from "./routes/userRoutes.js";

const app = express();
app.get("/", (request, response) => response.send("hello, bye"));

app.use(routes);

export default app;