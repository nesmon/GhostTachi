const fastify = require('fastify')({ logger: true });
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client')

const routeDir = path.join(__dirname, 'routes');
const prisma = new PrismaClient();

fs.readdirSync(routeDir).forEach(file => {
    if (file.endsWith('.js')) {
        const RouteClass = require(path.join(routeDir, file));
        const routeInstance = new RouteClass();
        fastify.register(routeInstance.register.bind(routeInstance), { prefix: routeInstance.prefix, prisma: prisma });
    }
});

fastify.listen({ port: 8080, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
})