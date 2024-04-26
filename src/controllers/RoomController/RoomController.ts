import UserService from "../../services/UserService/UserService";
import {Request, Response} from "express";
import IUserEntity from "../../entities/UserEntity/IUserEntity";
import TokenService from "../../services/TokenService/TokenService";
import RoomService from "../../services/RoomService/RoomService";
import RoomEntity from "../../entities/RoomEntity/RoomEntity";

export default class RoomController {
    roomService: RoomService;
    userService: UserService;

    constructor() {
        this.roomService = new RoomService();
        this.userService = new UserService();

        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.addUser = this.addUser.bind(this);
        this.findRoomWithUsers = this.findRoomWithUsers.bind(this);
    }

    async findAll(req: Request, res: Response) {
        const rooms = await  this.roomService.findAll();
        console.log(rooms);
        res.status(200).json(rooms);
    }

    async findOne(req: Request, res: Response) {
        const room = await this.roomService.findOne(Number(req.params.id));
        console.log(room);
        res.status(200).json(room);
    }

    async create(req: Request, res: Response) {
        try {
            // console.log(req.body)
            const room: RoomEntity = await this.roomService.create(req.body.name, req.body.userId);

            // console.log(room);
            res.status(200).json(room);
        } catch (error) {
            console.warn(error);
            res.status(400).send("Room exists");
        }
    }

    async remove(req: Request, res: Response) {
        const room = await this.roomService.findOne(Number(req.params.id));
        // console.log(room);
        await this.roomService.remove(room);
        res.status(200).json(room);
    }

    async addUser(req: Request, res: Response) {
        // console.log(req.body)

        const user = await this.userService.findOne(Number(req.body.userId));
        // console.log(user)
        const room: RoomEntity = await this.roomService.update(req.body.roomId, user[0]);

        // console.log(room);
        res.status(200).json(room);
    }

    async findRoomWithUsers(req: Request, res: Response) {
        const users = await this.roomService.findUsers(Number(req.params.id));
        // console.log(users);
        res.status(200).json(users);
    }
}
