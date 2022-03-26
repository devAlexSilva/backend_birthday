import prisma from '../../prisma/prismaClient.js'

    const getDatas = async () => {
        let dateLocal = new Date().toLocaleString('pt-BR', { timezone: 'America/Sao_Paulo' });
        let currentData = dateLocal.slice(0, 10);

        try {
            const allMessage = await prisma.message.findMany({
                where: {
                    dateBirthday: currentData
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                },

            });
            return allMessage;

        } catch (err) {
            return err
        }
        
    }


export default getDatas