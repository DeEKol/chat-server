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

        console.log(password)
        let isPassEquals;

        if (userFromDB[0]) {
            isPassEquals = await bcrypt.compare(password, userFromDB[0].password);
            console.log(userFromDB)
        }

        console.log(isPassEquals)

        if (isPassEquals) {
            const token = await TokenService.generateAccessToken(userFromDB.id, userFromDB.username);

            return {
                user: userFromDB[0],
                token: token,
            }
        }
    }
}
