import UserService from "../../services/UserService/UserService";
import {Request, Response} from "express";
import RoomService from "../../services/RoomService/RoomService";
import RoomEntity from "../../entities/RoomEntity/RoomEntity";
import MessageService from "../../services/MessageService/MessageService";
import UserEntity from "../../entities/UserEntity/UserEntity";
import MessageEntity from "../../entities/MessageEntity/MessageEntity";

export default class MessageController {
    messageService: MessageService;
    roomService: RoomService;
    userService: UserService;

    constructor() {
        this.messageService = new MessageService();
        this.roomService = new RoomService();
        this.userService = new UserService();

        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.messagesByRoom = this.messagesByRoom.bind(this);
    }

    async findAll(req: Request, res: Response) {
        const messages = await  this.messageService.findAll();
        // console.log(messages);
        res.status(200).json(messages);
    }

    async findOne(req: Request, res: Response) {
        const message = await this.messageService.findOne(Number(req.params.id));
        console.log(message);
        res.status(200).json(message);
    }

    async create(req: Request, res: Response) {
        // console.log(req.body)
        const user: UserEntity = await this.userService.findOne(req.body.userId);
        const room: RoomEntity = await this.roomService.findOne(req.body.roomId);
        // console.log(user)
        // console.log(room)

        const message: MessageEntity = await this.messageService.create(req.body.text, req.body.roomId, req.body.userId, req.body.time, req.body.type);

        // console.log(message);
        res.status(200).json(message);
    }

    async remove(req: Request, res: Response) {
        const message = await this.messageService.findOne(Number(req.params.id));
        // console.log(message);
        await this.messageService.remove(message[0]);
        res.status(200).json(message);
    }

    async messagesByRoom(req: Request, res: Response) {
        // console.log(Number(req.params.id))
        const messages = await  this.messageService.messagesByRoom(Number(req.params.id));
        // console.log(messages);
        res.status(200).json(messages);
    }
}
