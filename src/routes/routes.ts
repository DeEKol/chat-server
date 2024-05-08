import {Express} from "express";
import UserController from "../controllers/UserController/UserController";
import AuthController from "../controllers/AuthController/AuthController";
import RoomController from "../controllers/RoomController/RoomController";
import MessageController from "../controllers/MessageController/MessageController";
import MessageService from "../services/MessageService/MessageService";
import UserService from "../services/UserService/UserService";
import MiddlewaresClass from "../middlewares/MiddlewaresClass";
import {Server, Socket} from "socket.io";

const messageService: MessageService = new MessageService();
const userService: UserService = new UserService();

export const router = (app: Express) => {
    const userController = new UserController();
    const authController = new AuthController();
    const roomController = new RoomController();
    const messageController = new MessageController();

    // ! Users
    app.get("/api/users", MiddlewaresClass.auth, userController.findAll);
    app.get("/api/user/:id", MiddlewaresClass.auth, userController.findOne);
    app.post("/api/user", MiddlewaresClass.userValidator, userController.create);
    app.delete("/api/user/:id", MiddlewaresClass.auth, userController.remove);

    // ! Auth
    app.post("/api/login", MiddlewaresClass.userValidator, authController.login);
    app.get("/api/check", authController.checkAuth);

    // ! Rooms
    app.get("/api/rooms", MiddlewaresClass.auth, roomController.findAll);
    app.get("/api/room/:id", MiddlewaresClass.auth, roomController.findOne);
    app.post("/api/room", MiddlewaresClass.auth, roomController.create);
    app.delete("/api/room/:id", MiddlewaresClass.auth, roomController.remove)
    app.put("/api/room", MiddlewaresClass.auth, roomController.addUser)
    app.get("/api/roomUsers/:id", MiddlewaresClass.auth, roomController.findRoomWithUsers)

    // ! Messages
    app.get("/api/messages", MiddlewaresClass.auth, messageController.findAll)
    app.get("/api/messagesByRoom/:id", MiddlewaresClass.auth, messageController.messagesByRoom)
    app.get("/api/message/:id", MiddlewaresClass.auth, messageController.findOne)
    app.post("/api/message", MiddlewaresClass.auth, messageController.create)
    app.post("/api/messageUpdText", MiddlewaresClass.auth, messageController.messageUpdText)
    app.delete("/api/message/:id", MiddlewaresClass.auth, messageController.remove)
}

export const routerSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const room: string = socket.handshake.auth.roomId;
        socket.join(room);

        type TDataNewMessage = { text: string, roomId: number, userId: number, time: string, type: string }
        socket.on('newMessageForFront', async (data: TDataNewMessage) => {
            const newMessageForBack = await messageService.create(data.text, data.roomId, data.userId, data.time, data.type);

            const user = await userService.findOne(newMessageForBack.user);

            io.to(room).emit('newMessageForBack', {...newMessageForBack, user: user[0]})
        })

        type TDataUpdMessage = { id: number, text: string, time: string }
        socket.on('updMessageForFront', async (data: TDataUpdMessage) => {
            const updMessageForBack = await messageService.messageUpdText(data.id, data.text, data.time);

            io.to(room).emit('updMessageForBack', updMessageForBack)
        })

        socket.on('dis', () => {
            socket.disconnect();
        })
    });
    io.on('disconnect', function (socket: Socket) {
        io.close();
    });
}
