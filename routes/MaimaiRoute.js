const axios = require('axios');

class MaimaiRoute {
    constructor() {
        this.prefix = '/maimai';
    }

    async register(fastify, options) {
        const prisma = options.prisma;

        fastify.get('/:username', async (request, reply) => {
            const { username } = request.params;

            try {
                const response = await axios.get(`https://kamai.tachi.ac/api/v1/users/${username}/games/chunithm/Single/pbs/all`);
                const data = response.data;

                const user = await prisma.maimaiFinale.findUnique({
                    where: { username: username }
                });
                
                if (!user) {
                    await prisma.maimaiFinale.create({
                        data: {
                            username: username,
                            userData: JSON.stringify(data)
                        }
                    });
                } else {
                    await prisma.maimaiFinale.update({
                        where: { username: username },
                        data: {
                            userData: JSON.stringify(data)
                        }
                    });
                }

                return reply.send(data);
            } catch (error) {
                const user = await prisma.maimaiFinale.findUnique({
                    where: { username: username }
                });
                if (user) {
                    console.log(`User found in database: ${username}`);
                    return reply.send(JSON.parse(user.userData));
                } else {
                    console.error(`Error fetching data for user ${username}:`, error.message);
                    return reply.status(404).send({ error: 'User not found' });
                }
            }
        });
    }
}

module.exports = MaimaiRoute;