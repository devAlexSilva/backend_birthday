//CRUD das menssagens de cada usuario

import { response } from "express";
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
            return response.status(201);

        } catch (err) {
            return response.status(304);

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
            return response.status(401);

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
            return response.status(401);

        } finally {
            await prisma.$disconnect();
        }
    }

    async updateMessage(id, body, token) {
        const userId = this.handleToken(token);

        try {
            const result = await prisma.message.findFirst({
                where: {
                    id: Number(id),
                    AND: {
                        userId: Number(userId)
                    }
                }
            }).then(async message => {
                await prisma.message.update({
                    where: {
                        id: message.id
                    },
                    data: {
                        title: body.title,
                        content: body.content,
                        dateBirthday: body.dateBirthday
                    }

                })
            })

            return response.status(200);

        } catch (err) {
            return response.status(304);

        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteMessage(id, token) {
        const userId = this.handleToken(token);

        try {
            await prisma.message.findFirst({
                where: {
                    id: Number(id),
                    AND: {
                        userId: Number(userId)
                    }
                }

            }).then(async message => {
                await prisma.message.delete({
                    where: {
                        id: message.id
                    }
                })
            })
            return response.status(200);

        } catch (err) {
            return response.status(304);

        } finally {
            await prisma.$disconnect();
        }
    }

}

export default MessageController