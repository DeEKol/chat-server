import {AppDataSource} from "../../data-source";
import MessageEntity from "../../entities/MessageEntity/MessageEntity";
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

    async messageUpdText(id: number, text: string, time: string) {
        const message = await this.messageRepository.find({
            relations: {
                room: true,
                user: true,
            },
            where: {
                id: id,
            }
        });

        const newMessage = await this.messageRepository.save({...message[0], text: text, time: time, isEdited: true});

        return newMessage;
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

    async messagesByRoom(room: any) {
        return await this.messageRepository.find({
            relations: {
                room: true,
                user: true,
            },
            where: {
                room: room,
            }
        });
    }
}
