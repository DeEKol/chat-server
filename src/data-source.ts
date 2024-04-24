import {DataSource} from "typeorm";
import {UserEntity} from "./entities/UserEntity/UserEntity";
import {MessageEntity} from "./entities/MessageEntity/MessageEntity";
import {RoomEntity} from "./entities/RoomEntity/RoomEntity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3307,
    username: "root",
    password: "",
    database: "chat",
    synchronize: true,
    logging: false,
    entities: [UserEntity, MessageEntity, RoomEntity],
    subscribers: [],
    migrations: [],
})