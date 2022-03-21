import express from 'express'
import UserController from '../../controllers/users/userController.js'
//import MessageController from '../controllers/message/messageController.js'
import { middleware } from '../../controllers/authentication/middleware.js'

const routerUser = express.Router()
routerUser.use(middleware);

routerUser.get("/:id", async (request, response) => {
    const client = new UserController();
    const { id } = request.params;

    const data = await client.getUser(id);
    
    response.send(data)
    
    data ? response.json(data) : response.sendStatus(404); //pode vim vazio sem dar erro
});

routerUser.post("/create", async (request, response) => {
    const client = new UserController();

    const data = await client.createUser(request);
    response.send(data)
});

routerUser.put("/:id/update", async (request, response) => {
    const client = new UserController();
    const { id } = request.params;
    const { name } = request.body

    const data = await client.updateUser(id, name);
    response.send(data)
});


export { routerUser }