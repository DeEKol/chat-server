import {AppDataSource} from "../../data-source";
import {UserEntity} from "../../entities/UserEntity/UserEntity";
import * as bcrypt from 'bcrypt';
import {TokenService} from "../../services/TokenService/TokenService";

export class UserRepository {
    userRepository: any;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }

    async create(username: string, password: string) {
        const user = new UserEntity(username, password);

        const hashedPassword = await bcrypt.hash(password, 3);

        await this.userRepository.save({
            ...user,
            password: hashedPassword
        });

        return {
            ...user,
            password: hashedPassword,
        };
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: number) {
        return await this.userRepository.find({
            where: {
                id: id,
            }
        })
    }

    async findOneForUsername(username: string) {
        return await this.userRepository.find({
            where: {
                username: username,
            }
        })
    }

    async remove(user: UserEntity) {
        return await this.userRepository.remove(user);
    }
}