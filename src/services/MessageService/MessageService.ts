import {AppDataSource} from "../../data-source";
import MessageEntity from "../../entities/MessageEntity/MessageEntity";
import {Repository} from "typeorm";
import IMessageEntity from "../../entities/MessageEntity/IMessageEntity";
import MessageRepository from "../../repositories/MessageRepository/MessageRepository";

export default class MessageService {
    messageRepository: MessageRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    async create(text: string, room: number, user: number, time: string) {
        const message: IMessageEntity = new MessageEntity(text, room, user, time);

        console.log(message)

        await this.messageRepository.create(message);

        return message;
    }

    async findAll() {
        return await this.messageRepository.findAll();
    }

    async findOne(id: number) {
        return await this.messageRepository.findOne(id);
    }

    async remove(message: IMessageEntity) {
        return await this.messageRepository.remove(message);
    }
}
