import UserRepository from "../../repositories/UserRepository/UserRepository";
import * as bcrypt from 'bcrypt';
import TokenService from "../TokenService/TokenService";

export default class AuthService {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(username: string, password: string) {
        const userFromDB = await this.userRepository.findOneForUsername(username);

        let isPassEquals;

        if (userFromDB[0]) {
            isPassEquals = await bcrypt.compare(password, userFromDB[0].password);
        }

        if (isPassEquals) {
            const token = await TokenService.generateAccessToken(userFromDB[0].id, userFromDB[0].username);

            return {
                user: userFromDB[0],
                token: token,
            }
        }
    }

    async checkAuth() {
        console.log("checkAuth");
    }
}
