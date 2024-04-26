import {Express} from "express";
import UserController from "../controllers/UserController/UserController";
import AuthController from "../controllers/AuthController/AuthController";
import RoomController from "../controllers/RoomController/RoomController";
import MessageController from "../controllers/MessageController/MessageController";
import auth from "../middleware/auth";
import MessageService from "../services/MessageService/MessageService";
import UserService from "../services/UserService/UserService";

const messageService: MessageService = new MessageService();
const userService: UserService = new UserService();

export const router = (app: Express) => {
    const userController = new UserController();
    const authController = new AuthController();
    const roomController = new RoomController();
    const messageController = new MessageController();

    // ! Users
    app.get("/api/users", auth, userController.findAll);
    app.get("/api/user/:id", auth, userController.findOne);
    app.post("/api/user", userController.create);
    app.delete("/api/user/:id", auth, userController.remove);

    // ! Auth
    app.post("/api/login", authController.login);
    app.get("/api/check", authController.checkAuth);

    // ! Rooms
    app.get("/api/rooms", auth, roomController.findAll);
    app.get("/api/room/:id", auth, roomController.findOne);
    app.post("/api/room", auth, roomController.create);
    app.delete("/api/room/:id", auth, roomController.remove)
    app.put("/api/room", auth, roomController.addUser)
    app.get("/api/roomUsers/:id", auth, roomController.findRoomWithUsers)

    // ! Messages
    app.get("/api/messages", auth, messageController.findAll)
    app.get("/api/messagesByRoom/:id", auth, messageController.messagesByRoom)
    app.get("/api/message/:id", auth, messageController.findOne)
    app.post("/api/message", auth, messageController.create)
    app.post("/api/messageUpdText", auth, messageController.messageUpdText)
    app.delete("/api/message/:id", auth, messageController.remove)
}

export const routerSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        const room = socket.handshake.auth.roomId;
        socket.join(room);
        socket.on('newMessageForFront', async (data: any) => {
            const newMessageForBack = await messageService.create(data.text, data.roomId, data.userId, data.time, data.type);

            const user = await userService.findOne(newMessageForBack.user);

            io.to(room).emit('newMessageForBack', {...newMessageForBack, user: user[0]})
        })

        socket.on('updMessageForFront', async (data: any) => {
            const updMessageForBack = await messageService.messageUpdText(data.id, data.text, data.time);

            io.to(room).emit('updMessageForBack', updMessageForBack)
        })

        socket.on('dis', () => {
            io.disconnect;
        })
    });
    io.on('disconnect', function (socket: any) {
        io.remove()
    });
}
