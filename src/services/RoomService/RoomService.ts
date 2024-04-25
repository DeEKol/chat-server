import {AppDataSource} from "../../data-source";
import MessageEntity from "../../entities/MessageEntity/MessageEntity";
import {Repository} from "typeorm";
import IMessageEntity from "../../entities/MessageEntity/IMessageEntity";
import MessageRepository from "../../repositories/MessageRepository/MessageRepository";
import RoomRepository from "../../repositories/RoomRepository/RoomRepository";
import IRoomEntity from "../../entities/RoomEntity/IRoomEntity";
import RoomEntity from "../../entities/RoomEntity/RoomEntity";
import UserEntity from "../../entities/UserEntity/UserEntity";

export default class RoomService {
    roomRepository: RoomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }

    async create(name: string) {
        const room: IRoomEntity = new RoomEntity(name)

        await this.roomRepository.create(room);

        return room;
    }

    async update(roomId: number, user: UserEntity) {
        // const room = new RoomEntity(name)
        const room = await this.roomRepository.findRoomWithUsers(roomId)

        console.log(room)
        console.log(user)

        await this.roomRepository.addUser(room[0], user);

        return room;
    }

    async findAll() {
        return await this.roomRepository.findAll();
    }

    async findOne(id: number) {
        return await this.roomRepository.findOne(id)
    }

    async remove(room: IRoomEntity) {
        return await this.roomRepository.remove(room);
    }

    async findUsers(roomId: number) {
        return await this.roomRepository.findUsers(roomId);
    }
}
