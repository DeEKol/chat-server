import "reflect-metadata";
import express from "express";
import {AppDataSource} from "./data-source";
import {router} from "./routes/routes";

const app = express();
require('dotenv').config()
const cors = require("cors");

const host = "127.0.0.1";
const port = 7000;

app.use(cors());
app.use(express.json());

router(app);

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
})

AppDataSource.initialize().then(() => {}).catch((error) => console.log(error));