import { Router } from 'express'
import UserController from '../../controllers/userController.js'
import { middleware } from '../../controllers/authenticationController/middleware.js'

export const routerUser = Router()
routerUser.use(middleware);

routerUser.get("/:id", async (request, response) => {
    const client = new UserController();
    const { id } = request.params;

    const data = await client.getUser(id);
    
    data ? response.json(data) : response.sendStatus(404); //handle with case of come empty without error
    
});

// i can't use router "/create" without middleware, so i took it out of here

routerUser.put("/update/:id", async (request, response) => {
    const client = new UserController();
    const { id } = request.params;
    const { name } = request.body

    const data = await client.updateUser(id, name);
    response.json(data)
});

routerUser.delete("/delete/:id", async (req, res) => {
    const id = req.params;

    const client = new UserController();
    const data = await client.deleteUser(id);
    res.json(data);
})