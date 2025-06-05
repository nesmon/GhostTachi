const BaseCommand = require('./../lib/Kurami/BaseCommand.js')
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

class fetchMaimai extends BaseCommand {
    constructor() {
        super({
            name: 'user:fetch:maimai',
            description: 'Fetch maimai user data for all user'
        });
        this.prisma = new PrismaClient();
    }

    async run() {
        try {
            const users = await this.prisma.user.findMany({
                select: {
                    username: true,
                    maimai: true
                }
            });

            if (users.length === 0) {
                console.log('No users found with maimai data.');
                return;
            }

            console.log(`Total number of users : ${users.length}`);
            users.forEach(async (user) => {
                const response = await axios.get(`https://kamai.tachi.ac/api/v1/users/${user.username}/games/maimai/Single/pbs/all`);
                const data = response.data;

                if (!data || !data.body || !data.body.pbs) {
                    console.error(`No maimai data found for user: ${user.username}`);
                    return;
                }
                                
                await this.prisma.user.update({
                    where: { username: user.username },
                    data: {
                        maimai: JSON.stringify(data)
                    }
                });

                console.log(`Updated user: ${user.username}`);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            await this.prisma.$disconnect();
        }
        
    }
}

module.exports = fetchMaimai;