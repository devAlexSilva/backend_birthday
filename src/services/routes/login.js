//cria o user e faz o login gerando o token (rota sem auth)

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
    const body = request.body;

    const data = await TokenLogin(body);
    response.send(data);
});

export { login }