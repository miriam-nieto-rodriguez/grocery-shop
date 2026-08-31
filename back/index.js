// Server creation and configuration
const http = require("node:http");
const app = require("./src/app");
const db = require('./src/config/db')
const sequelize = require('./src/config/db')
require('./src/models')

// Config .env
require("dotenv").config();

async function main() {
    try {
        await db.authenticate();
        console.log('Base de datos OK');

        await sequelize.sync({
            alter: true
        });
        console.log('Modelos sincronizados')
    } catch (error) {
        console.log(error)
        process.exit(0)
    }

}


// Server creation
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Listeners
server.on("listening", () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on("error", (error) => {
    console.log(error);
});

main()