import { Router } from "express"
import MessageController from "../../controllers/messageController.js";
import { middleware } from "../../controllers/authenticationController/middleware.js";

const routerMessage = Router();
routerMessage.use(middleware);

routerMessage.post("/create", async (req, res) => {
    const body = req.body
    const token = req.headers.authorization
    
    const client = new MessageController();
    const data = await client.creatMessage(token, body);
    res.send(data);
});

routerMessage.get("/", async (req, res) => {
    const token = req.headers.authorization

    const client = new MessageController();
    const data = await client.getMessage(token);
    res.status(200).send(data);
});

routerMessage.put("/update/:id", async (req, res) => {
    const id = req.params;
    const body = req.body;

    const client = new MessageController();
    const data = await client.updateMessage(id, body);
    res.send(data);
})

routerMessage.delete("/delete/:id", async (req, res) => {
    const id = req.params;

    const client = new MessageController();
    const data = await client.deleteMessage(id);
    res.send(data);
})

export { routerMessage }