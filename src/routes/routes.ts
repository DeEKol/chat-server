import {Express} from "express";
import UserController from "../controllers/UserController/UserController";
import AuthController from "../controllers/AuthController/AuthController";
import RoomController from "../controllers/RoomController/RoomController";
import MessageController from "../controllers/MessageController/MessageController";
import auth from "../middleware/auth";
import MessageService from "../services/MessageService/MessageService";

const messageService: MessageService = new MessageService();

export const router = (app: Express) => {
    const userController = new UserController();
    const authController = new AuthController();
    const roomController = new RoomController();
    const messageController = new MessageController();

    // ! Users
    app.get("/api/users", auth, userController.findAll);
    app.get("/api/user/:id", userController.findOne);
    app.post("/api/user", userController.create);
    app.delete("/api/user/:id", userController.remove);

    // ! Auth
    app.post("/api/login", authController.login);
    app.get("/api/check", authController.checkAuth);

    // ! Rooms
    app.get("/api/rooms", roomController.findAll);
    app.get("/api/room/:id", roomController.findOne);
    app.post("/api/room", roomController.create);
    app.delete("/api/room/:id", roomController.remove)
    app.put("/api/room", roomController.addUser)
    app.get("/api/roomUsers/:id", roomController.findRoomWithUsers)

    // ! Messages
    app.get("/api/messages", messageController.findAll)
    app.get("/api/messagesByRoom/:id", messageController.messagesByRoom)
    app.get("/api/message/:id", messageController.findOne)
    app.post("/api/message", messageController.create)
    app.delete("/api/message/:id", messageController.remove)
}

export const routerSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        console.log('a user connected', socket.handshake.auth);
        const room = socket.handshake.auth.roomId;
        socket.join(room);
        socket.on('newMessageForFront', async (data: any) => {
            console.log('newMessageForFront', data)

            const newMessageForBack = await messageService.create(data.text, data.roomId, data.userId, data.time);

            io.to(room).emit('newMessageForBack', newMessageForBack)

        })

        socket.on('disconnect', function (socket: any) {
            console.log('a user disconnect');
        });

        socket.on('dis', () => {
            console.log('dis');
            // console.log(io.)
            io.disconnect;
        })
    });
    io.on('disconnect', function (socket: any) {
        console.log('a user disconnect', socket.handshake.auth);
        io.remove()
    });
}
