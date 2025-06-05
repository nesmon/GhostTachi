const axios = require('axios');
const GhostHelper = require('./../lib/GhostHelper');

class MaimaiRoute {
    constructor() {
        this.prefix = '/maimai';
    }

    async register(fastify, options) {
        const prisma = options.prisma;

        fastify.get('/user/:username', async (request, reply) => {
            const { username } = request.params;

            try {
                const response = await axios.get(`https://kamai.tachi.ac/api/v1/users/${username}/games/maimai/Single/pbs/all`);
                const data = response.data;

                GhostHelper.gameDataPush(prisma, username, data, 'maimai');

                return reply.send(data);
            } catch (error) {
                const user = await prisma.user.findUnique({
                    where: { username: username }
                });

                if (user) {
                    console.log(`User found in database: ${username}`);
                    return reply.send(JSON.parse(user.maimai));
                } else {
                    console.error(`Error fetching data for user ${username}:`, error.message);
                    return reply.status(404).send({ error: 'User not found' });
                }
            }
        });

        fastify.get('/allUser', async (request, reply) => {
            const users = GhostHelper.getAllUserForGame(prisma, 'maimai');

            if (users.length === 0) {
                return reply.status(404).send({ error: 'No users found' });
            }

            const allUserData = users.map(user => {
                const userData = JSON.parse(user.maimai);
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