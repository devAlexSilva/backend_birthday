import express from 'express'
import UserController from '../controllers/users/userController.js'
//import MessageController from '../controllers/message/messageController.js'
import TokenLogin from '../controllers/authentication/tokenLogin.js'

const router = express.Router()

router.post("/login", async (request, response) => {
    const client = new TokenLogin();
    const body = request.body;

    const data = await client.login(body);
    response.send(data);
});

router.get("/user/:id", async (request, response) => {
    const client = new UserController();
    const { id } = request.params;

    const data = await client.getUser(id);
    response.send(data)
    data ? response.json(data) : response.sendStatus(404); //pode vim vazio sem dar erro
});

router.post("/user/create", async (request, response) => {
    const client = new UserController();

    const data = await client.createUser(request);
    response.send(data)
});

router.put("/user/:id/update", async (request, response) => {
    const client = new UserController();
    const { id } = request.params;
    const { name } = request.body

    const data = await client.updateUser(id, name);
    response.send(data)
});


/*
router.post("/message/create", async (request, response) => {
    const client = new MessageController();
    const 
})
*/
export { router }