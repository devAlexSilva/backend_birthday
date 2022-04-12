//CRUD de usuarios 
import bcrypt from 'bcrypt'
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
            return JSON.parse('{"status":404, "message":"fail on search"}')

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
            return JSON.parse('{"status":201, "message":"successfully created"}');
        } catch (err) {
            return JSON.parse('{"status":304, "message":"fail on create"}')
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
            return update;

        } catch (err) {
            return JSON.parse('{"status": 304, "message":"fail on update"}')
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
            return JSON.parse('{"status":200, "message":"deleted successfully"}');

        } catch (err) {
            return JSON.parse('{"status":304, "message":"fail on delete"}');

        }
        finally {
            await prisma.$disconnect();

        }
    }
}



export default UserController;