import {AppDataSource} from "../../data-source";
import UserEntity from "../../entities/UserEntity/UserEntity";
import IUserEntity from "../../entities/UserEntity/IUserEntity";
import {Repository} from "typeorm";

export default class UserRepository {
    userRepository: any;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }

    async create(user: IUserEntity, hashedPassword: string) {
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

    async findOneByUsername(username: string) {
        return await this.userRepository.findOne({
            where: {
                username: username,
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
