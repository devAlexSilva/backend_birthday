import jwt from "jsonwebtoken";
import prisma from "../../prisma/prismaClient.js";

class MessageController {
    //o id do user é obrigatório para assinar as mensagens

    handleToken = (token) => {
        const { id } = jwt.decode(token.replace('Bearer ', ''));
        return id;
    }

    async creatMessage(token, { title, content } = body) {
        const userId = this.handleToken(token);
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

    async getMessage (token) {
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
}

export default MessageController