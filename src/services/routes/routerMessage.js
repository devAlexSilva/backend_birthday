import { Router } from "express"
import MessageController from "../../controllers/message/messageController.js";
import { middleware } from "../../controllers/authentication/middleware.js";

const routerMessage = Router();
routerMessage.use(middleware);

routerMessage.post("/create", async (req, res) => {
    const body = req.body
    const info = req.headers.authorization
    
    const client = new MessageController();
    const data = await client.creatMessage(info, body);
    res.send(data);
})

export { routerMessage }