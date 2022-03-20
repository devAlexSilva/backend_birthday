import { json } from 'express';
import prisma from '../../prisma/prismaClient.js';


class UserController {

    async getUsers() {
        try {
            const allUsers = await prisma.user.findMany()
            return allUsers;

        } catch (err) {
            console.log(err)

        } finally {
            await prisma.$disconnect();
        }

    }

    async createUser(request) {
        const { name, email, password } = request.body;

        try {
            await prisma.user.create({
                data: { name, email, password }
            })
            return JSON.parse('{"data":{"status":201, "message":"successfully created"}}');
        } catch (err) {
            return JSON.parse('{"data":{"status":304, "message":"fail on create"}}')
        }

        finally {
            await prisma.$disconnect();
        }
    }
}


export default UserController;