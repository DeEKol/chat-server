import {NextFunction, Request, Response} from "express";
import AuthService from "../../services/AuthService/AuthService";
import UserService from "../../services/UserService/UserService";
const jwt = require("jsonwebtoken");

export default class AuthController {
  authService: AuthService;
  userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();

    this.login = this.login.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  async login(req: Request, res: Response) {
    console.log(req.body);

    const data = await this.authService.login(req.body.username, req.body.password);
    console.log(data);

    res.status(200).json(data);
  }

  async checkAuth(req: Request, res: Response, next:NextFunction) {
    try {
      const authToken = req.header("Authorization");
      const token = authToken?.split(" ")[1];
      console.log(token);

      if (!token) return res.status(403).send("Access denied.");

      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
      console.log(decoded);

      const user = await this.userService.findOne(decoded.id);

      res.status(200).json(user);
    } catch (error) {
      res.status(400).send("Invalid token");
    }
  }
}
