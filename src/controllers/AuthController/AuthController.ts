import {Request, Response} from "express";
import AuthService from "../../services/AuthService/AuthService";

export default class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();

    this.login = this.login.bind(this);
  }

  async login (req: Request, res: Response) {
    console.log(req.body)

    const data = await this.authService.login(req.body.username, req.body.password);
    console.log(data)

    res.status(200).json(data);
  }
}
