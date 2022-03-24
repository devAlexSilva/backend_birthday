import { Router } from 'express'
import TokenLogin from '../../controllers/authenticationController/tokenLogin.js';
import UserController from '../../controllers/userController.js';

const login = Router();

login.post("/create", async (request, response) => {
    const client = new UserController();

    const data = await client.createUser(request);
    response.json(data)
});

login.post("/login", async (request, response) => {
    const client = new TokenLogin();
    const body = request.body;

    const data = await client.login(body);
    response.send(data);
});

export { login }