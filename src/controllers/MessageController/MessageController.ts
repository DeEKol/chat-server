import UserService from "../../services/UserService/UserService";
import {Request, Response} from "express";
import RoomService from "../../services/RoomService/RoomService";
import MessageService from "../../services/MessageService/MessageService";
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
        this.messageUpdText = this.messageUpdText.bind(this);
    }

    async findAll(req: Request, res: Response) {
        const messages = await  this.messageService.findAll();

        res.status(200).json(messages);
    }

    async findOne(req: Request, res: Response) {
        const message = await this.messageService.findOne(Number(req.params.id));

        res.status(200).json(message);
    }

    async create(req: Request, res: Response) {
        const message: MessageEntity = await this.messageService.create(req.body.text, req.body.roomId, req.body.userId, req.body.time, req.body.type);

        res.status(200).json(message);
    }

    async messageUpdText(req: Request, res: Response) {
        const message = await this.messageService.messageUpdText(req.body.id, req.body.text, req.body.time);

        res.status(200).json(message);
    }

    async remove(req: Request, res: Response) {
        const message = await this.messageService.findOne(Number(req.params.id));

        await this.messageService.remove(message[0]);
        res.status(200).json(message);
    }

    async messagesByRoom(req: Request, res: Response) {
        const messages = await  this.messageService.messagesByRoom(Number(req.params.id));

        res.status(200).json(messages);
    }
}
