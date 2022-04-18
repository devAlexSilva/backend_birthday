//CRUD de usuarios 
import bcrypt from 'bcrypt'
import { response } from 'express';
import prisma from '../prisma/prismaClient.js';

class UserController {

    async getUser(_id) {
        try {
            const currentUser = await prisma.user.findUnique({
                where: { id: Number(_id) },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    Message: true,
                }
            })
            return currentUser
        
        } catch (err) {
            response.statusMessage = 'fail on search';
            return response.status(400);

        } finally {
            await prisma.$disconnect();
        }

    }

    async createUser(request) {
        const { name, email, password } = request.body;

        async function createHashPassword(){
           return bcrypt.hash(password, 8);
        };

        try {
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: await createHashPassword()
                }
            })
            return response.status(201);
        } catch (err) {
            return response.status(400);
        }

        finally {
            await prisma.$disconnect();
        }
    }

    async updateUser(_id, nameToUpdate) {
        try {
            const update = await prisma.user.update({
                where: { id: Number(_id) },
                data: {
                    name: nameToUpdate
                }
            })
            return resonse.status(205);

        } catch (err) {
            return response.status(304)
        }
        finally {
            await prisma.$disconnect();
        }
    }

    async deleteUser({ id }) {
        try {
            await prisma.user.delete({
                where: { id: Number(id) }
            });
            return response.status(200);
            
        } catch (err) {
            response.statusMessage = 'fail on delete';
            return response.status(304)

        }
        finally {
            await prisma.$disconnect();

        }
    }
}


export default UserController;