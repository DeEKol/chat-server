import { Request, Response } from "express";
import IUserEntity from "../../entities/UserEntity/IUserEntity";
import UserDto from "../../dtos/UserDto/UserDto";
import UserService from "../../services/UserService/UserService";

export default interface IUserController {
    userService: UserService;

    findAll(req: Request, res: Response): Promise<void>;
    findOne(req: Request, res: Response): Promise<void>;
    create(req: Request<{}, {}, IUserEntity>, res: Response): Promise<void>;
    remove(req: Request, res: Response): Promise<void>;
}
