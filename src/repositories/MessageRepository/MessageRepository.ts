import {AppDataSource} from "../../data-source";
import MessageEntity from "../../entities/MessageEntity/MessageEntity";
import {Repository} from "typeorm";
import IMessageEntity from "../../entities/MessageEntity/IMessageEntity";

export default class MessageRepository {
    messageRepository: any;

    constructor() {
        this.messageRepository = AppDataSource.getRepository(MessageEntity)
    }

    async create(message: IMessageEntity) {
        await this.messageRepository.save(message);

        return message;
    }

    async findAll() {
        return await this.messageRepository.find();
    }

    async findOne(id: number) {
        return await this.messageRepository.find({
            relations: {
                room: true,
                user: true,
            },
            where: {
                id: id,
            }
        })
    }

    async remove(message: IMessageEntity) {
        return await this.messageRepository.remove(message);
    }
}
