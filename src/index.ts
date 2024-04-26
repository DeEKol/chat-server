import "reflect-metadata";
import express from "express";
import {AppDataSource} from "./data-source";
import {router, routerSocket} from "./routes/routes";
import * as http from "http";
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

require('dotenv').config()
const cors = require("cors");

const host = "127.0.0.1";
const port = 7000;

app.use(cors());
app.use(express.json());

router(app);

routerSocket(io);

server.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
})

AppDataSource.initialize().then(() => {}).catch((error) => console.log(error));