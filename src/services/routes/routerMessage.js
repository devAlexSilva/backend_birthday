import { Router } from "express"
import MessageController from "../../controllers/message/messageController.js";
import { middleware } from "../../controllers/authentication/middleware.js";

const routerMessage = Router();
routerMessage.use(middleware);

routerMessage.post("/create", async (req, res) => {
    const body = req.body
    const token = req.headers.authorization
    
    const client = new MessageController();
    const data = await client.creatMessage(token, body);
    res.status(201).send(data);
});

routerMessage.get("/", async (req, res) => {
    const token = req.headers.authorization

    const client = new MessageController();
    const data = await client.getMessage(token);
    res.status(200).send(data);
})

export { routerMessage }