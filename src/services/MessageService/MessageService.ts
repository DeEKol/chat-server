import MessageEntity from "../../entities/MessageEntity/MessageEntity";
import IMessageEntity from "../../entities/MessageEntity/IMessageEntity";
import MessageRepository from "../../repositories/MessageRepository/MessageRepository";
import RoomRepository from "../../repositories/RoomRepository/RoomRepository";

export default class MessageService {
    messageRepository: MessageRepository;
    roomRepository: RoomRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
        this.roomRepository = new RoomRepository();
    }

    async create(text: string, room: number, user: number, time: string, type: string) {
        const message: IMessageEntity = new MessageEntity(text, room, user, time, type);

        await this.messageRepository.create(message);

        return message;
    }

    async messageUpdText(id: number, text: string, time: string) {
        const message = await this.messageRepository.messageUpdText(id, text, time);

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

    async messagesByRoom(roomId: number) {
        const room = await this.roomRepository.findOne(roomId);

        return await this.messageRepository.messagesByRoom(room);
    }
}
