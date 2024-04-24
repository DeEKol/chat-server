import {AppDataSource} from "../../data-source";
import {UserEntity} from "../../entities/UserEntity/UserEntity";
import * as bcrypt from 'bcrypt';
import {TokenService} from "../../services/TokenService/TokenService";
import {MessageEntity} from "../../entities/MessageEntity/MessageEntity";
import {RoomEntity} from "../../entities/RoomEntity/RoomEntity";

export class MessageRepository {
    messageRepository: any;

    constructor() {
        this.messageRepository = AppDataSource.getRepository(MessageEntity)
    }

    async create(text: string, room: number, user: number, time: string) {
        const message = new MessageEntity(text, room, user, time);

        await this.messageRepository.save(message);

        return message;
    }

    async findAll() {
        return await this.messageRepository.find();
    }

    async findOne(id: number) {
        return await this.messageRepository.find({
            where: {
                id: id,
            }
        })
    }

    // async findOneForUsername(username: string) {
    //     return await this.messageRepository.find({
    //         where: {
    //             username: username,
    //         }
    //     })
    // }

    async remove(message: MessageEntity) {
        return await this.messageRepository.remove(message);
    }
}