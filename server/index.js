'use strict';

// Create a server with a host and port
const createServer = require('./lib/infrastructure/webserver/server');

// Start the server
const start = async () => {
        const port = process.env.PORT || 3000
        try {
                const server = await createServer();
                server.listen(port, () => {
                        console.log('Server running at', server.address());
                });
        } catch (err) {
                console.log(err);
                process.exit(1);
        }
};

start();
