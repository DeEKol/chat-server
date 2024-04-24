import {UserRepository} from "../repositories/UserRepository/UserRepository";
import {Express, Request, Response} from "express";
import {UserEntity} from "../entities/UserEntity/UserEntity";
import {IUserEntity} from "../entities/UserEntity/IUserEntity";
import {TokenService} from "../services/TokenService/TokenService";
import auth from "../middleware/auth";
import {AuthService} from "../services/AuthService/AuthService";
import {RoomRepository} from "../repositories/UserRepository/RoomRepository";
import {RoomEntity} from "../entities/RoomEntity/RoomEntity";
import {MessageRepository} from "../repositories/UserRepository/MessageRepository";
import {MessageEntity} from "../entities/MessageEntity/MessageEntity";

const authService = new AuthService();

const userRepository = new UserRepository();
const roomRepository = new RoomRepository();
const messageRepository = new MessageRepository();

export const router = (app: Express) => {
    // ! Users
    app.get("/api/users", auth, async(req: Request, res: Response) => {
        const users = await  userRepository.findAll();
        console.log(users);
        res.status(200).json(users);
    })

    app.get("/api/user/:id", async (req: Request, res: Response) => {
        const user = await userRepository.findOne(Number(req.params.id));
        console.log(user);
        res.status(200).json(user);
    })

    app.post("/api/user", async (req: Request<{}, {}, IUserEntity>, res: Response) => {
        console.log(req.body)
        const user: IUserEntity = await userRepository.create(req.body.username, req.body.password);

        const token = TokenService.generateAccessToken(user.id, user.username);

        // res.json(token)

        console.log(user);
        res.status(200).json({user, token});
    })

    app.delete("/api/user/:id", async(req: Request, res: Response) => {
        const user = await userRepository.findOne(Number(req.params.id));
        console.log(user);
        await userRepository.remove(user);
        res.status(200).json(user);
    })

    // ! Auth
    app.post("/api/login", async (req: Request, res: Response) => {
        console.log(req.body)

        const data = await authService.login(req.body.username, req.body.password);
        console.log(data)

        res.status(200).json(data);
    })


    // ! Rooms
    app.get("/api/rooms", async(req: Request, res: Response) => {
        const rooms = await  roomRepository.findAll();
        console.log(rooms);
        res.status(200).json(rooms);
    })

    app.get("/api/room/:id", async (req: Request, res: Response) => {
        const room = await roomRepository.findOne(Number(req.params.id));
        console.log(room);
        res.status(200).json(room);
    })

    app.post("/api/room", async (req: Request<{}, {}, RoomEntity>, res: Response) => {
        console.log(req.body)
        const room: RoomEntity = await roomRepository.create(req.body.name);

        console.log(room);
        res.status(200).json(room);
    })

    app.delete("/api/room/:id", async(req: Request, res: Response) => {
        const room = await roomRepository.findOne(Number(req.params.id));
        console.log(room);
        await roomRepository.remove(room);
        res.status(200).json(room);
    })

    app.put("/api/room", async (req: Request, res: Response) => {
        console.log(req.body)

        const user = await userRepository.findOne(req.body.userId)
        console.log(user)
        const room: RoomEntity = await roomRepository.update(req.body.roomId, user[0]);

        console.log(room);
        res.status(200).json(room);
    })
    app.get("/api/roomUsers/:id", async(req: Request, res: Response) => {
        const usersInRoom = await roomRepository.findUsers(Number(req.params.id));
        console.log(usersInRoom);
        res.status(200).json(usersInRoom);
    })

    // ! Messages
    app.get("/api/messages", async(req: Request, res: Response) => {
        const messages = await  messageRepository.findAll();
        console.log(messages);
        res.status(200).json(messages);
    })

    app.get("/api/message/:id", async (req: Request, res: Response) => {
        const message = await messageRepository.findOne(Number(req.params.id));
        console.log(message);
        res.status(200).json(message);
    })

    app.post("/api/message", async (req: Request, res: Response) => {
        console.log(req.body)
        const user: UserEntity = await userRepository.findOne(req.body.userId);
        const room: RoomEntity = await roomRepository.findOne(req.body.roomId);
        console.log(user)
        console.log(room)

        const message: MessageEntity = await messageRepository.create(req.body.text, req.body.userId, req.body.roomId, req.body.time);

        console.log(message);
        res.status(200).json(message);
    })

    app.delete("/api/message/:id", async(req: Request, res: Response) => {
        const message = await messageRepository.findOne(Number(req.params.id));
        console.log(message);
        await messageRepository.remove(message);
        res.status(200).json(message);
    })
}