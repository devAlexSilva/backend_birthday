import prisma from "../../prisma/prismaClient.js"
import jwt from 'jsonwebtoken'

const TokenLogin = async (body) => {
    const { email, password } = body;


    const loggedUser = await prisma.user.findFirst({
        where: {
            email: email,
            password: password,
        },
        select: {
            id: true,
            name: true,
            email: true,
            Message: true
        }
    })

    if (!loggedUser) return JSON.parse('{"status": 406, "message":"check the data"}')

    const token = jwt.sign({ id: loggedUser.id }, process.env.AUTH_CONFIG, {
        expiresIn: '1h'
    })
    return ({
        token,
        loggedUser
    });
}


export default TokenLogin