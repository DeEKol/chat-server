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
        try {
            const data = await this.authService.login(req.body.username, req.body.password);

            if (!data) {
                res.status(400).json("Username of password invalid");
            }

            res.status(200).json(data);
        } catch (error) {
            console.warn(error);
            res.status(400).send("Username of password invalid");
        }

    }

    async checkAuth(req: Request, res: Response, next:NextFunction) {
        console.log("check")
        try {
            const authToken = req.header("Authorization");
            const token = authToken?.split(" ")[1];
            // console.log(token);

            if (!token) {
            console.log("token null")
            res.status(403).send("Access denied.");
            }

            const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

            const user = await this.userService.findOne(decoded.id);
            res.status(200).json(user);
        } catch (error) {
            console.warn(error)
            res.status(401).send("Unauthorized");
        }
    }
}
