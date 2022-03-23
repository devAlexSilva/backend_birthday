import { Router } from 'express'
import TokenLogin from '../../controllers/authenticationController/tokenLogin.js';

const login = Router();

login.post("/login", async (request, response) => {
    const client = new TokenLogin();
    const body = request.body;

    const data = await client.login(body);
    response.send(data);
});

export { login }