import { Router } from 'express'
import UserController from '../../controllers/userController.js'
import { middleware } from '../../controllers/authenticationController/middleware.js'

export const routerUser = Router()
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

routerUser.put("/update/:id", async (request, response) => {
    const client = new UserController();
    const { id } = request.params;
    const { name } = request.body

    const data = await client.updateUser(id, name);
    response.send(data)
});

routerUser.delete("/delete/:id", async (req, res) => {
    const id = req.params;

    const client = new UserController();
    const data = await client.deleteUser(id);
    res.send(data);
})