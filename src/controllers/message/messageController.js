import jwt from "jsonwebtoken";
import prisma from "../../prisma/prismaClient.js";

class MessageController {
    //o id do user é obrigatório para assinar as mensagens

    handleToken = (info) => {
        const { id } = jwt.decode(info.replace('Bearer ', ''));
        return id;
    }

    async creatMessage(info, { title, content } = body) {
        const userId = this.handleToken(info);
        try {
            await prisma.message.create({
                data: {
                    title,
                    content,
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
}

export default MessageController