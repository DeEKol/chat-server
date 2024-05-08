import UserService from "../../services/UserService/UserService";
import {Request, Response} from "express";
import IUserEntity from "../../entities/UserEntity/IUserEntity";
import UserDto from "../../dtos/UserDto/UserDto";

export default class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();

        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
    }

    async findAll(req: Request, res: Response) {
        const users = await this.userService.findAll();

        const usersDto: UserDto[] = users.map((user: IUserEntity) => {
            return new UserDto(user);
        })

        res.status(200).json(usersDto);
    }

    async findOne (req: Request, res: Response) {
        const user = await this.userService.findOne(Number(req.params.id));

        const userDto = new UserDto(user);

        res.status(200).json(userDto);
    }

    async create (req: Request<{}, {}, IUserEntity>, res: Response) {
        try {
            const user: IUserEntity | undefined = await this.userService.create(req.body.username, req.body.password);

            const userDto = new UserDto(user);

            if (user && userDto) {
                res.status(200).json(userDto);
            }
        } catch (error) {
            console.warn(error);
            res.status(400).send("User exists");
        }
    }

    async remove(req: Request, res: Response) {
        const user = await this.userService.findOne(Number(req.params.id));

        const userDto = new UserDto(user);

        await this.userService.remove(user);

        res.status(200).json(userDto);
    }
}
