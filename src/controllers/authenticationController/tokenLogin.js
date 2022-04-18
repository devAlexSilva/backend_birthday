import prisma from "../../prisma/prismaClient.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const TokenLogin = async (body) => {
    const { email, password } = body;

    const loggedUser = await prisma.user.findFirst({
        where: {
            email: email
        },
        select: {
            password: true,
            id: true,
            name: true,
            Message: true,
        }
    })

    if (!loggedUser || !await bcrypt.compare(password, loggedUser.password))
        return JSON.parse('{"message":"check the data"}')

    const token = jwt.sign({ id: loggedUser.id }, process.env.AUTH_CONFIG, {
        expiresIn: '1h'
    })

    const userInSession = {
        id: loggedUser.id,
        name: loggedUser.name
    };
    return ({
        token,
        user: userInSession
    });
}

export default TokenLogin