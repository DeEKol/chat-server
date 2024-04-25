import {AppDataSource} from "../../data-source";
import UserEntity from "../../entities/UserEntity/UserEntity";
import RoomEntity from "../../entities/RoomEntity/RoomEntity";
import IRoomEntity from "../../entities/RoomEntity/IRoomEntity";
import {Repository} from "typeorm";
import IUserEntity from "../../entities/UserEntity/IUserEntity";

export default class RoomRepository {
    roomRepository: any;

    constructor() {
        this.roomRepository = AppDataSource.getRepository(RoomEntity)
    }

    async create(room: IRoomEntity) {
        await this.roomRepository.save(room);

        return room;
    }

    async update(roomId: number, user: UserEntity) {
        // const room = new RoomEntity(name)
        const room = await this.roomRepository.find({
            relations: {
                users: true,
            },
            where: {
                id: roomId
            }
        })

        console.log(room)
        console.log(user)

        await this.roomRepository.save({...room[0], users: [...room[0].users, user]});

        return room;
    }

    async findAll() {
        return await this.roomRepository.find();
    }

    async findOne(id: number) {
        return await this.roomRepository.find({
            where: {
                id: id,
            }
        })
    }

    async findRoomWithUsers(roomId: number) {
        return this.roomRepository.find({
            relations: {
                users: true,
            },
            where: {
                id: roomId
            }
        })
    }

    async addUser(room: any, user: IUserEntity) {
        return this.roomRepository.save({...room, users: [...room.users, user]})
    }

    async remove(room: IRoomEntity) {
        return await this.roomRepository.remove(room);
    }

    async findUsers(roomId: number) {
        return await this.roomRepository.find({
            relations: ["users"],
            where: {
                id: roomId,
            }
        });
    }
}
