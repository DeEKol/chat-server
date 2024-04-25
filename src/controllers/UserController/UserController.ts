import UserService from "../../services/UserService/UserService";
import {Request, Response} from "express";
import IUserEntity from "../../entities/UserEntity/IUserEntity";
import TokenService from "../../services/TokenService/TokenService";

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
    console.log(users);
    res.status(200).json(users)
  }

  async findOne (req: Request, res: Response) {
    const user = await this.userService.findOne(Number(req.params.id));
    console.log(user);
    res.status(200).json(user);
  }

  async create (req: Request<{}, {}, IUserEntity>, res: Response) {
    console.log(req.body)
    const user: IUserEntity = await this.userService.create(req.body.username, req.body.password);

    const token = TokenService.generateAccessToken(user.id, user.username);

    // res.json(token)

    console.log(user);
    res.status(200).json({user, token});
  }

  async remove(req: Request, res: Response) {
    const user = await this.userService.findOne(Number(req.params.id));
    console.log(user);
    await this.userService.remove(user);
    res.status(200).json(user);
  }
}
