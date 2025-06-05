class GhostHelper {
    async gameDataPush(prisma, username, data, game) {
        const user = await prisma.user.findUnique({
            where: { username: username }
        });

        if (!user) {
            await prisma.user.create({
                data: {
                    username: username,
                    [game]: JSON.stringify(data)
                }
            });
        } else {
            await prisma.user.update({
                where: { username: username },
                data: {
                    [game]: JSON.stringify(data)
                }
            });
        }
    }

    async getAllUserForGame(prisma, game) {
        const users = await prisma.user.findMany({
            select: {
                username: true,
                [game]: true
            },
            where: {
                [game]: {
                    not: null
                }
            }
        });

        if (users.length === 0) {
            return [];
        }

        return users;
    }
}

module.exports = new GhostHelper();