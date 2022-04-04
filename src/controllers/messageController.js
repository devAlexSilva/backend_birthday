//CRUD das menssagens de cada usuario

import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient.js";

class MessageController {

    handleToken = (token) => {
        const { id } = jwt.decode(token.replace('Bearer ', ''));
        return id;
    }

    async createMessage(token, body) {
        const userId = this.handleToken(token);

        try {
            await prisma.message.create({
                data: {
                    title: body.title,
                    content: body.content,
                    dateBirthday: body.dateBirthday,
                    userId: Number(userId)
                }
            })
            return JSON.parse('{"status":201, "message":"successfully created"}');

        } catch (err) {
            return JSON.parse('{"status":304, "message":"fail on create"}');

        } finally {
            await prisma.$disconnect();
        }

    }

    async getMessage(token) {
        const userId = this.handleToken(token);

        try {
            const result = await prisma.message.findMany({
                where: {
                    userId: Number(userId)
                }

            });
            return result;

        } catch (err) {
            return JSON.parse('{"status":404, "message":"fail on search"}')

        } finally {
            await prisma.$disconnect();
        }
    }
    async getMessageById(token, { id }) {
        const userId = this.handleToken(token);

        try {
            const result = await prisma.message.findFirst({
                where: {
                    userId: Number(userId),
                    AND: {
                        id: Number(id)
                    }
                }

            });
            return result;

        } catch (err) {
            return JSON.parse('{"status":404, "message":"fail on search"}')

        } finally {
            await prisma.$disconnect();
        }
    }

    async updateMessage(id, body, token) {
        const userId = this.handleToken(token);

        try {
            const result = await prisma.message.update({
                where: {
                    id: Number(id),
                },
                data: {
                    title: body.title,
                    content: body.content,
                    dateBirthday: body.dateBirthday
                    
                },
            });
            return JSON.parse('{"status":200, "message":"updated successfully"}');

        } catch (err) {
            return JSON.parse('{"status":304, "message":"not modified"}');

        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteMessage(id, token) {
        const userId = this.handleToken(token);

        try {
            await prisma.message.delete({
                where: {
                    id: Number(id),
                    // userId: Number(userId)
                }
            })
            return JSON.parse('{"status":200, "message":"deleted successfully"}')

        } catch (err) {
            return JSON.parse('{"status":304, "message":"not modified"}');

        } finally {
            await prisma.$disconnect();
        }
    }

}

export default MessageController