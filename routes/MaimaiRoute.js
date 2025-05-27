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
                const response = await axios.get(`https://kamai.tachi.ac/api/v1/users/${username}/games/maimai/Single/pbs/all`);
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

        fastify.get('/allUser', async (request, reply) => {
            const users = await prisma.maimaiFinale.findMany({
                select: {
                    username: true,
                    userData: true
                }
            });

            if (users.length === 0) {
                return reply.status(404).send({ error: 'No users found' });
            }

            const allUserData = users.map(user => {
                const userData = JSON.parse(user.userData);
                const pbs = userData.body.pbs;

                let topPbs = this.getTopRate(pbs, 30);
                let ratings = 0;

                topPbs.forEach(pb => {
                    ratings += pb.calculatedData.rate;
                });

                return {
                    username: user.username,
                    averageRating: ratings / topPbs.length,
                };
            }
            );
            return reply.send(this.getTop(allUserData));
        });
    }

    getTopRate(arr, max) {
        let top = arr.sort((a, b) => b.calculatedData.rate - a.calculatedData.rate).slice(0, max);
        return top;
    }

    getTop(arr) {
        let top = arr.sort((a, b) => b.averageRating - a.averageRating);
        return top;
    }
}

module.exports = MaimaiRoute;