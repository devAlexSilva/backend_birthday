import express, { request, response } from 'express'
import UserController from '../controllers/users/userController.js'

const router = express.Router()

router.get("/users", async(request, response) =>{
    const client = new UserController();
    try {
        const data = await client.getUsers();
        data ? response.json(data) : response.sendStatus(404);
        
    } catch (err) {
        response.send({error: err})
    }
});

router.post("/users/create", async(request, response) => {
    const client = new UserController();
    
        const data = await client.createUser(request);
        response.send(data)
});



export { router }